import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {Icon} from 'leaflet'
import markerIconSvg from "./icons/climber-icon.svg"
import newMarkerIconSvg from "./icons/climber-icon-create.svg"
import LeafletControlGeocoder from './LeafletControlGeocoder';

import './css/MapComponent.css';
import 'leaflet/dist/leaflet.css';


function LocationMarker({ addLocation }) {
    const [position, setPosition] = useState(null);
    const [newLocationName, setNewLocationName] = useState('');

    const map = useMapEvents({
        click: (e) => {
            setNewLocationName('');
            setPosition(e.latlng);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/v1/locations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newLocationName,
                latitude: position.lat,
                longitude: position.lng
            }),
        });
        if (response.ok) {
            const newLocationData = await response.json();
            console.log('Location saved successfully: ' + newLocationData.name);
            addLocation(newLocationData);
        } else {
            alert('Error saving location: ' + await response.text());
            console.error('Error saving location: ' + response)
        };
    };
    
    return position === null ? null : (
        <Marker
            position={position}
            icon={new Icon({iconUrl: newMarkerIconSvg, iconSize: [31, 48], iconAnchor: [12, 41]})}
        >
            <Popup>
                <strong>Add a new location</strong>
                <Form onSubmit={handleSubmit} style={{width: "10rem"}}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={newLocationName || ''} bsSize="sm"
                               onChange={(e) => setNewLocationName(e.target.value)} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            type="submit"
                            size="sm"
                            disabled={newLocationName===""}
                        >
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </Popup>
        </Marker>
    )
}  


function LeafletMapComponent({ locations, addLocation }) {

    const markers = locations.map(location => {
        return (
            <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={new Icon({iconUrl: markerIconSvg, iconSize: [31, 48], iconAnchor: [12, 41]})}
            >
                <Popup><strong>{location.name}</strong><br/><a href={`weather/${location.id}`}>View Details</a></Popup>
            </Marker>
        );
    })

    return (
        <div id='map-container'>
            <MapContainer center={[46.98333, 3.16667]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
                <LocationMarker addLocation={addLocation}/>
                <LeafletControlGeocoder/>
            </MapContainer>
        </div>
    )
}

export default LeafletMapComponent;