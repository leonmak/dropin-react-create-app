import React, { Component } from 'react';
import '../styles/Map.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


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

  createGeoJSONCircle(center, radiusInKm, points = 64) {
    let coords = { latitude: center[1], longitude: center[0] };
    let km = radiusInKm;
    let ret = [];
    let distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    let distanceY = km/110.574;

    let theta, x, y;
    for(let i=0; i<points; i++) {
      theta = (i/points)*(2*Math.PI);
      x = distanceX*Math.cos(theta);
      y = distanceY*Math.sin(theta);
      ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return [ret]
  };

  render() {
    return (
      <div>
        <ReactMapboxGl
          containerStyle={{height: window.innerHeight - 56}}
          style={process.env.REACT_APP_MAPBOX_STYLE || "mapbox://styles/mapbox/streets-v8" }
          accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          zoom={[this.state.zoom]}
          pitch={60}
          center={this.state.center}>

          <Layer
            type="fill"
            paint={{ "fill-color": "#00bcd4", "fill-opacity": 0.2 }}>
            <Feature coordinates={this.createGeoJSONCircle(this.state.center, 0.1)}/>
          </Layer>
          <Layer
            type="fill"
            paint={{ "fill-color": "#00bcd4", "fill-opacity": 0.1 }}>
            <Feature coordinates={this.createGeoJSONCircle(this.state.center, 0.09)}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{ "icon-image": "harbor-15", "icon-size": 1.3 }}>
            <Feature coordinates={this.state.center}/>
          </Layer>


        </ReactMapboxGl>


      </div>
    );
  }
}

export default MapPage;
