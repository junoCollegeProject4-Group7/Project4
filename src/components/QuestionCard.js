import React from 'react';
import { useState } from 'react';
//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question }) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState(0);

	const questions = question.map(function (q) {
		return q.question;
	});
	const answerBank = question.map(function (ans) {
		return ans.incorrect_answers + ',' + ans.correct_answer;
	});

	const correctAns = question.map(function (answer) {
		return answer.correct_answer;
	});
	const handleSubmit = () => {
		setCurrentQuestion(currentQuestion + 1);
		if (currentQuestion === currentQuestion.length) {
			// return error page import
		}
	};

	console.log(question);

	return (
		<>
			<div className='card'>
				<div className='question'>{questions[currentQuestion]}</div>
				<div className='answers'>
					<div>
						{answerBank[currentQuestion].split(',').map((ans) => {
							return <button onClick={handleSubmit}>{ans}</button>;
						})}
					</div>
				</div>
			</div>
		</>
	);
};
export default QuestionCard;
