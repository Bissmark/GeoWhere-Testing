import TotalScore from "./TotalScore";

// The UI element showing after you have completed 5 rounds, or the Timer ends
export const Results = ({ totalScore }) => {
    return (
        <div>
            <div className="congrats">Congrats</div>
            <TotalScore totalScore={ totalScore } />
        </div>
    );
};