import React from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { coordinates } from "./Streetview";
import './Map.css'

// Size of Map window
const containerStyle = {
  width: "1200px",
  height: "500px",
};

function MyComponent({ markerValue, locationNumber }) {
  // Loads google api key
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

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
    <div className="">
      <GoogleMap
        className=""
        mapContainerStyle={containerStyle}
        center={coordinateStreetView}
        zoom={3}
        options={mapOptions}
        clickableIcons={false}
      >
        {clickedMarkerValues.lat ? <Marker position={coordinateStreetView} clickable={false} /> : null}
        {clickedMarkerValues.lat ? <Marker position={clickedMarkerValues} clickable={false} /> : null}
        {clickedMarkerValues.lat ? <Polyline path={PolyLineBetweenGuessAndCorrect} options={PolylineOptions} /> : null}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);