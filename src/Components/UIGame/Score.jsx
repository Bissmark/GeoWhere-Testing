function Score(props) {
    // Showing the Score on some views
    return (
      <div className='z-10 p-2 bg-yellow-400 rounded-lg text-xs md:text-base'>
        { props.username ? (`${props.username}'s Score this round: ${ props.newRoundScore }`) : (`Score this round: ${ props.newRoundScore }`)}
          </div>
    );
  }

  export default Score;
  
  