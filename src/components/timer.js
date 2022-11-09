import React, { useEffect, useState } from 'react';

const Timer = (currentQuestion) => {
	const [counter, setCounter] = useState(30);

	useEffect(() => {
		if (counter > 0) {
			//sets intervals
			setTimeout(() => setCounter(counter - 1), 1000);
		} else if (currentQuestion) {
			setCounter(30);
		}
	}, [counter]);

	return <span>{counter}</span>;
};

export default Timer;
