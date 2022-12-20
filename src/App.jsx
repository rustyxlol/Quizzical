import "normalize.css";
import "./App.css";
import { useState, useContext } from "react";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import { GameContext } from "./helpers/Contexts";

function App() {
  const [gameState, setGameState] = useState("Home");

  return (
    <div className="App">
      <GameContext.Provider value={{ gameState, setGameState }}>
        {gameState == "Home" && <Home />}
        {gameState == "Quiz" && <Quiz />}
      </GameContext.Provider>
    </div>
  );
}

export default App;
