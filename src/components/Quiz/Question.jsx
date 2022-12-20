import React, { useContext, useState } from "react";
import { GameContext } from "../../helpers/Contexts";
import "./Quiz.css";
import "./Question.css";

export default function Question(props) {
  const { gameState, setGameState } = useContext(GameContext);

  const choices = props.choices.map((choice, i) => {
    return (
      <div key={props.id + choice} className="choices-container">
        <input
          type="radio"
          name={props.id}
          value={choice}
          id={props.id + choice}
          onChange={(e) =>
            props.handleChoice({ value: e.target.value, question_id: props.id })
          }
        />
        <label htmlFor={props.id + choice}>{choice}</label>
      </div>
    );
  });

  return (
    <div className="qna-container">
      <div className="question">{props.question_text}</div>
      <div className="options">{choices}</div>
    </div>
  );
}
