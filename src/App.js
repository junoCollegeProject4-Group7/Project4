
import './App.scss';
import {useState, useEffect} from "react";
// this is used to access and store data from/to firebase
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from './firebase';


function App() {
    const [players, setplayers] = useState([]);

    useEffect(()=>{
    //     // variable that holds data details
        const database = getDatabase(firebaseConfig);
    //     // references the database
        const databaseref = ref(database);
    //     // adding event listener to the variable from firebase 
        onValue (databaseref, (response) => {
            console.log(response.val())
        })
    }, [])

    return(
        <div>
            <h1>this is a test</h1>
            <ul>
                {players.map((player)=>{
                    <li>
                        <p>{player}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}
  
  

export default App;
