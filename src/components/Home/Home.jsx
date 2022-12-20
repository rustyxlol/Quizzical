import React, { useContext } from "react";
import { GameContext } from "../../helpers/Contexts";
import "./Home.css";

export default function Home(props) {
  const { gameState, setGameState } = useContext(GameContext);

  return (
    <div className="home">
      <h1 className="title">Quiz</h1>

      <button className="start-btn" onClick={() => setGameState("Quiz")}>
        Start
      </button>
    </div>
  );
}
