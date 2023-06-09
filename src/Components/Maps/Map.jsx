import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow} from "@react-google-maps/api";
import { coordinates } from "./Streetview";
import axios from "axios";

// Size of Map window
const containerStyle = {
  width: '90%',
  height: '75vh',
  margin: '0 auto',
};

const Map = (props) => {
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.markerValue[0]},${props.markerValue[1]}&key=${process.env.REACT_APP_API_KEY}`
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
  }, [props.markerValue])

  let coordinateStreetView = coordinates[props.locationNumber][0]

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

  let clickedMarkerValues = { lat: props.markerValue[0], lng: props.markerValue[1] }

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
        {clickedMarkerValues.lat ? <Marker>
          <InfoWindow position={coordinateStreetView}>
            <div>{coordinates[props.locationNumber][1].location}</div>
          </InfoWindow></Marker> : null}
        {clickedMarkerValues.lat ? <Marker>
        <InfoWindow position={clickedMarkerValues}>
            <div>
              {country || 'In the ocean'}
            </div>
          </InfoWindow>
        </Marker> : null}
        {clickedMarkerValues.lat ? <Polyline path={PolyLineBetweenGuessAndCorrect} options={PolylineOptions} /> : null}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;