import React, { Component } from 'react';
import '../styles/Map.css';
import ReactMapboxGl from "react-mapbox-gl";
// import { Layer, Feature } from "react-mapbox-gl";

function geoListener(callback) {
  navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => callback(coords),
    (err) => console.log('Unable to find position - ' + err.message),
    {
      enableHighAccuracy: true,
      timeout: 15000
    }
  )
}

class MapPage extends Component {
  state = {
    center: [103.8198, 1.3224],
    zoom: 18
  }

  updateLocation(coords) {
    console.log(coords);
    this.setState({
      center: [coords.longitude, coords.latitude]
    });

  }

  componentWillMount() {
    geoListener(this.updateLocation.bind(this));
  }

  render() {
    return (
      <div>
        <ReactMapboxGl
          containerStyle={{height: window.innerHeight - 56}}
          style={process.env.REACT_APP_MAPBOX_STYLE || "mapbox://styles/mapbox/streets-v8" }
          accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          zoom={[this.state.zoom]}
          pitch={60}
          center={this.state.center}
        />
      </div>
    );
  }
}

export default MapPage;
