import { decode } from "html-entities";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../helpers/Contexts";
import { shuffleArray } from "../../helpers/Utils";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz(props) {
  const { gameState, setGameState } = useContext(GameContext);
  const [allQuestions, setAllQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [restart, setRestart] = useState(false);

  function getAllQuestions(data) {
    if (!data) return;
    const allQuestions = data.results.map((question) => {
      return {
        ...question,
        question: decode(question.question),
        id: nanoid(),
        choices: shuffleArray([
          decode(question.correct_answer),
          ...question.incorrect_answers.map((answer) => decode(answer)),
        ]),
      };
    });
    return allQuestions;
  }

  function handleChoice({ value, question_id }) {
    setAnswers({ ...answers, [question_id]: value });
    console.log(answers);
  }

  function checkAnswers() {
    let answerScore = 0;

    for (const key in answers) {
      if (Object.hasOwnProperty.call(answers, key)) {
        const qAnswer = answers[key];
        const qId = key;
        allQuestions.forEach((question) => {
          if (question.id != qId) return;
          if (qAnswer != question.correct_answer) return;
          console.log("CORRECT", qId, qAnswer);
          answerScore++;
        });
      }
    }

    toggleResult();
    setScore(answerScore);
  }

  function toggleResult() {
    setShowResult((result) => !result);
  }

  function restartGame() {
    setRestart((prevRestart) => !prevRestart);
    getAllQuestions();
    setAnswers({});
    setScore(0);
    toggleResult();
  }

  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=10";

    // async function fetchData() {
    //   await fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => getAllQuestions(data));
    // }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAllQuestions(getAllQuestions(data));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("i fire once");
    // fetchData();
  }, [restart]);

  const questions = allQuestions.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question_text={question.question}
      choices={question.choices}
      handleChoice={handleChoice}
    />
  ));

  return (
    <div className="Quiz">
      {questions}

      {showResult > 0 ? (
        <div className="result-container">
          <h1 className="result-text">Your score is: {score}/10</h1>{" "}
          <button className="restart-btn" onClick={restartGame}>
            Play Again!
          </button>
        </div>
      ) : (
        <button className="check-btn" onClick={checkAnswers}>
          Check Answers
        </button>
      )}
    </div>
  );
}
