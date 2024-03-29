import React from "react";
import Streetview from "./Streetview";
import Map from "./Map";
import { useState } from "react";
import { calculateDistance } from "../../Utils/DistanceCalc";
import { locationCoordinates } from "../../Utils/Locations";
import { Results } from "../UIGame/Results";
import Score from "../UIGame/Score";
import TotalScore from "../UIGame/TotalScore";

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

const PlayTrip = (props) => {
  const [view, setView] = useState('');
  const [markerLocation, setMarkerLocation] = useState([]);
  const [locationNumber, setLocationNumber] = useState(randomIntFromInterval());
  const [newRoundScore, setNewRoundScore] = useState(0);
  const [username, setUsername] = useState(null);
  const [seconds, setSeconds] = useState(120);
  
  const updateMarkers = (lat, lng) => {
    setMarkerLocation([lat,lng]);
  };

  // change the view from 1 page to another, update the score for current round, this is the place that the 0 on the bottom of the screen is located
  const guessLocation = () => {
    setView(view ? view - 1 : view + 1);
    updateRoundScore();
  };

  const nextRound = () => {
    setView(view ? view - 1 : view + 1);
    setLocationNumber(randomIntFromIntervalNotSameOne(locationNumber));
    props.setRound(props.round + 1);
    setSeconds(120);
  };

  // Calcuate the points based on the distance between the 2 coordinates, add to total score
  const updateRoundScore = () => {
    let originalLocationCoords = locationCoordinates[locationNumber][0];
    let points = guessLocation
      ? calculateDistance(originalLocationCoords.lat, originalLocationCoords.lng, markerLocation[0], markerLocation[1])
      : 0;
      setNewRoundScore(points);
      props.setTotalScore(props.totalScore + points);
  }

  // if its the 6th round show results page else if on round 1-5 show either the guessing map or the results map
  return (
      <div>
          { props.round === 6 &&
            <div>
              <Results session={props.session} totalScore={ props.totalScore } setRound={props.setRound} setSeconds={setSeconds}/>
            </div>
          }
          { props.round !== 6 && !view && (
            <div className="mt-5">
              <Streetview locationNumber={ locationNumber} updateMarkers={updateMarkers} guessLocation={guessLocation} round={props.round} setRound={props.setRound} seconds={seconds} setSeconds={setSeconds} />
            </div>
          )}
          { props.round !== 6 && view && (
            <div>
                <div className="flex items-center justify-center md:justify-evenly mb-5 mt-5">
                    <Score username={username} newRoundScore={newRoundScore} />
                    <button className="bg-yellow-400 text-slate-800 p-2 rounded-lg hover:bg-red-500 hover:animate-bounce" onClick={nextRound}>
                    {props.round !== 5 ? 'Next Round' : 'Finish'}
                    </button>
                    <TotalScore username={username} totalScore={props.totalScore} />
                </div>
                <Map markerValue={markerLocation} locationNumber={locationNumber} />
            </div>
          )}
      </div>
  );
}

export default PlayTrip;