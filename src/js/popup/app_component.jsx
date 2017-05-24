import React, { Component } from 'react';
import EventSection from './event_section_component';
import SimilarArtists from './similar_artists';
import PropTypes from 'prop-types';

 class App extends Component {

  render() {
    const { artist, similarArtists } = this.props;

    return (
      <div>
        <EventSection artist={artist} />
        <SimilarArtists similarArtists={similarArtists} />
      </div>
    );
  }
}

App.propTypes = {
  artist: PropTypes.string
}

export default App;
