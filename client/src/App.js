import React, { Component } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import marker from './images/marker-icon-blue.png';
import shadow from './images/marker-shadow.png';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: '',
            icon: L.icon({
                iconUrl: marker,
                shadowUrl: shadow
            }),
            data: this.props.data,
            mag: this.props.mag,
            markersLayers: new L.LayerGroup()
        }
        this.renderMap = this.renderMap.bind(this);
    }

    componentDidMount() {
        const map = L.map('map', { scrollWheelZoom: false, minZoom: 1 });
        this.renderMap(map);
    }

    componentWillReceiveProps(newProps) {
        const { map, markersLayers } = this.state;

        this.setState({
            data: newProps.data,
            markersLayers: markersLayers.clearLayers()
        }, () => {
            newProps.data.getQuakes.map(earth => this.getDetails(earth, map))
        });
    }

    getMap(map) {
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png').addTo(map);
        map.setView([0, 0], 0);
        map.setZoom(2);
    }

    getDetails(earth, map) {
        this.addMarkers(earth.coords[1], earth.coords[0], earth.place, earth.mag, map);
    }

    addMarkers(lat, lng, place, mag, map) {
        const marker = L.marker([lat, lng], { icon: this.state.icon })
            .bindTooltip(`location: ${place}, mag: ${mag}`, { permanent: true, direction: 'top' });
        this.setState({ markersLayers: this.state.markersLayers.addLayer(marker) });
    }

    renderMap(map) {
        const { data } = this.state;
        this.setState({
            map
        }, () => {
            this.getMap(this.state.map);
            data.getQuakes.map(earth => this.getDetails(earth, this.state.map));
            this.state.markersLayers.addTo(map);
        });
    }

    render() {
        const { data: {getQuakes}, mag } = this.state;
        return (
            <div className="map-wrapper">
                { getQuakes.length === 0 && <h2>No quakes above {mag}!</h2> }
                <div id="map" />
            </div>
        )
    }
}

export default App;
