import React, { useEffect } from 'react';

const CountdownTimer = (props) => {

    useEffect(() => {
        const interval = setInterval(() => {
            props.setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="z-10 bg-yellow-400 absolute px-10 py-5 right-0 md:text-4xl">
            <div className='w-12 md:w-16 text-center'>
                {props.seconds > 0 ? (formatTime(props.seconds)) : (props.setRound(6))}
            </div>
        </div>
    )
};

export default CountdownTimer;