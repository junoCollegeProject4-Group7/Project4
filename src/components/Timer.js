import React, { useEffect, useState } from 'react';

const Timer = (currentQuestion) => {
	const [counter, setCounter] = useState(30);
	//yolo solo 

	useEffect(() => {
		const countdown =
		  counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(countdown);
	}, [counter]);
	
	// countdown();
	if (currentQuestion === currentQuestion + 1) {
		countdown(30);
	}

	
	// useEffect(() => {
	// const countdown = () => {
	// 	setCounter(30);
	// 	const intervalID = setInterval(() => {
	// 		setCounter((current) => (current - 1 < 0 ? 0 : current - 1));
	// 	}, 1000);
		
	// 	console.log("caanter", setCounter)
	// 	return () => {
	// 		clearInterval(intervalID);
	// 	} 
	// };



	return <span>{counter}</span>;
};

export default Timer;

// changed name
