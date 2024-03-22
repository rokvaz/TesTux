import '../app/globals.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const jsonResponse: ResponseQuestion [] = [
  {
    "klausimas": "Kiek kainuoja šalta arbata fakultete",
    "taskai": 10,
    "tipas": 4,
    "teising_ats": "1 eur",
    "neteising_ats1": "0.60 eur",
    "neteising_ats2": "1.5 eur",
    "neteising_ats3": "0.9 eur"
  },
  {
    "klausimas": "Kokiame mieste esame dabar",
    "taskai": 60,
    "tipas": 4,
    "teising_ats": "Kaune",
    "neteising_ats1": "Šiauliuose",
    "neteising_ats2": "Klaipėdoje",
    "neteising_ats3": "Vilniuje"
  },
  {
    "klausimas": "Kiek žmoniu yra mūsų komandoje",
    "taskai": 50,
    "tipas": 4,
    "teising_ats": "4",
    "neteising_ats1": "3",
    "neteising_ats2": "2",
    "neteising_ats3": "1"
  },
  {
    "klausimas": "Ar KTU yra universitetas",
    "taskai": 100,
    "tipas": 2,
    "teising_ats": "TAIP",
    "neteising_ats1": "NE",
    "neteising_ats2": "",
    "neteising_ats3": ""
  }
]

interface Answer {
  text: string | number;
  isCorrect: boolean;
  points: number;
}
interface Question {
  question: string;
  points: number;
  questionType: number;
  answers: Answer[];
}
interface ResponseQuestion {
  klausimas: string;
  taskai: number;
  tipas: number;
  teising_ats: string | number;
  neteising_ats1: string | number;
  neteising_ats2: string | number;
  neteising_ats3: string | number;
}

export default function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [bgColor, setBgColor] = useState("bg-custom-aqua");
  const [seconds, setSeconds] = useState(30); // Starting seconds for the timer
  const [isActive, setIsActive] = useState(true); // Timer active state

  let shuffleAnswers = (array: Answer[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let clickHandler = (answer: Answer) => {
    if (answer.isCorrect) {
      // load other question
      // increase score
      //setScore(() => score + answer.points)
      const timer = setTimeout(() => {
        setScore(() => score + answer.points)
      }, 500)
      resetTimer();
    } else { // Wrong answer picked -> game over
      stopTimer();
      const timer = setTimeout(() => {
      gameOverAction();
      }, 500)
    }
  }
  // Start the timer
  const startTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  }

  // Reset the timer
  const resetTimer = () => {
    setIsActive(true);
    setSeconds(30); // Reset to starting seconds
  };

  const gameOverAction = () => {
    setBgColor("bg-red-500") // Change background to red
    document.getElementById("box")!.innerHTML="Game over" // Write "game over" in question box
    document.getElementById("choice")!.innerHTML="" // Delete all buttons
    const timer = setTimeout(() => { // Redirect to gameover page after 1.5 sec
      window.location.href = 'http://localhost:3000/gameover';
    }, 1500);
  }

  useEffect(() => {
    // Function to pick a random question
    const pickRandomQuestion = () => {
      const randomQuestionObject: ResponseQuestion = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];

      let answers: Answer[];
      if (randomQuestionObject.tipas == 2) {
        answers = [
          {text: randomQuestionObject.teising_ats, isCorrect: true, points: randomQuestionObject.taskai},
          {text: randomQuestionObject.neteising_ats1, isCorrect: false, points: randomQuestionObject.taskai}
        ]
      } else if (randomQuestionObject.tipas == 4) {
        answers = [
          {text: randomQuestionObject.teising_ats, isCorrect: true, points: randomQuestionObject.taskai},
          {text: randomQuestionObject.neteising_ats1, isCorrect: false, points: randomQuestionObject.taskai},
          {text: randomQuestionObject.neteising_ats2, isCorrect: false, points: randomQuestionObject.taskai},
          {text: randomQuestionObject.neteising_ats3, isCorrect: false, points: randomQuestionObject.taskai},
        ]
      } else {
        throw new Error("Incorrect question type. Legal types are 2 and 4");
      }

      shuffleAnswers(answers);

      let question: Question = {
        question: randomQuestionObject.klausimas,
        points: randomQuestionObject.taskai,
        questionType: randomQuestionObject.tipas,
        answers: answers
      };

      setCurrentQuestion(question);
    };

    pickRandomQuestion();
  }, [score]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      gameOverAction();
      setIsActive(false); // Optionally stop the timer
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
  }, [bgColor])

  if (!currentQuestion) return <div>Loading question...</div>;

  return (
    <div className={`${bgColor} min-h-screen flex flex-col items-center justify-center`}>
      {/* Score */}
      <div className="text-3xl font-bold mb-8 p-4">
        Score: {score}
      </div>

      {/* Timer at the top */}
      <div className="text-5xl font-bold mb-8 p-4">
        {seconds}
      </div>

      {/* Question section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800" id="box">{currentQuestion.question}</h2>
          </div>
          {/* Powerup menu */}
          <div className="fixed top-50 right-10 bg-white p-35 rounded-lg shadow-lg max-w-2xl mb-8 text-center flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-gray-800" id="box">Power Ups</h2>
              <button className="mx-4 mt-4 px-10 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
                  50/50
              </button>
              <button className="mx-4 mt-4 px-10 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
                  Add time
              </button>
              <button className="mb-4 mx-4 mt-4 px-10 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
                  Random ability
              </button>
            </div>

      {(currentQuestion.questionType == 4) ? (
        <div className="grid grid-cols-2 gap-4 max-w-xs w-full" id="choice">
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[0].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[0])}}>
            {currentQuestion.answers[0].text}
          </button>
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[1].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[1])}}>
            {currentQuestion.answers[1].text}
          </button>
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[2].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[2])}}>
            {currentQuestion.answers[2].text}
          </button>
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[3].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[3])}}>
            {currentQuestion.answers[3].text}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-xs w-full" id="choice">
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[0].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[0])}}>
            {currentQuestion.answers[0].text}
          </button>
          <button className={`bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ${currentQuestion.answers[1].isCorrect ? "active:bg-green-500" : "active:bg-red-500"}`} onClick={() => {clickHandler(currentQuestion.answers[1])}}>
            {currentQuestion.answers[1].text}
          </button>
        </div>
        )
      }
      
      <div className="mb-8 p-4 absolute bottom-0 h-16 w-16 bg-custom-yellow text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ">
       <Link href= "/howtoplay"><button className = "h-8 w-8">Help</button></Link>
      </div>
    </div>
  );
}