import React, { Component } from 'react';
import EventItem from './event_item_component';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";

class EventSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: props.artist,
      events: [],
      url: getSecretURL(encodeURIComponent(props.artist)) // this will hopefully change tomorrow ^^
    };
  }

  componentDidMount() {
    this.queryArtist();
  }

  queryArtist() {
    const artistName = this.state.artist;
    if (artistName) {
      fetch(this.state.url).then(r => r.json()).then(({ _embedded: { events } }) => {
        console.log(events);
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
      }).catch(console.log);
    }
  }

  render() {
    const events = this.state.events.map(event =>
      <EventItem key={event.eventId} event={event} />
    );

    return (
      <ul>
        {events}
      </ul>
    );
  }
}

EventSection.propTypes = {
  artist: PropTypes.string
}

export default EventSection;
