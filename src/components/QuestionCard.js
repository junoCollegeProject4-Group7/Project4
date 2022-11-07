import React from 'react';
import { useState } from 'react';
//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question }) => {
	//counter--> keeps track of current displayed question
	const [currentQuestion, setCurrentQuestion] = useState(0);

	//keeps track of list of questions
	const questions = question.map(function (q) {
		return q.question;
	});
	//keeps track of list of possible answers plus adds delimiters between incorrect plus correct answer
	const answerBank = question.map(function (ans) {
		return ans.incorrect_answers + ',' + ans.correct_answer;
	});
	//keeps track of correct answer
	const correctAns = question.map(function (answer) {
		return answer.correct_answer;
	});
	//moves to the next question using a counter
	const handleSubmit = () => {
		setCurrentQuestion(currentQuestion + 1);
		//end of questions, sends to scoreboard, need firebase
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
						{/* splits answer array by delimiter and maps the array adding a button to handle  */}
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
