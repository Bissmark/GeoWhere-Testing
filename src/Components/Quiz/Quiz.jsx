import React from "react";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";

function Quiz(props) {
  const [quizes, setQuizes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, []);

  async function fetchQuiz() {
    let { data: quizes } = await supabase
      .from('quizes')
      .select('*')

      setQuizes(quizes);
  }
  function handleContent(e) {
    setContent(e.target.value);
  }

  async function handleSubmit() {
    //quiz content to supabase
    await supabase.from('quizes').insert({ content });
    setContent('');
    fetchQuiz('');
  }

  return (
    <div className="flex justify-center flex-col my-10 text-center">
      <h1 className="text-3xl">Welcome! </h1>
      <div>
        <input type="text" value={ content } onChange={ handleContent } />
        <br />
        <button className="bg-yellow-400 hover:bg-orange-700 text-black active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={ handleSubmit }>Submit Answer</button>
      </div>

      { quizes.map(quiz => (
        <div key={quiz.id}>{ quiz.content }</div>
      ))}
      
    </div>
  );
}

export default Quiz;
