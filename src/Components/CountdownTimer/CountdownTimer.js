import { useState, useEffect } from "react";
import QuizParent from "../Quiz/QuizParent";
import supabase from "../../supabaseClient";
import React, { Component } from "react";

class CountdownTimer extends Component {
    state = {
        minutes: 0,
        seconds: 5
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.props.eraseSubmission();
                    this.props.fetchRandomQuiz();
                    this.setState({ minutes: 0, seconds: 5});
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }


    render() {
        const { minutes, seconds } = this.state

        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <p>Time up!</p>
                    :   <p>Timer: { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</p>
                }
            </div>
        )
    }
}

export default CountdownTimer;