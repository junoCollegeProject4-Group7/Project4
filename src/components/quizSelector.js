import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuizSelector = () => {
	const [category, setCategory] = useState(8);
	const [difficulty, setDifficulty] = useState('');
	const [questionBank, setQuestionBank] = useState([]);

	const questions = async () => {
		try {
			if (difficulty && category) {
				const res = await axios.get(
					`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
				);
				setQuestionBank(res.data.results);
			}
		} catch (err) {
			alert(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		questions();
	};

	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor='quizCategory'></label>
				<select
					onChange={(e) => {
						setCategory(e.target.value);
					}}
				>
					<option value={9}>General knowledge</option>
					<option value={10}>Books</option>
					<option value={11}>Film</option>
					<option value={12}> Music</option>
					<option value={13}>Musicals & Theatre</option>
					<option value={14}>Television</option>
					<option value={15}>Video Games</option>
					<option value={16}>Board Games</option>
					<option value={17}>Science & Nature</option>
					<option value={18}>Computers</option>
					<option value={19}>Math</option>
					<option value={20}>Mythology</option>
					<option value={21}>Sports</option>
					<option value={22}>Geography</option>
					<option value={23}>History</option>
					<option value={24}>Politics</option>
					<option value={25}>Art</option>
					<option value={26}>Celebrities</option>
					<option value={27}>Animals</option>
					<option value={28}>Vehicles</option>
					<option value={29}>Comics</option>
					<option value={30}>Gadgets</option>
					<option value={31}>Anime & Mangas</option>
					<option value={32}>Cartoon & Animation</option>
				</select>
				<select
					onChange={(e) => {
						setDifficulty(e.target.value);
					}}
				>
					<option value={''}>Pick your difficulty</option>
					<option value={'easy'}>Easy</option>
					<option value={'medium'}>Medium</option>
					<option value={'hard'}>Hard</option>
				</select>
				<button className='submit'>Submit</button>
			</form>
			<section className='quiz wrapper'>
				{questionBank.map((question) => {
					<QuestionCard question={question} />;
				})}
			</section>
		</>
	);
};

export default QuizSelector;
