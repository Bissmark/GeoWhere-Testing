import React from "react";
import { Link } from "react-router-dom";
import HomePicture from './../../globe.gif'

function Home() {
  return (
    <div className="h-screen flex flex-col items-center text-center">
      <div className="mb-7">
        <h1 className='title text-yellow-500 mb-4 text-3xl font-bold mt-10'>Welcome to GeoWhere</h1>
        <p className='text-yellow-500'>Click below to start playing</p>
      </div>
      <img className='pl-8 pr-8 max-w rounded-lg mb-10' src={HomePicture}></img>
      <Link className="text-center text-xl focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" to="/PlayTrip">Play</Link>
      <div className="bg-slate-800 rounded-lg p-8 m-5 text-yellow-500">
        <h1 className='text-3xl mb-5'>How to play</h1>
        <ol className="text-left">
          <li>
            The game mode consists of five rounds, each showing a different street view location.
          </li>
          <li>
            The player scores more points depending on how close to the actual photo location they guess.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;