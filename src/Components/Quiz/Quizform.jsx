import React from "react";
import { Link } from "react-router-dom";

const QuizForm = () => {
    return (
        <div className="text-center text-yellow-500 pb-5 md:mx-auto md:w-1/3">
            <div className="mt-5 mr-8 ml-8 ">
                <h1 className=" text-3xl font-bold mb-2">Host a quiz</h1>
                <h4>Take on the role as host, and create an event with both locations and quizzes. Who will come out on top?
                </h4>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 m-5">
                <img className="mx-auto mb-5" src="https://www.geoguessr.com/_next/static/images/onboarding-1-2x-58eaef4035cf1e4155cdbd187a530895.png" alt="globe" />
                <h2>Host your own game show</h2>
                <h4>Create custom quiz games and invite up to 1000 people</h4>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 m-5">
                <img className="mx-auto" src="https://www.geoguessr.com/_next/static/images/onboarding-2-2x-45f377de5546d7a29c49c5c5202a0cf2.png" alt="thumbs up" />
                <h2>No account needed</h2>
                <h4>Anyone can join with any device in a matter of seconds.</h4>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 m-5">
                <img className="mx-auto" src="https://www.geoguessr.com/_next/static/images/onboarding-3-2x-95a89d5b0cb37f58ee54bf5a165986bd.png" alt="message" />
                <h2>Customize the quiz</h2>
                <h4>Add fun questions or pick particular locations around the world.</h4>
            </div>
            <Link className="text-xl focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 dark:focus:ring-yellow-900" to= "/Quiz">Create Quiz</Link>    
        </div>
    );
};

export default QuizForm;

