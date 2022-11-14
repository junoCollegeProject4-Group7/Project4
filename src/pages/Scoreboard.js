import React from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebaseConfig from '../firebase';

const Scoreboard = ({ userName }) => {
	const [results, setResults] = useState(0);
	const [avatar, setAvatar] = useState('');
	useEffect(() => {
		const database = getDatabase(firebaseConfig);
		const databaseRef = ref(database, 'users/' + userName);
		onValue(databaseRef, (response) => {
			const data = response.val().score;
			const dataImg = response.val().avatar;
			setResults(data);
			setAvatar(dataImg);
			console.log('RESPONSE data', response.val().avatar);
		});
	}, []);
	return (
		<div>
			<div className='resultSection'>
				<p className='userResult'>
					{userName} , You scored {results} out of 10
				</p>
				<img className='userAvatar' src={avatar} alt='API Generated Avatar' />
			</div>
		</div>
	);
};

export default Scoreboard;