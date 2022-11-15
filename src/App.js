import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import './fonts/MikadoBold.ttf';
import About from './pages/About';
import QuizSelector from './components/QuizSelector';
import Scoreboard from './pages/Scoreboard';
import { useState, useEffect } from 'react';
// this is used to access and store data from/to firebase
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from './firebase';
// import Quiz from './components/QuizSelector';
import Generator from './pages/Generator';
import FireData from './components/FireData';
import QuestionCard from './components/QuestionCard';
import Error from './pages/Error';import 
{ Header } from './components/Header';


function App() {
	// const [players, setplayers] = useState([]);
	// useEffect(() => {
	// 	//     // variable that holds data details
	// 	const database = getDatabase(firebaseConfig);
	// 	//     // references the database
	// 	const databaseref = ref(database);
	// 	//     // adding event listener to the variable from firebase
	// 	onValue(databaseref, (response) => {
	// 		console.log(response.val());
	// 	});
	// }, []);
	return (
		<>
			<Header />
            <Routes>
                <Route exact path="/" element={<About />} />
                <Route exact path='/pages/Generator' element={<Generator />} />
                {/* <Route path='./pages/Quiz.js' element={<QuizSelector />} /> */}
                <Route exact path='/pages/Scoreboard' element={<Scoreboard />} />
				<Route exact path='/pages/Questioncard' element={<QuestionCard />} />
				<Route exact path='/pages/Error' element={<Error />} />
			 </Routes>
		</>
	);
}

export default App;