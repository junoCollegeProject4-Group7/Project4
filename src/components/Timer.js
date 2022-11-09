import React, { useEffect, useState } from 'react';

const Timer = (currentQuestion) => {
	const [counter, setCounter] = useState(30);
	//yolo
	const countdown = () => {
		setCounter(30);
		const intervalID = setInterval(() => {
			setCounter((current) => (current - 1 < 0 ? 0 : current - 1));
		}, 1000);
		return intervalID;
	};

	useEffect(() => {
		countdown();
		if (currentQuestion === currentQuestion + 1) {
			countdown(30);
		}
	}, []);

	return <span>{counter}</span>;
};

export default Timer;

// changed name
