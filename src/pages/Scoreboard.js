import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebaseConfig from '../firebase';
import { Link } from 'react-router-dom';
import img1 from '../assests/meeseeksBeat.png';
import img2 from '../assests/meeseeksBust.png';
import img3 from '../assests/meeseeksSad.png';

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
				<>
					<img className="img1" src={img1} />
				</>
				<>
					<img className="img2" src={img2} />
				</>
				<>
					<img className="img3" src={img3} />
				</>
				<p className='userResult'>
					{userName} , You scored {results} out of 10
				</p>
				<img className='userAvatar' src={avatar} alt='API Generated Avatar' />
				<button>
					<Link exact to='/'>Play Again!</Link>
				</button>
			</div>
		</div>
	);
};

export default Scoreboard;