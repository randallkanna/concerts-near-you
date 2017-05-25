import React, { Component } from 'react';
import EventItem from './event_item_component';
import NoEvents from './no_events_component';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";
import LoadingData from './loading_data';

class EventSection extends Component {
  constructor(props) {
    super(props);
    
    console.log('props', props);
    
    this.state = {
      artist: props.artist,
      geolocation: null,
      events: [],
      isLoading: false,
      range: props.range,
      url: getSecretURL(encodeURIComponent(props.artist), null, props.range) // this will hopefully change tomorrow ^^
    };
  }

  componentDidMount() {
    this.findCurrentLocation();
  }

  findCurrentLocation() {
    // signal start loading
    this.setState({
      isLoading: true
    });
      
    // TO DO
    // 1. Create a separate secret function for location
    // 2. show in plugin that browser does not support geolocation thus requiring user to change permissions
    // 3. ask for a zip code and update secretURl if they pass in a zip code or want to change to a new location
    if (navigator.geolocation && !this.state.geolocation) {
      const setState = this.setState;

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`location found long: ${position.coords.longitude} lat: ${position.coords.latitude}`);

        this.setState({
          geolocation: position.coords,
          url: getSecretURL(encodeURIComponent(this.state.artist), position.coords, this.state.range)
        });
        
        this.queryArtist();
      });
    } else {
      console.log("Browser does not support geolocation.");
      this.queryArtist();
    }
  }

  queryArtist() {
    const artistName = this.state.artist;
    console.log("requesting url ", this.state.url);
    if (artistName) {
      fetch(this.state.url).then(r => r.json()).then(({ _embedded }) => {

        if (!_embedded) {
          this.setState({
            isLoading: false
          });
          return;
        }

        const events = _embedded.events;

        this.setState({
          state: this.state,
          events: events.map((event) => {
            const date = event.dates.start.dateTime;
            const venue = event._embedded.venues[0].name;
            const city = event._embedded.venues[0].city.name;
            const name = event.name;
            const image = event.images[0].url;
            const id = event.id;

            return {
              date,
              venue,
              name,
              image,
              city,
              eventId: id
            };
          })
        });
        // signal stop loading
        this.setState({
          isLoading: false
        });
      }).catch((e) => {
        console.log(e);
        // signal stop loading
        this.setState({
          isLoading: false
        });
      });
    } else {
      // signal stop loading
      this.setState({
        isLoading: false
      });
    }
  }

  updateArtist() {
    console.log('updating artist');
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, ({
        type: 'UPDATE_ARTIST_SELECTOR'
      }))
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingData artist={this.state.artist} range={this.state.range}/>
    }
    return (
      <div>
        <a onClick={this.updateArtist}>Update</a>
        <IfEvents events={this.state.events}/>
      </div>
    )
  }
}

function IfEvents(props) {
  if (props.events.length) {
    const eventItems = props.events.map(event =>
      <EventItem key={event.eventId} event={event} />
    );
    return (
        <ul>
          {eventItems}
        </ul>
    );
  }
  return <NoEvents />
}

EventSection.propTypes = {
  artist: PropTypes.string
}

export default EventSection;
