import React, { useEffect, useState } from 'react';

const Timer = () => {
	const [counter, setCounter] = useState(30);

	useEffect(() => {
		if (counter > 0) {
			//sets intervals
			setTimeout(() => setCounter(counter - 1), 1000);
		}
	}, [counter]);

	return <span>{counter}</span>;
};

export default Timer;
