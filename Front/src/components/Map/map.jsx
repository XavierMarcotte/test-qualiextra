import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import favorites from '../SearchResults/datas';

export default function Map() {
    const [geoData, setGeoData] = useState({ lat: 48.866667, lng: 2.333333 });

    const center = [geoData.lat, geoData.lng];

    const i = L.icon({
        iconUrl: 'https://cdn.discordapp.com/attachments/467679845372002308/1123248604396658809/Sans_titre-1.png',
        iconSize: [50,50]
    });
    
    const markers = favorites.map(marker => 
        <Marker 
        position ={marker.position}
        icon={i}
        key= {marker.id}
        >
            <Popup>{marker.title}</Popup>
        </Marker>
        );

    return (
        <MapContainer center={center} zoom={12} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
    );
}