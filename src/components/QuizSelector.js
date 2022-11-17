import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import QuestionCard from './QuestionCard';
import { v4 } from 'uuid';
import mascot from '../assests/meeseeks-removebg-preview.png';

//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuizSelector = () => {
	const [category, setCategory] = useState(0);
	const [difficulty, setDifficulty] = useState('');
	const [questionBank, setQuestionBank] = useState([]);
	const [loading, setIsLoading] = useState(true);
	const [avatarLoading, setAvatarLoading] = useState(true);
	const [quizLoad, setQuizLoad] = useState(true);
	const [avatar, setAvatar] = useState('');
	const [userName, setUserName] = useState('');
	const id = v4();

	const answerTime = 30;
	const [count, setCount] = useState(answerTime);
	const [timer, setTimer] = useState(undefined);

	useEffect(() => {
		if (count === 0) stopTimer();
	}, [count]);

	const startTimer = () => {
		setTimer(
			setInterval(() => {
				setCount((prevCount) => prevCount - 1);
			}, 1000)
		);
	};

	// ternary logic for answer feedback 

	const resetTimer = () => {
		clearInterval(timer);
		setCount(answerTime);
		startTimer();
	};

	const stopTimer = () => {
		clearInterval(timer);
	};

	const handleSearchAvatar = (e) => {
		e.preventDefault();
		avatarGen();
		setAvatarLoading(false);
	};

	useEffect(() => {
		if (avatar && userName) {
			pushFirebase();
		}
	}, [avatar]);

	const pushFirebase = () => {
		const db = getDatabase();
		set(ref(db, 'users/' + userName), {
			name: userName,
			avatar: avatar,
			score: 0,
		});
	};

	const avatarGen = async () => {
		try {
			const response = await axios
				.get(
					`https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg?scale=25`
				)
				.then((res) => {
					setAvatar(res.config.url);
				});
		} catch (error) {
			alert(error);
		}
	};

	const questions = async () => {
		try {
			if (difficulty && category && userName && avatar) {
				const res = await axios.get(
					`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
				);
				setQuestionBank(res.data.results);
			} else {
				alert('Please select an avatar');
			}
		} catch (err) {
			alert(err);
		}
	};

	const handleSubmitQuestion = (e) => {
		e.preventDefault();
		questions();
		setIsLoading(false);
		startTimer();
	};

	//true and true and get this
	if (avatarLoading && loading) {
		return (
			<form onSubmit={(e) => handleSearchAvatar(e)} className='charGen'>
				<div className='welcomeAvatar'>
					<img className="logoAvatar-Hello" src={mascot} alt="Trvia Time Avatar" />
					<h2 className='speechBubble'>
						Nice to meet you! What's your name?
					</h2>
				</div>
				<label htmlFor='Character Icon Generator'></label>
				<input
					type='text'
					placeholder='Enter your name'
					// sets username
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</form>
		);
	} else if (loading && !avatarLoading) {
		return (
			<>
				<div className='userCreate'>
					<h2 className='userName'>Hello, {userName}!</h2>
					<img className='userAvatar' src={avatar} alt='API Generated Avatar'></img>
					<form onSubmit={(e) => handleSubmitQuestion(e)}>
						<label htmlFor='quizCategory'></label>
						<select
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						>
							<option value={8}>Pick Your Category</option>
							<option value={9}>General knowledge</option>
							<option value={10}>Books</option>
							<option value={11}>Film</option>
							<option value={12}>Music</option>
							<option value={14}>Television</option>
							<option value={16}>Board Games</option>
							<option value={17}>Science & Nature</option>
							<option value={18}>Computers</option>    {/* is not working */}
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
				</div>
			</>
		);
	} else if (!avatarLoading && !loading) {
		return (
			<>
				<QuestionCard
					question={questionBank}
					userName={userName}
					avatar={avatar}
					resetTimer={resetTimer}
					stopTimer={stopTimer}
					count={count}
				></QuestionCard>
			</>
		);
	}
};

export default QuizSelector;