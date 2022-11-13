import { Link } from "react-router-dom"
import mascot from '../assests/meeseeks-removebg-preview.png';

export const Header = () => {
    return (
        <nav className='NavBar'>
            <div className="logo">
            <img className="logoAvatar" src={mascot} alt="Trvia Time Avatar" />
            <h3>trivia time</h3>
            </div>
            <ul className="NavBar-list">
                <li className="NavBar-item">
                <Link to='/'>Home
                </Link>
                </li>
                <li className="NavBar-item">
                <Link to='../pages/Scoreboard.js'>High Scores
                </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Header