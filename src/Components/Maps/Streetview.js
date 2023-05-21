import React from 'react'
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import Timer from '../UIGame/Timer';
import { locationCoordinates } from '../../Utils/Locations';
import { calculateDistance } from "../../Utils/DistanceCalc";
import GuessMap from './GuessMap';
import { useState } from 'react';
import Round from '../UIGame/Round';

// Size of streetview window
const containerStyle = {
  width: '90%',
  height: '75vh',
  margin: '0 auto',
};
export let coordinates = locationCoordinates; // Get coordinates

function MyComponent({ locationNumber, round }) {

  // gets google api key
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })
  // visual options for Streetview
  const panoOptions = {
    pov: {
      heading: 20,
      pitch: 2,
    },
    disableDefaultUI: true,
    visible: true
  }

  // Show Streetview inside a good map, show timer on streetview page
  return isLoaded ? (
    <div className='relative'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          addressControl={false}
        >
          <StreetViewPanorama
          position={ locationCoordinates[locationNumber][0] }
          options={panoOptions}
          
        />
        <Round />
        <Timer />
        {/* <GuessMap updateMarkers={updateMarkers} guessLocation={guessLocation} /> */}
        </GoogleMap>
        
   </div>
  ) : <></>
}

export default React.memo(MyComponent);