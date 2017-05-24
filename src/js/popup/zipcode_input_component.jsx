import React, { Component } from 'react';

class ZipCodeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: "94117 (The Best City on Earth)" // TO DO - Replace this with the user location when we have it
    };
  }

  componentDidMount() {
    // this.findUserLocation(); // TO DO - Finish me!
  }

  updateLocation(input) {
    this.setState({ zip: input.target.value })
  }

  // findUserLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //
  //       // const geocoder = new google.maps.Geocoder();
  //       // TO DO ->
  //         // Use the google api if possible and get zip code from long/lat
  //         // Update the state with the zip code
  //
  //       // this.setState({
  //       //  location:
  //       // })
  //     });
  //   }
  // }

  render() {
    return (
      <div>Change Your Location <input type="text" value={this.state.zip} onChange={this.props.onUpdateZipcode}></input></div> // value needs to be set above
    )
  }
}

export default ZipCodeInput;
