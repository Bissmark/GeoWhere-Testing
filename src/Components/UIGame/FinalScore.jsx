function FinalScore({ totalScore, username }) {
    return (
        <div className="inline-block z-10 mr-10 p-4 bg-yellow-400 rounded-lg md:text-base">
            { username ? (`${username}'s Total Score: ${ totalScore }`) : (`Total Score: ${ totalScore }`)} </div>

    );
}

export default FinalScore;