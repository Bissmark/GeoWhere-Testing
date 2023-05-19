import React from 'react';
import PlayTrip from './Maps/PlayTrip';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Maps/Map";
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient';
import Auth from './Auth'
import Account from './Account'
import QuizForm from './Quiz/Quizform';
import QuizParent from './Quiz/QuizParent';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Home from './UI/Home';
import Navbar from './UI/NavBar';
import TotalScore from './UIGame/TotalScore';
import Register from './Register';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    })
  }, [])

  return (
    <div className="bg-home-picture bg-cover bg-bottom body-font font-cagliostro">
      <BrowserRouter>
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="PlayTrip" element={<PlayTrip />} />
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
