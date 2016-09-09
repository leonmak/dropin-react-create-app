import React, { Component } from 'react';
import '../styles/Map.css';
import ReactMapboxGl from "react-mapbox-gl";
// import { Layer, Feature } from "react-mapbox-gl";

function geoListener(callback) {
  navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => callback(coords),
    (err) => alert('Unable to find position - ' + err.message), 
    {
      enableHighAccuracy: true,
      timeout: 15000
    }
  )
}

class MapPage extends Component {
  state = {
    location: [1.3224,103.8198]
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
          style="mapbox://styles/mapbox/streets-v8"
          accessToken='pk.eyJ1IjoiZ2lvbmd0bzM1IiwiYSI6ImNpc3NtdzJ1ODAwaGMyb29hbzU1bnY4amUifQ.vt5Dk7_fo_hROC84-DKsrw'
          zoom={[16]}
          pitch={50}
          center={this.state.center}
        />
      </div>
    );
  }
}

export default MapPage;
