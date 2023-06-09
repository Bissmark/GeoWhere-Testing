function FinalScore(props) {
    return (
        <div className="inline-block z-10 mr-10 p-4 bg-yellow-400 rounded-lg md:text-base">
            { props.username ? (`${props.username}'s Total Score: ${ props.totalScore }`) : (`Total Score: ${ props.totalScore }`)} </div>

    );
}

export default FinalScore;