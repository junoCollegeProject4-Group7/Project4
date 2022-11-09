import React from 'react';
import { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';

import { useEffect } from 'react';
import Timer from './timer';

//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question, userName }) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);

	const questions = question.map(function (q) {
		return q.question;
	});

	const answerBank = question.map(function (ans) {
		return ans.incorrect_answers + ',' + ans.correct_answer;
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
		setCurrentQuestion(currentQuestion + 1);
		if (e.target.textContent === correctAns[currentQuestion]) {
			setScore(score + 1);
		} else {
			setScore(score);
		}

		if (currentQuestion === currentQuestion.length) {
			//errorpage
		}
	};

	return (
		<>
			<div className='card'>
				<Timer currentQuestion={currentQuestion} />
				<div className='question'>{questions[currentQuestion]}</div>
				<div className='answers'>
					<div>
						{/* splits answer array by delimiter and maps the array adding a button to handle  */}
						{answerBank[currentQuestion].split(',').map((ans) => {
							return (
								<button
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
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			</div>
		</>
	);
};
export default QuestionCard;
