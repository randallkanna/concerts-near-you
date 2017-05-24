import React, { Component } from 'react';
import EventItem from './event_item_component';
import NoEvents from './no_events_component';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";
import LoadingData from './loading_data';

class EventSection extends Component {
  render() {
    return <IfEvents events={this.props.events}/>
  }
}

function IfEvents(props) {
  if (props.events && props.events.length) {
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
  artist: PropTypes.string,
  events: PropTypes.array
}

export default EventSection;
