import CountdownTimer from "../CountdownTimer/CountdownTimer";
import Quiz from "./Quiz";
import { useEffect, useState } from 'react';
import { supabase } from "../../supabaseClient";

function QuizParent () {
    const [currentQuiz, setCurrentQuiz] = useState('');

    async function fetchRandomQuiz(){
       

        let {data} = await supabase
          .from('New Quizes')
          .select('*')


        const randomIndex = Math.floor(Math.random() * data.length);
        if (data[randomIndex]) {
            setCurrentQuiz(data[randomIndex].content);
        }
    }


    async function eraseSubmission () {
      let { data: quizes } = await supabase
        .from('quizes')
        .select('*')

      const quizIDs = quizes.map((quiz) => {
        return (quiz.id);
      });
      console.log(quizIDs)

      quizIDs.forEach( async (ID) => {
        console.log('deleting quiz', ID)

        const { data, error } = await supabase
        .from('quizes')
        .delete()
        .match({id: ID});

      });
    }
    

    useEffect(() => {
        eraseSubmission();
        fetchRandomQuiz();

      }, []);

    return(
        <div className="quiz text-yellow-500 text-center my-10">
            <h2>{ currentQuiz }</h2>
            <Quiz />
            <CountdownTimer eraseSubmission={ eraseSubmission } fetchRandomQuiz={ fetchRandomQuiz } />

        </div>
    );
}
export default QuizParent;

