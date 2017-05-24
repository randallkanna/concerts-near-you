import React, { Component } from 'react';
import EventSection from './event_section_component';
import PropTypes from 'prop-types';

 class App extends Component {

  render() {
    const { artist, events } = this.props;

    return (
      <div>
        <EventSection artist={artist} events={events} />
      </div>
    );
  }
}

App.propTypes = {
  artist: PropTypes.string,
  events: PropTypes.array
}

export default App;
