import React, { Component } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import marker from './images/marker-icon-blue.png';
import shadow from './images/marker-shadow.png';

const icon = L.icon({
    iconUrl: marker,
    shadowUrl: shadow
});

const addMarkers = (lat, lng, place, mag, map) => {
    L.marker([lat, lng], { icon })
        .bindTooltip(`location: ${place}, mag: ${mag}`, { permanent: true, direction: 'top' })
        .addTo(map);
};

const getDetails = (earth, map) => {
    addMarkers(earth.coords[1], earth.coords[0], earth.place, earth.mag, map);
};

const getMap = map => {
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png').addTo(map);
    map.setView([0, 0], 0);
    map.setZoom(2);
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: ''
        }
        this.renderMap = this.renderMap.bind(this);
    }
    componentDidMount() {
        const map = L.map('map', { scrollWheelZoom: false, minZoom: 1 });
        this.renderMap(map);
    }

    renderMap(map) {
        const { data } = this.props;
        this.setState({
            map
        }, () => {
            getMap(this.state.map);
            data.getQuakes.map(earth => getDetails(earth, this.state.map))
        });
    }

    render() {
        const { data: {getQuakes}, mag } = this.props;
        return (
            <div className="map-wrapper">
                { getQuakes.length === 0 && <h2>No quakes above {mag}!</h2> }
                <div id="map" />
            </div>
        )
    }
}

export default App;
