import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';

// import Generator from './pages/Generator';
// import About from './pages/About';
import { useState, useEffect } from 'react';
// this is used to access and store data from/to firebase
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from './firebase';
import FireData from './components/FireData';

function App() {
	
	return (
		<div className='wrapper'>
            <FireData />
			{/* <header>
                <Link to="/">
                    <h1>Trivia Time</h1>
                </Link>
            </header>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path='./pages/Generator.js' element={<Generator />} />
                {/* <Route path='./pages/Quiz.js' element={<Quiz />} />
                <Route path='./pages/Scoreboard' element={<Scoreboard />} /> */}
			{/* </Routes> */}
		</div>
	);
}

export default App;
