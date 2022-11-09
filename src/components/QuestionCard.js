import React from 'react';
import { useState } from 'react';
import { getDatabase, ref, onValue, push, update } from "firebase/database";
import firebaseConfig from "../firebase";
//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question }) => {
	//counter--> keeps track of current displayed question
	const [currentQuestion, setCurrentQuestion] = useState(0);
	// score--> variable that holds score; initial state 0 
	const [score, setScore] = useState(0);
	// scoreboard--> false to now show, then change state after questions to true to show scoreboard OR route to scoreboard page? 
	// const [showScore, setShowScore] = useState(false);
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
	// Potential firebase code to update/push code to DB
	// const updateFirebase = (score) => {
	// 	const database = getDatabase(firebaseConfig);
	// 	const databaseRef = ref(database, `/${score}`);
	// 	update(ref(database, `/score`), {
	// 		score: {score},
	// 	  });
	// }
	//moves to the next question using a counter
	const handleSubmit = (e) => {
		setCurrentQuestion(currentQuestion + 1);
		// 	if statement that listens in on handleSubmit event
		// compares selected input (targeted from within the object)
		if (e.target.textContent === correctAns[currentQuestion]) {
			setScore(score + 1)
			// alert("correct")
		} else {
			// alert("wrong")
		}
		//end of questions, sends to scoreboard, need firebase
		if (currentQuestion === currentQuestion.length) {
			// return error page import
			// thinking if once we complete length we turn state value to true to show scoreboard vs "You scored {score} out of 10" throughout the experience
			// setShowScore(true);
			updateFirebase();
		}
	};


	return (
		<>
			<div className='card'>
				<div className='question'>{questions[currentQuestion]}</div>
				<div className='answers'>
					<div>
						{/* splits answer array by delimiter and maps the array adding a button to handle  */}
						{answerBank[currentQuestion].split(',').map((ans) => {
							return <button onClick={(e) => { handleSubmit(e) }}>{ans}</button>;
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
