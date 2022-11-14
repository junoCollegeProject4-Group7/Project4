import React from 'react';
import { Link } from 'react-router-dom';
import mascot from '../assests/meeseeks-removebg-preview.png';
const About = () => {
	return (
		<>
			<div className='aboutModal wrapper'>
				<img className='mascot' src={mascot} />
			</div>
			<div className='aboutDescription'>
				<h3>
					Welcome to Trivia Time! Learn and Have fun, Create your Avatar, Decide
					your Topic and Difficulty then the brain teaser begins! Good Luck
				</h3>
				<div className='begin'>
					<Link to='/gen'>Click here to begin</Link>
				</div>
			</div>
		</>
	);
};

export default About;

// changed name