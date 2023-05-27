import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import WellDone from "../../Well-Done.png"
import FinalScore from "./FinalScore";

// The UI element showing after you have completed 5 rounds, or the Timer ends
export const Results = ({ session, totalScore, setRound }) => {
    const [loading, setLoading] = useState(true)
    const [currentHighScore, setCurrentHighScore] = useState(0);

    // Fetch current score from the database based on the user and put it into a variable called currentHighScore
    useEffect(() => {
        const fetchScore = async() => {
            const { user } = session;

            let { data, error } = await supabase
            .from('profiles')
            .select('score')
            .eq('id', user.id)
            .single()

            if (error) {
                console.error('Error fetching score: lmao', error);
            } else {
                setCurrentHighScore(data.score);
            }
      };
      fetchScore();
      
    }, []);

    // Update the score in the database if the score than the user just got is larger than the score already in the database
    const updateScore = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (totalScore > currentHighScore) {
                const updates = {
                    id: session.user.id,
                    score: totalScore
                }

                let { error } = await supabase.from('profiles').upsert(updates, {
                    returning: 'minimal',
                })
                if (error) {
                    throw error
                }
            }            
        } catch (error) {
            alert(error.message);
        } finally {
            
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="mt-5 text-yellow-400 text-5xl md:text-9xl mb-10">Congrats</h1>
            <img className="mb-10" src={WellDone} alt="" />
            <div className="inline-block">
                <FinalScore totalScore={ totalScore } />
                <Link onClick={() => setRound(1) && updateScore} to="/playtrip" className="bg-yellow-400 rounded-lg p-4 hover:bg-red-500">Play Again</Link>    
            </div>
           
        </div>
    );
};