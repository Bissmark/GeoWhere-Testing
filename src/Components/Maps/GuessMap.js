import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Value used for where the camera centers on
const center = {
  lat: 0,
  lng: -180
};

// Size of the Guessing map inside streetview
const containerStyle = {
  width: '40vh',
  height: '25vh'
};

export default function GuessMap({ updateMarkers, guessLocation }) {
    const [isSelected, setSelected] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    // Sets the marker location based on a LatLng of where the User clicks
    const _handleMapClick = (ev, lat, lng) => {
        setSelected(true);
        setSelectedLocation(ev.latLng);
        updateMarkers(lat, lng);
    }

    const _handleGuessClick = () => {
        guessLocation();
    }

    const mapOptions = {
        disableDefaultUI: true
    }

    // Showing the GuessMap, where you can put a marker on and the guess button
    return isLoaded ? (
        <div className='inline-block opacity-30 hover:opacity-100 absolute right-28 bottom-24'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={1}
                onClick={(ev) => _handleMapClick(ev, ev.latLng.lat(), ev.latLng.lng())}
                options={ mapOptions }
            >
            <Marker 
                position={ selectedLocation }
                clickable={false}
            />
            </GoogleMap>
            <button className="bg-yellow-400 text-slate-800 relative left-24 w-40 rounded-lg h-10 mt-3 hover:bg-red-400 hover:animate-bounce" onClick={() => _handleGuessClick()}>Guess</button>
        </div>
    ) : <></>
}
