import React from 'react';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
// group components/imports
import Timer from './Timer';
import Scoreboard from '../pages/Scoreboard';
import { v4 } from 'uuid';

//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question, userName, resetTimer, stopTimer, count }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timerReset, setTimerReset] = useState(false);
  const [showScore, setShowScore] = useState(true);
  const [answerBank, setAnswerBank] = useState([]);

  const questions = question.map(function (q) {
    return q.question;
  });

  // shuffling the answers method https://bost.ocks.org/mike/shuffle/ curtesy of Paco
  // create folder
  function shuffle(ans) {
    let m = ans.length,
    t,
    i;
    // While there remain elements to shuffle…
    if(m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = ans[m];
      ans[m] = ans[i];
      ans[i] = t;
    }
    return ans;
  }
  useEffect(()=>{
    const ansArray = [];
    question.forEach(element => {
      const answer =`${element.incorrect_answers.toString()},${element.correct_answer}`.split(',')
      ansArray.push(shuffle(answer))
    });
    setAnswerBank(ansArray)
  }, [question])

  
  // }); //Shuffle array method
  
  // const allAsnwers = [...ans.incorrect_answers, ans.correct_answer];
  // const shuffledAns = shuffle(allAsnwers);
  // console.log(shuffledAns, "these are all the shuffled Ans")
  // console.log(currentQuestion, "this is answer.correct_answer")

  // shuffle date b/f rendering 
  
  // extra code ends here 
  
  


  const correctAns = question.map(function (answer) {
    return answer.correct_answer;
  });

  const updateFirebase = () => {
    const db = getDatabase();
    update(ref(db, `users/${userName}`), {
      score: score,
    });
  };

  useEffect(() => {
    updateFirebase();
  }, [score]);

  const handleSubmit = (e) => {
    setCurrentQuestion(currentQuestion + 1);
    if (e.target.textContent === correctAns[currentQuestion]) {
      setScore(score + 1);
    } else {
      setScore(score);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      resetTimer();
    } else {
      setShowScore(false);
      stopTimer();
    }
  };
  console.log(answerBank)
  return (
    <>
      {showScore ? (
        <div className="card">
          <Timer count={count} />
          <Timer currentQuestion={currentQuestion} />
          <div className="question">
            {/* questions.length > 0 && */}
            {questions.length > 0 &&
              questions[currentQuestion]
                .replace(/&quot;/g, '"')
                .replace(/&rsquo;/g, "'")
                .replace(/&Eacute;/g, 'é')
                .replace(/&#039;/g, "'")
                .replace(/&shy;/g, '')}
          </div>
          <div className="answers">
            <div>
              {/* splits answer array by delimiter and maps the array adding a button to handle  */}
              {answerBank[currentQuestion] &&
               answerBank[currentQuestion].map((ans) => {
                  return (
                    <button
                      key={v4()}
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      {ans
                        .replace(/&quot;/g, '"')
                        .replace(/&rsquo;/g, "'")
                        .replace(/&Eacute;/g, 'é')
                        .replace(/&#039;/g, "'")
                        .replace(/&shy;/g, '')}
                    </button>
                  );
                })}
            </div>
          </div>
          <Timer count={count} />
        </div>
      ) : (
        <Scoreboard userName={userName} />
      )}
    </>
  );
};
export default QuestionCard;
