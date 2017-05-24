import React, { Component } from 'react';
import SimilarArtist from './similar_artist';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";

class SimilarArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarArtists: props.similarArtists
    };
  }

  render() {
    const similarArtists = this.state.similarArtists.map((similarArtist, index) =>
      <SimilarArtist key={index} similarArtist={similarArtist} />
    )
    if (similarArtists.length === 0) {
      return null;
    }

    return (
      <div>
        <h4>Similar Artists</h4>
        <ul>
          {similarArtists}
        </ul>
      </div>
    );
  }
}

SimilarArtists.propTypes = {
  similarArtists: PropTypes.array
}

export default SimilarArtists;
