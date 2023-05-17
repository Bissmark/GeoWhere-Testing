import React from 'react';
import PlayTrip from './Maps/PlayTrip';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Maps/Map";
import { useState, useEffect } from 'react'
import supabase from '../supabaseClient';
import Auth from './Auth'
import Account from './Account'
import QuizForm from './Quiz/Quizform';
import QuizParent from './Quiz/QuizParent';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Home from './UI/Home';
import Navbar from './UI/NavBar';
import TotalScore from './UIGame/TotalScore';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="bg-home-picture bg-cover body-font font-cagliostro">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="PlayTrip" element={<PlayTrip />} />
          <Route path="Quizform" element={<QuizForm />} />
          <Route path="Quiz" element={<QuizParent />} />
          <Route path="Totalscore" element={<TotalScore />} />
          <Route path="Account" element={!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
