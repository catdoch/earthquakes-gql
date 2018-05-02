import React from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import marker from '../public/images/marker-icon-blue.png';
import shadow from '../public/images/marker-shadow.png';


const getDetails = (earth, map) => {
  addMarkers(earth.coords[1], earth.coords[0], map);
  return (
    <div className="data-module">
      <p>{earth.place}</p>
      <p>{earth.mag}</p>
      <br />
    </div>
  );
};

const addMarkers = (lat, lng, map) => {
  const icon = L.icon({
    iconUrl: marker,
    shadowUrl: shadow
  });
  L.marker([lat, lng], {icon}).addTo(map);
};

const getMap = (map) => {
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png').addTo(map);
  map.setView([0, 0], 0);
  map.setZoom(2)
}

const App = ({ data }) => {
  const map = L.map('map');
  getMap(map);
  return (
    <div className="main">
      {
        data.getQuakes.map((earth) => getDetails(earth, map))
      }
    </div>
  )
};

export default App;