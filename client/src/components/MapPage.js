import React, { Component } from 'react';
import '../styles/Map.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import {browserHistory} from 'react-router'

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

  createFaceMarker(coordinates, imgUrl) {
    return (map)=>{
      const self = this, width = 48, height = 48;
      // Return the x/y position from coordinates
      // var width = 48, height = 48;
      let position = map.project(coordinates);
      // Create a custom marker and add it to the map
      let marker = document.createElement('div');
      marker.className = 'custom-marker';
      marker.style.backgroundImage = `url(${imgUrl})`;
      marker.style.width = width + 'px';
      marker.style.height = height + 'px';

      // Set the top + left position of the marker
      // Based on the coordinates and half the size of its shape
      marker.style.top = position.y - height / 2 + 'px';
      marker.style.left = position.x - width / 2 + 'px';

      // Display a popup when hovering over the marker
      marker.addEventListener('click', function(e) {
        browserHistory.push('profile');
      });

      // Append the marker to the map.
      map.getContainer().appendChild(marker);
      map.on('move', function() {
        // Update the x/y coordinates based on the new center of the map.
        position = map.project(self.state.center);
        marker.style.top = position.y - height / 2 + 'px';
        marker.style.left = position.x - width / 2 + 'px';
      });
    }
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
          onStyleLoad={this.createFaceMarker(this.state.center, "https://avatars.io/facebook/leonmak")}
          containerStyle={{height: window.innerHeight - 56 - 64}}
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
            layout={{ "icon-image": "Map_marker", "icon-size": 0.3 }}>
            <Feature coordinates={this.state.center}/>
          </Layer>
        {/* Example using custom uploaded svgs */}
          <Layer
            type="symbol"
            layout={{ "icon-image": "1f0cf", "icon-size": 1 }}>
            <Feature coordinates={[this.state.center[0]+0.0005,this.state.center[1]]}/>
          </Layer>

        </ReactMapboxGl>


      </div>
    );
  }
}

export default MapPage;
