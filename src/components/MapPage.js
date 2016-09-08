import React from 'react';
import '../styles/Map.css';
import ReactMapboxGl from "react-mapbox-gl";
// import { Layer, Feature } from "react-mapbox-gl";

const position = [103.8198, 1.3224];

const MapPage = props => (
  <div>
    <ReactMapboxGl
      style="mapbox://styles/mapbox/streets-v8"
      accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      zoom={[16]}
      pitch={50}
      center={position}
    />
  </div>
);

export default MapPage;