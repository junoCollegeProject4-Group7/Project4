// import Generator from './pages/Generator';
// import About from './pages/About';
import { useState, useEffect } from 'react';
// this is used to access and store data from/to firebase
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebaseConfig from '../firebase';
import CharGen from './CharGen';

function FireData() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        onValue(databaseRef, (response) => {
            const data = response.val();


            setPlayers([data.player]);
        });
    }, []);



    const [userInput, setUserInput] = useState("");

    const newState = []
    for (let key in setPlayers) {
        newState.push({ key: key, name: setPlayers[key] })
        // console.log(data)
    }

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
      };

    const handleFormSubmit = (event) => {
        // preventing the default action of the form refresh on submit/button
        event.preventDefault();
        // console.log(userInput);
      
        // now to push the information to firebase!
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        push(databaseRef, userInput);
        setUserInput("");
      };


    return (
        <ul>
            {players.map((player) => {
                // console.log(player)
                return (
                    <li key={setPlayers.id}>
                        <h1>{player.name}</h1>
                        <p>{player.point}</p>
                    </li>
                    // <li key={player.id}>
                    //                                 <h1>{player.name}</h1>
                    //     <h1>{player.points}</h1>
                    // </li>
                )
            })}
            {/* <CharGen />
            <button userName={userName}>BEGIN</button>  */}
            <form>
                <label htmlFor="newCharacter">Enter Name</label>
                <input
                    avatar=""
                    onChange={handleInputChange}
                    value={userInput}
                />
                
                <button onClick={handleFormSubmit}>BEGIN</button>
                {/* on user input, Avatar will be randomly generated */}
            </form>
        </ul>


    )
}

export default FireData;