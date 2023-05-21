import { useState, useEffect } from 'react';
import { supabase } from "../../supabaseClient";

function Score({ newRoundScore, username }) {
    // Showing the Score on some views
    return (
      <div className='inline-block z-10 p-2 bg-yellow-400 rounded-lg text-xs md:text-base'>
        { username ? (`${username}'s Score this round: ${ newRoundScore }`) : (`Score this round: ${ newRoundScore }`)}
          </div>
    );
  }

  export default Score;
  
  