// The UI element for showing the round on the GuessMap page
function Round(props) {
    return (
        <div className="z-10 bg-yellow-400 absolute p-4 font"> Round: {props.round}/5  </div>
    );
}

export default Round;