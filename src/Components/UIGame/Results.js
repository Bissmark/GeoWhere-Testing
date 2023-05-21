import TotalScore from "./TotalScore";
import { useEffect } from "react";
import { supabase } from "../../supabaseClient";

// The UI element showing after you have completed 5 rounds, or the Timer ends
export const Results = ({ totalScore }) => {
    useEffect(() => {
        fetchScore()
      }, []);
      
      async function fetchScore() {
        let { data } = await supabase
        .from('profiles')
        .insert({ score: totalScore})
        //setScores(data)
        console.log("Scores: ", data);
      }

    return (
        <div>
            <div className="congrats">Congrats</div>
            <TotalScore totalScore={ totalScore } />
        </div>
    );
};