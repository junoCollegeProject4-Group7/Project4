// import Generator from './pages/Generator';
// import About from './pages/About';
import { useState, useEffect } from 'react';
// this is used to access and store data from/to firebase
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebase';
import CharGen from './charGen';


function FireData () {
    
    const [players, setPlayers] = useState([]);
    
	useEffect(() => {
        //     // variable that holds data details
		const database = getDatabase(firebaseConfig);
		//     // references the database
		const databaseref = ref(database);
		//     // adding event listener to the variable from firebase
		onValue(databaseref, (response) => {
            // storing the returned data as a variable
            const data = response.val();   
            // console.log(data, "this is  data")

            // creating an array to store our data
            const newState = [];
            //  loop through the returned object
            for (let key in data.player) {
                    // const { scores, name } = data.player[key];
                    newState.push({ data[player] });
                }
             setPlayers([data.player]);

        });
    }, []);
        return (
            <div>
                <h1>test </h1>
                <CharGen />
            <ul>
                {players.map((player) => {
                return (
                    <li key={player.id}>
                        <p>{player.name}</p>
                        <p>{player.point}</p>
                    </li>
                )
        })}
      </ul>
    </div>
  )

        

    }

    export default FireData;