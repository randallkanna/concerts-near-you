import React, { Component } from 'react';
import EventSection from './event_section_component';
import SimilarArtists from './similar_artists';
import ZipCodeInput from './zipcode_input_component';
import { getLocationURL } from "secrets";
import PropTypes from 'prop-types';

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       zip: "94117"
     };
   }

   updateZipcode({ input: { target: { value: zip }}}) {
     console.log(arguments);
     console.log(value)

     this.setState({
       location: zip
      });
   }

  render() {
    const { artist, similarArtists } = this.props;

    return (
      <div>
        <ZipCodeInput onUpdateZipcode={() => this.updateZipcode(...arguments)} />
        <EventSection artist={artist} zip={this.state.zip}/>
        <SimilarArtists similarArtists={similarArtists} />
      </div>
    );
  }
}

App.propTypes = {
  artist: PropTypes.string
}

export default App;
