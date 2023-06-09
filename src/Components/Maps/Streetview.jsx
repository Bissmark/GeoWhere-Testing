import React from 'react'
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import CountdownTimer from '../UIGame/CountdownTimer';
import { locationCoordinates } from '../../Utils/Locations';
import Round from '../UIGame/Round';
import GuessMap from './GuessMap';

// Size of streetview window
const containerStyle = {
  width: '90%',
  height: '75vh',
  margin: '0 auto',
};
export let coordinates = locationCoordinates; // Get coordinates

const StreetView = (props) => {
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
          position={locationCoordinates[props.locationNumber][0]}
          options={panoOptions}
        />
        <Round round={props.round} />
        <CountdownTimer round={props.round} setRound={props.setRound} seconds={props.seconds} setSeconds={props.setSeconds} />
        <GuessMap updateMarkers={props.updateMarkers} guessLocation={props.guessLocation} />
      </GoogleMap>

    </div>
  ) : <></>
}

export default StreetView;