import React from 'react';
import PlayTrip from './Maps/PlayTrip';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient';
import Auth from './Auth'
import Account from './Account'
import QuizForm from './Quiz/Quizform';
import QuizParent from './Quiz/QuizParent';
import Home from './UI/Home';
import Navbar from './UI/NavBar';
import TotalScore from './UIGame/TotalScore';
import Register from './Register';

export default function App() {
  const [session, setSession] = useState(null);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [currentHighScore, setCurrentHighScore] = useState(0);

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  return (
    <div className="body-font font-cagliostro">
      <BrowserRouter>
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={<Home session={session} setTotalScore={setTotalScore} />} />
          <Route path="PlayTrip" element={<PlayTrip session={session} setRound={setRound} round={round} totalScore={totalScore} setTotalScore={setTotalScore} currentHighScore={currentHighScore} setCurrentHighScore={setCurrentHighScore} />} />
          <Route path="Quizform" element={<QuizForm />} />
          <Route path="Quiz" element={<QuizParent />} />
          <Route path="Totalscore" element={<TotalScore />} />
          <Route path="Register" element={<Register />} />
          <Route path="Account" element={!session ? (
            <Auth /> ) : (
              <Account key={session.user.id} session={session} />
            )} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
