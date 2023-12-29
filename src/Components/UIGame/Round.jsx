// The UI element for showing the round on the GuessMap page
function Round(props) {
    return (
        <div className="z-10 bg-yellow-400 absolute px-10 py-5">
            <span className="w-12 md:w-40 md:text-4xl"> Round: {props.round}/5  </span>
        </div>
    );
}

export default Round;