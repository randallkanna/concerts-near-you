import React, { Component, PropTypes } from 'react';
import EventSection from './event_section_component';

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
