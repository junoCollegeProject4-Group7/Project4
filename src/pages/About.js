import React from 'react';
import { Link } from 'react-router-dom';
import mascot from '../assests/meeseeks-removebg-preview.png';
const About = () => {
	return (
		<div className='aboutHome wrapper'>
			<div className='bannerContainer'>
				<div className='aboutModal'>
					<img className="mascot" src={mascot} />
				</div>
				<div className='aboutDescription wrapper'>
					<Link to="/">
						<h1>Trivia Time</h1>
					</Link>
					<h3>
						Welcome to Trivia Time! Learn and Have fun, Create your Avatar, Decide your Topic and Difficulty then the brain teaser begins! Good Luck
					</h3>
					<div className='begin'>
						<Link to='../pages/Generator.js'>Click here to begin</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;