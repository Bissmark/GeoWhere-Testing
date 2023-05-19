import React from "react";
import GuessMap from "./GuessMap";
import Streetview from "./Streetview";
import Map from "./Map";
import { useState } from "react";
import { calculateDistance } from "../../Utils/DistanceCalc";
import { locationCoordinates } from "../../Utils/Locations";
import { Results } from "../UIGame/Results";
import Score from "../UIGame/Score";
import TotalScore from "../UIGame/TotalScore";
import Round from "../UIGame/Round";

function randomIntFromInterval() {
  return Math.floor(Math.random() * (locationCoordinates.length - 1 - 0 + 1) + 0);
}

function randomIntFromIntervalNotSameOne(oldNum) {
  let newNum = randomIntFromInterval();
  if (newNum !== oldNum) {
    return newNum;
  }
  return randomIntFromIntervalNotSameOne(oldNum);
}

function PlayTrip() {
  const [view, setView] = useState('');
  const [markerLocation, setMarkerLocation] = useState([]);
  const [locationNumber, setLocationNumber] = useState(randomIntFromInterval());
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [newRoundScore, setNewRoundScore] = useState(0);
  
  const updateMarkers = (lat, lng) => {
    setMarkerLocation([lat,lng]);
  };

  // change the view from 1 page to another, update the score for current round, this is the place that the 0 on the bottom of the screen is located
  const guessLocation = () => {
    setView(view ? view - 1 : view + 1);
    updateRoundScore();
    console.log(view);
  };

  const nextRound = () => {
    setView(view ? view - 1 : view + 1);
    setLocationNumber(randomIntFromIntervalNotSameOne(locationNumber));
    setRound(round + 1);
  };

  // Calcuate the points based on the distance between the 2 coordinates, add to total score
  const updateRoundScore = () => {
    let originalLocationCoords = locationCoordinates[locationNumber][0];
    let points = guessLocation
      ? calculateDistance(originalLocationCoords.lat, originalLocationCoords.lng, markerLocation[0], markerLocation[1])
      : 0;
      setNewRoundScore(points);
      setTotalScore(totalScore + points);
  }

  // if its the 6th round show results page else if on round 1-5 show either the guessing map or the results map
  return (
      <div className="h-screen">
          { round === 6 && (
            <div>
              <Results totalScore={ totalScore }/>
            </div>
          )}
          { round !== 6 && !view && (
            <div>
              <Round round={ round }/>
              <Streetview locationNumber={ locationNumber } />
              {/* <GuessMap updateMarkers={ updateMarkers } guessLocation={ guessLocation }/> */}
            </div>
          )}
          { round !== 6 && view && (
            <div>
              <button className="" onClick={ nextRound }>
                { round !== 5 ? 'Next Round' : 'Finish' }
              </button>
              <Score newRoundScore={ newRoundScore }/>
              <TotalScore totalScore={ totalScore }/>
              <Map markerValue={ markerLocation } locationNumber={ locationNumber }/>
            </div>
          )}
      </div>
  );
}

export default PlayTrip;