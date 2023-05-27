// The UI element for showing the round on the GuessMap page
function Round({ round }) {
    return (
        <div className="z-10 bg-yellow-400 absolute p-4 font"> Round: {round}/5  </div>
    );
}

export default Round;