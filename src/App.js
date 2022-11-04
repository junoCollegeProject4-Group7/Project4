import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import Generator from './pages/Generator';
import About from './pages/About';

function App() {

    return (
        <div className="wrapper">
            <header>
                <Link to="/">
                    <h1>Trivia Time</h1>
                </Link>
            </header>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path='./pages/Generator.js' element={<Generator />} />
                {/* <Route path='./pages/Quiz.js' element={<Quiz />} />
                <Route path='./pages/Scoreboard' element={<Scoreboard />} /> */}
            </Routes>
        </div>
    )
}

export default App;
