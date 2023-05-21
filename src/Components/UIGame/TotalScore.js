function TotalScore({ totalScore, username }) {
    return (
        <div className="inline-block z-10 p-2 bg-yellow-400 rounded-lg text-xs md:text-base">
            { username ? (`${username}'s Total Score: ${ totalScore }`) : (`Total Score: ${ totalScore }`)} </div>

    );
}

export default TotalScore;