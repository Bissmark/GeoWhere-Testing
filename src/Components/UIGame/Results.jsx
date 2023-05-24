import TotalScore from "./TotalScore";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

// The UI element showing after you have completed 5 rounds, or the Timer ends
export const Results = ({ session, totalScore, setTotalScore }) => {
    const [loading, setLoading] = useState(true)
    const [currentHighScore, setCurrentHighScore] = useState(0);

    useEffect(() => {
        const fetchScore = async() => {
            const { data, error } = await supabase
            .from('profiles')
            .select('score')
            .eq('id', 1)
            .single()

            if (error) {
                console.error('Error fetching score: ', error);
            } else {
                setCurrentHighScore(data.score);
            }
      };
      fetchScore();
      
    }, []);

    const updateScore = async (e) => {
        e.preventDefault();
        console.log('Score from this round', currentHighScore);
        console.log('Previous High Score', totalScore);

        try {
            setLoading(true);

            const updates = {
                id: session.user.id,
                score: totalScore
            }
            if (totalScore > currentHighScore) {
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