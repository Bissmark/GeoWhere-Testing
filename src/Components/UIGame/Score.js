import { useState, useEffect } from 'react';
import supabase from "../../supabaseClient";

function Score({ newRoundScore }) {
    const [scores, setScores] = useState([]);
  
    useEffect(() => {
      fetchScore()
    }, []);
    
    async function fetchScore() {
      let { data } = await supabase
      .from('scores')
      .select('*')
      setScores(data)
      console.log("Scores: ", data);
    }

    // Showing the Score on some views
    return (
      <div className='score'>Score this round: { newRoundScore }</div>
    );
  }

  export default Score;
  
  