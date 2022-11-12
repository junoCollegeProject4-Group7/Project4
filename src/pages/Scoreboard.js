import React from 'react';
import score from '../components/QuestionCard';
import questions from '../components/QuestionCard';
import QuestionCard from '../components/QuestionCard';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import firebaseConfig from "../firebase";


const Scoreboard = ({userName}) => {
	// this state will track the books from our db

	const [results, setResults] = useState([]);

	useEffect(() => {
		const database = getDatabase(firebaseConfig);
		const databaseRef = ref(database, "users/" + userName);
		onValue(databaseRef, (response) => {
			const data = response.val()
			const newState = []
			  // loop through the returned object
			  for (let key in data) {
			    // we're coming back to this in a bit
			    // console.log(key)
			    // console.log(response.val());
			    newState.push({ key: key, name: data[key]})
			    //  {key: , name:}

			  }
			setResults(newState)
			console.log(results)
		});
	}, []);
	console.log(userName)
	return <div>
		<h1>Hello</h1>
			<ol>

                { results.map((result) => {
                    return(
                        <li key={name.name}>{result.score}</li>
                    )
                }) }
            </ol>
		<div className='result-section'>
			<p>{results.name}</p>
			You scored {score} out of {questions.length}
		</div>
	</div>;
};

export default Scoreboard;

// changed name
