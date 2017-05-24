import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimilarArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    return (
      <li>
        {this.state.similarArtist.name}
      </li>
    );
  }
}

SimilarArtist.propTypes = {
  similarArtist: PropTypes.shape({
    name: PropTypes.string
  })
}

export default SimilarArtist;
