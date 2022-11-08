import React, { useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import { getDatabase, ref, onValue, push } from "firebase/database";
import firebaseConfig from "../firebase";
//api is url: `https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg?scale=25`,
const CharGen = () => {
  //avatar saves data from avatarGen for icon to store in firebase
  const [avatar, setAvatar] = useState("");
  //saves user input from the user to store in firebase
  const [userName, setUserName] = useState("");

  //generates a unique key id for seed generation of the dicebear API
  const id = v4();

  //handles the search and calls back avatar Gen to create an avatar
  const handleSearch = (e) => {
    e.preventDefault();
    avatarGen();
    // Note: certain words don't seem to regiter in firebase

    // 90% functional, need to figure out error handling for the API
  };

  const pushFirebase = (url) => {
    // console.log("avatar ---->", avatar);
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database);
    push(databaseRef, {
      name: userName,
      avatar: url,
    });
  };
  //function to call the api and generate a random seed based on the unique id using uuid library
  const avatarGen = async () => {
    try {
      const response = await axios
        .get(
          `https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg?scale=35`
        )
        .then((res) => {
        //   console.log("res ---->", res);
          setAvatar(res.config.url);
          pushFirebase(res.config.url);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {/* form to call handle search to generate image */}
      <form onSubmit={handleSearch} className="charGen">
        <label htmlFor="Character Icon Generator"></label>
        <input
          type="text"
          placeholder="Enter your name"
          // sets username
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      {/* ternary to display if avatar isnt true */}
      {!avatar ? (
        <div></div>
      ) : (
        <div>
          <p>This is your avatar</p>
          <img className="icon" src={avatar} alt="icon"></img>
          <h2>{userName}</h2>
        </div>
      )}
    </>
  );
};

export default CharGen;
