import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/style.css";

import icon from "./icons/constants";


function LeafletControlGeocoder() {
    const map = useMap();
  
    useEffect(() => {
        var geocoder = L.Control.Geocoder.nominatim();
        if (typeof URLSearchParams !== "undefined" && window.location.search) {
        // parse /?geocoder=nominatim from URL
            var params = new URLSearchParams(window.location.search);
            var geocoderString = params.get("geocoder");
            if (geocoderString && L.Control.Geocoder[geocoderString]) {
                geocoder = L.Control.Geocoder[geocoderString]();
            } else if (geocoderString) {
                console.warn("Unsupported geocoder", geocoderString);
            }
        }

        L.Control.geocoder({
            query: "",
            placeholder: "Search here...",
            defaultMarkGeocode: false,
            geocoder
        }).on(
            "markgeocode",
            function (e) {
                var latlng = e.geocode.center;
                L.marker(latlng, { icon })
                    .addTo(map)
                    .bindPopup(e.geocode.name)
                    .openPopup();
                map.fitBounds(e.geocode.bbox);
            }
        ).addTo(map);
    }, [map]);
  
    return null;
}

export default LeafletControlGeocoder;