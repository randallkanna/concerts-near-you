import React, { Component } from 'react';
import EventSection from './event_section_component';
import PropTypes from 'prop-types';

 class App extends Component {

  render() {
    const { artist } = this.props;

    return (
      <div>
        <EventSection artist={artist} />
      </div>
    );
  }
}

App.propTypes = {
  artist: PropTypes.string.isRequired
}

export default App;
