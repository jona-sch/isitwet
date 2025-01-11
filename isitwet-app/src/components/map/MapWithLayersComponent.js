import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { useHistory } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';
import './css/MapComponent.css'


function MapWithLayersComponent({ locations }) {

    const mapRef = useRef();
    const mapContainerRef = useRef();
    const history = useHistory(); // Get the navigate function from the hook
    
    useEffect(() => {
        // Define the handleMarkerClick function const
        const handleMarkerClick = (locationId) => {
            history.push(`/weather/${locationId}`); // Redirect to a new page with the location ID
        };

        mapboxgl.accessToken = 'API_KEY'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [3.16667, 46.98333],
            zoom: 5
        });
        
        mapRef.current.on('style.load', () => {
            mapRef.current.addSource('places', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: locations.map(location => ({
                        id: location.name,
                            type: 'Feature',
                            properties: {
                                description: location.name,
                            },
                            geometry: {
                                type: 'Point',
                                coordinates: [location.longitude, location.latitude]
                            }
                        })
                    )
                }
            });
        
            mapRef.current.addLayer({
                id: 'places',
                type: 'symbol',
                source: 'places',
                layout: {
                    'icon-image': 'mountain',
                },
            });

            mapRef.current.on('click', (e) => {
                console.log(e);
            });
        
            mapRef.current.on('click', 'places', (e) => {
                console.log(e.features[0].properties.description);
                const clickedLocation = locations.find(
                    (location) => location.name === e.features[0].properties.description
                );
                
                const popupContent = document.createElement('div');
                popupContent.innerHTML = `<strong>${clickedLocation.name}</strong><br/><a href="#" id="popup-link-${clickedLocation.id}">View Details</a>`;
    
                new mapboxgl.Popup()
                            .setDOMContent(popupContent)
                            .setLngLat(e.lngLat)
                            .addTo(mapRef.current);
                // handleMarkerClick(clickedLocation.id);

                // Add event listener to the link within the popup
                popupContent.querySelector(`#popup-link-${clickedLocation.id}`).addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent the default link behavior
                    handleMarkerClick(clickedLocation.id);
                });
            });
        
            mapRef.current.on('mouseenter', 'places', () => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
            });
        
            mapRef.current.on('mouseleave', 'places', () => {
                mapRef.current.getCanvas().style.cursor = '';
            });
        
            return () => {
                mapRef.current && mapRef.current.remove()
            }
        })
    }, [locations, history])

    return (
      <>
        <div id='map-container' ref={mapContainerRef}/>
      </>
    )
}

export default MapWithLayersComponent;