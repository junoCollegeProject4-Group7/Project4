import React, { useState } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

//api is url: `https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg?scale=25`,
const CharGen = () => {
	const [avatar, setAvatar] = useState('');
	const [userName, setUserName] = useState('');

	const id = v4();

	const handleSearch = (e) => {
		e.preventDefault();
		avatarGen();
	};
	const avatarGen = async (query) => {
		try {
			const response = await axios
				.get(
					`https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg?scale=30`
				)
				.then((res) => {
					setAvatar(res.config.url);
				});
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSearch} className='charGen'>
				<label htmlFor='Character Icon Generator'></label>
				<input
					type='text'
					placeholder='Enter your name'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</form>
			{!avatar ? (
				<div></div>
			) : (
				<div>
					<p>This is your avatar</p>
					<img className='icon' src={avatar} alt='icon'></img>;
					<h2>{userName}</h2>
				</div>
			)}
		</>
	);
};

export default CharGen;
