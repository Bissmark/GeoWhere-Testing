function TotalScore(props) {
    return (
        <div className="z-10 p-2 bg-yellow-400 rounded-lg text-xs md:text-base">
            { props.username ? (`${props.username}'s Total Score: ${ props.totalScore }`) : (`Total Score: ${ props.totalScore }`)} </div>

    );
}

export default TotalScore;