import React, { Component } from 'react';
import '../styles/Map.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import {browserHistory} from 'react-router';
import SocketHandler, {FEEDS_SOCKET} from '../SocketHandler';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as fb from '../utils/facebook-url';
import * as Icons from '../utils/Icons';
import * as geo from '../utils/geolocator';

const goToURL = (url,props,drop) => setTimeout(()=>{
  browserHistory.push(url);
  props.passingFromOthersToDrop(drop);
}, 300);

export default class MapPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 18,
      // center: props.location
    }

    this.map = null;
    this.geoId = null;
    this.socketHandler = new SocketHandler();
    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(coords) {
    this.props.setLocation([coords.longitude, coords.latitude])
  }

  componentWillMount() {
    if(this.props.user){
      this.props.fetchAllNearbyDrops(this.props.user.userId);
    }else{
      this.props.fetchAllNearbyDrops(null);
    }

    this.socketHandler.setup(FEEDS_SOCKET, {}, this.newDropAdded.bind(this));
  }

  componentDidMount() {
    this.geoId = geo.geoListener(this.updateLocation);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  newDropAdded(data){
    this.props.updateANearbyDrop(data);
  }

  createFaceMarker(coordinates, imgUrl, map) {
    const self = this, width = 24, height = 24;
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
      browserHistory.push('/profile');
    });

    // Append the marker to the map.
    map.getContainer().appendChild(marker);
    map.on('move', function() {
      // Update the x/y coordinates based on the new center of the map.
      position = map.project(self.props.location);
      marker.style.top = position.y - height / 2 + 'px';
      marker.style.left = position.x - width / 2 + 'px';
    });
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

  setupMap(user, center) {
    return map => {
      if(user)
        this.createFaceMarker(center, fb.profileImg(user.id, 24), map)

      map.boxZoom.disable();
      map.keyboard.disable();
      this.map = map;
    }
  }

  render() {
    const {zoom} = this.state
        , {location, user, drops} = this.props;

    return (
      <div>

        <div className="my-location">
          <FloatingActionButton primary={true}
            onTouchTap={() => this.map.flyTo({ center: location, zoom: 19, bearing: 0, speed: 0.4, curve: 1, easing: t => t }) } >
            {Icons.MUI('my_location')}
          </FloatingActionButton>
        </div>

        <ReactMapboxGl
          onStyleLoad={this.setupMap(user, location)}
          containerStyle={{height: window.innerHeight - 56 - 64}}
          style={process.env.REACT_APP_MAPBOX_STYLE || "mapbox://styles/mapbox/streets-v8" }
          accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          zoom={[zoom]}
          pitch={60}
          hash={true}>

          <Layer
            type="fill"
            paint={{ "fill-color": "#00bcd4", "fill-opacity": 0.2 }}>
            <Feature coordinates={this.createGeoJSONCircle(location, 0.1)}/>
          </Layer>
          <Layer
            type="fill"
            paint={{ "fill-color": "#00bcd4", "fill-opacity": 0.1 }}>
            <Feature coordinates={this.createGeoJSONCircle(location, 0.09)}/>
          </Layer>
          <Layer
            type="symbol"
            layout={{ "icon-image": "Map_marker", "icon-size": 0.3 }}>
            <Feature coordinates={location}/>
          </Layer>

          {drops.map((drop, idx) => {
            return (
              <Layer type="symbol" key={idx} ref="marker-icons"
                layout={{"icon-padding": 5, "icon-image": drop.emojiUni,"icon-size": 0.5+drop.replies/100+drop.votes/100 }}>
                <Feature
                  properties={{"icon": drop.emojiUni, "title": drop.username, "description": drop.description}}
                  coordinates={drop.location}
                  onClick={()=> goToURL(`/drops/${drop.dropId}`,this.props, drop)}
                />
              </Layer>
            )
          })}

        </ReactMapboxGl>


      </div>
    );
  }
}
