import TotalScore from "./TotalScore";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

// The UI element showing after you have completed 5 rounds, or the Timer ends
export const Results = ({ session, totalScore, setTotalScore }) => {
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
        // console.log('Score from this round', totalScore);
        // console.log('Previous High Score from database', currentHighScore);

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
        <div>
            <div>Congrats</div>
            <TotalScore totalScore={ totalScore } />
            <Link onClick={updateScore} to="/" className="bg-yellow-400 rounded-lg p-4">Play Again</Link>
        </div>
    );
};