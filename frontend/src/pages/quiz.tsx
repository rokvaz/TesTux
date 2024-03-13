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

  let shuffleAnswers = (array: Answer[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    // Function to pick a random question
    const pickRandomQuestion = () => {
      const randomQuestionObject: ResponseQuestion = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];

      let answers: Answer[];
      if (randomQuestionObject.tipas == 2) {
        answers = [
          {text: randomQuestionObject.teising_ats, isCorrect: true},
          {text: randomQuestionObject.neteising_ats1, isCorrect: false}
        ]
      } else if (randomQuestionObject.tipas == 4) {
        answers = [
          {text: randomQuestionObject.teising_ats, isCorrect: true},
          {text: randomQuestionObject.neteising_ats1, isCorrect: false},
          {text: randomQuestionObject.neteising_ats2, isCorrect: false},
          {text: randomQuestionObject.neteising_ats3, isCorrect: false},
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
  }, []);

  if (!currentQuestion) return <div>Loading question...</div>;

  return (
    <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
      {/* Timer at the top */}
      <div className="text-5xl font-bold mb-8 p-4">
        30
      </div>

      {/* Question section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.question}</h2>
      </div>

      {(currentQuestion.questionType == 4) ? (
        <div className="grid grid-cols-2 gap-4 max-w-xs w-full">
          <button className="bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            {currentQuestion.answers[0].text}
          </button>
          <button className="bg-custom-orange p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            {currentQuestion.answers[1].text}
          </button>
          <button className="bg-custom-orange p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            {currentQuestion.answers[2].text}
          </button>
          <button className="bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            {currentQuestion.answers[3].text}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-xs w-full">
          <button className="bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            {currentQuestion.answers[0].text}
          </button>
          <button className="bg-custom-orange p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
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