import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { coordinates } from "./Streetview";
import axios from "axios";

// Size of Map window
const containerStyle = {
  width: '90%',
  height: '75vh',
  margin: '0 auto',
};

function MyComponent({ markerValue, locationNumber }) {
  const [country, setCountry] = useState('');

  // Loads google api key
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  useEffect(() => {
    const handleMarkerPositionChanged = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${markerValue[0]},${markerValue[1]}&key=${process.env.REACT_APP_API_KEY}`
      );
  
      const result = response.data.results.find((r) =>
        r.types.includes("country")
      );
  
      if (result) {
        const location = response.data.results[1].formatted_address;
        //console.log("Country:", country);
        setCountry(location);
        // Do something with the country value
      }
    } catch (error) {
      console.error("Error retrieving country:", error);
    }
  };
  handleMarkerPositionChanged();
  }, [])
  


  let coordinateStreetView = coordinates[locationNumber][0]

  const mapOptions = {
    disableDefaultUI: true,
  };

  // UI options for the line between 2 points
  const PolylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const MarkerOptions = {
    color: 'blue',
    backgroundColor: 'yellow'
  }

  let clickedMarkerValues = { lat: markerValue[0], lng: markerValue[1] }

  // Line between the 2 coordinates
  const PolyLineBetweenGuessAndCorrect = [
    { lat: clickedMarkerValues.lat, lng: clickedMarkerValues.lng },
    { lat: coordinateStreetView.lat, lng: coordinateStreetView.lng },
  ];

  // Showing the Map with the 2 markers, 1 which are the coordinates of the streetview location
  // And the other is the coordinates of where the user clicked
  // Creates the line between those points with the path from before
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinateStreetView}
        zoom={3}
        options={mapOptions}
        clickableIcons={false}
      >
        {clickedMarkerValues.lat ? <Marker label={{text: `${coordinates[locationNumber][1].country}`, color: 'yellow'}} position={coordinateStreetView} clickable={false} /> : null}
        {clickedMarkerValues.lat ? <Marker label={{text: `${country}`, color: 'yellow', margin: '10px'}} position={clickedMarkerValues} clickable={false} /> : null}
        {clickedMarkerValues.lat ? <Polyline path={PolyLineBetweenGuessAndCorrect} options={PolylineOptions} /> : null}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default MyComponent;