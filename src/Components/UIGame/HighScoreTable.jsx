import { useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useState } from "react";

const HighScoreTable = () => {
    const [highscore, setHighScore] = useState([]);
    //const [username, setUsername] = useState([]);

    useEffect(() => {
        const fetchScore = async() => {
            let { data, error } = await supabase
            .from('profiles')
            .select(`username, score`)
            .order('score', {ascending: false });

            console.log(data)

            if (error) {
                console.error('Error fetching high scores: ', error);
            } else {
                setHighScore(data);
            }
      };
      fetchScore();
    }, []);

    return (
        <div>
            <table className="w-full text-sm text-left text-yellow-400 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-yellow-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            High Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { highscore.map((value, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                {value.username}
                            </td>
                            <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                {value.score}
                            </td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HighScoreTable;