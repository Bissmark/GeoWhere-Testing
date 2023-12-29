import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Value used for where the camera centers on
const center = {
  lat: 0,
  lng: -180
};

const GuessMap = (props) => {
    const [selected, setSelected] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    // Size of the Guessing map inside streetview
    const containerStyle = {
        width: '30vh',
        height: '20vh'
    }

    // Sets the marker location based on a LatLng of where the User clicks
    const _handleMapClick = (ev, lat, lng) => {
        setSelected(true);
        setSelectedLocation(ev.latLng);
        props.updateMarkers(lat, lng);
    }

    const _handleGuessClick = () => {
        props.guessLocation();
    }

    const mapOptions = {
        disableDefaultUI: true
    }

    // Showing the GuessMap, where you can put a marker on and the guess button
    return isLoaded ? (
        <div className='z-10 md:opacity-30 md:hover:opacity-100 focus:opacity-100 absolute right-10 bottom-10 md:right-10 md:bottom-10'>
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
            <button className="bg-yellow-400 text-slate-800 relative left-1/3 w-28 rounded-lg h-10 mt-3 hover:bg-red-400 hover:animate-bounce" onClick={() => _handleGuessClick()}>Guess</button>
        </div>
    ) : <></>
};

export default GuessMap;
