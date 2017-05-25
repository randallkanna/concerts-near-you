import React, { Component } from 'react';
import EventItem from './event_item_component';
import NoEvents from './no_events_component';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import _ from "lodash";


const GettingStartedGoogleMap = withGoogleMap(props => (
    
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={10}
        defaultCenter ={props.geolocation}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) => (
        <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(index)}
        />
        ))}
    </GoogleMap>
));

class MapSection extends Component {
  constructor(props) {
    super(props);
    console.log(props.geolocation);
    this.state = {
      events: props.events,
      geolocation: props.geolocation,
      markers: [ {
        position: {
            lat: 25.0112183,
            lng: 121.52067570000001,
        },
        key: 'Taiwan',
        defaultAnimation: 2
        },
      ]
    };
    
  }
    
  render() {
    const geolocation = {};

    geolocation.lat = parseFloat(this.state.geolocation.latitude);
    geolocation.lng = parseFloat(this.state.geolocation.longtitude);

    return (
      <GettingStartedGoogleMap
        containerElement={
            <div style={{ height: `800px`, margin: 20, padding: 20 }} />
        }
        mapElement={
            <div style={{ height: `500px` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={this.state.markers}
        geolocation={geolocation}
        onMarkerRightClick={_.noop}
      />
    )
  }

  
}

MapSection.propTypes = {
  events: PropTypes.array
}

export default MapSection;
