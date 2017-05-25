import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const divStyle = {
  display: 'inline-block',
  width: '70%',
  paddingLeft: '15px',
  verticalAlign: 'top'
}

const liStyle = {
  padding: '12px 22px',
  borderBottom: '1px solid rgba(0,0,0,0.08)'
};

const imgStyle = {
  borderRadius: '50%',
  display: 'inline-block',
  width: '54px',
  height: '54px'
};

const pStyle = {
  display: 'inline-block',
  fontSize: '10px',
  fontWeight: '200',
  color: '#949191',
  margin: '0'
};

const eventStyle = {
  ...pStyle,
  display: 'block',
  fontFamily: 'Avenir',
  color: '#585858',
  fontSize: '15px',
  fontWeight: '500'
}

const dotStyle = {
  ...pStyle,
  margin: "0 5px"
}

const rowStyle = {
  display: 'block'
}

const buyTicketsStyle = {
  color: '#33AF80',
  fontWeight: '500',
  fontSize: '11px',
  marginTop: '10px',
  marginBottom: '0',
  textDecoration: 'none',
  display: 'block'
}

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
      <li style={liStyle}>
        <img style={imgStyle} alt={this.state.event.image} src={this.state.event.image} />
        <div style={divStyle}>
          <p style={eventStyle}>{this.state.event.name}</p>
          <span style={rowStyle}>
            <p style={pStyle}>{this.state.event.city}</p>
            <p style={dotStyle}>
              &middot;
            </p>
            <p style={pStyle}>{this.state.event.venue}</p>
          </span>
          <span style={rowStyle}>
            <p style={pStyle}><Moment format="MMMM DD, YYYY">{this.state.event.date}</Moment></p>
            <p style={dotStyle}>
              &middot;
            </p>
            <p style={pStyle}><Moment format="hh:mm A">{this.state.event.date}</Moment></p>
          </span>
          <span style={pStyle}>
            <a style={buyTicketsStyle} href={this.state.event.url} target="_blank">Buy Tickets</a>
            </span>
        </div>
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
    city: PropTypes.string,
    url: PropTypes.string
  })
}

export default EventItem;
