import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    console.log(this.state);
    return (
      <li>
        <img alt={this.state.event.image} src={this.state.event.image} />
        <p>{this.state.event.name}</p>
        <p><Moment format="YYYY-MM-DD HH:mm A">{this.state.event.date}</Moment></p>
        <p>{this.state.event.venue}</p>
        <p>{this.state.event.city}</p>
      </li>
    );
  }
}

EventItem.propTypes = {
  event: PropTypes.shape({
    eventId: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    venue: PropTypes.string,
    city: PropTypes.string
  })
}

export default EventItem;
