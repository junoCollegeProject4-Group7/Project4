import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
	//asdasd
	return (
		<>
			<div className='aboutModal'>
				<p>
					Welcome to the quiz app. Here you will select a quiz genre, how hard
				</p>
				<div className='startBtn'>
					<Link to='../pages/Generator.js'>Click here to begin</Link>
				</div>
			</div>
		</>
	);
};

export default About;

// changed name
