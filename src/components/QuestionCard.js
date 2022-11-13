import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, set, update } from 'firebase/database';
import Timer from './Timer';
import Scoreboard from '../pages/Scoreboard';

//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question, userName, resetTimer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [timerReset, setTimerReset] = useState(false);
	const [showScore, setShowScore] = useState(true);

  const questions = question.map(function (q) {
    return q.question;
  });
  

	const answerBank = question.map(function (ans) {
		const answer = ans.incorrect_answers + ',' + ans.correct_answer;
		return answer.split(',');
	});

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
    resetTimer();
    setCurrentQuestion(currentQuestion + 1);
    if (e.target.textContent === correctAns[currentQuestion]) {
      setScore(score + 1);
    } else {
      setScore(score);
    }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(false);
		}
	};

	return (
		<>
			{showScore ? (
				<div className='card'>
					<Timer currentQuestion={currentQuestion} />
					<div className='question'>
            {/* check if array is not empty */}
						{questions.length > 0 && questions[currentQuestion]
							.replace(/&quot;/g, '"')
							.replace(/&rsquo;/g, "'")
							.replace(/&Eacute;/g, 'é')
							.replace(/&#039;/g, "'")
							.replace(/&shy;/g, '')}
					</div>
					<div className='answers'>
						<div>
							{/* splits answer array by delimiter and maps the array adding a button to handle  */}
              {/* check if answerBank is an empty  */}
							{answerBank[currentQuestion] && answerBank[currentQuestion].map((ans) => {
								return (
									<button
                    key={ans}
										onClick={(e) => {
											handleSubmit(e);
										}}
									>
										{ans}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<Scoreboard userName={userName} />
			)}
		</>
	);
};
export default QuestionCard;