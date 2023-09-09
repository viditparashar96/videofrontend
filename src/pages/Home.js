import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { RoomID } from '../context/RoomContext';
const Home = ({socket}) => {
  

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const {roomId,setRoomId}=useContext(RoomID)

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    navigate('/chat');
  };
  const handleClick=async()=>{
    const res =await axios.get("https://videobackend-xgxi.onrender.com/join")
    const ROOM_ID=res.data.data
    setRoomId(ROOM_ID)
    navigate(`/room/${ROOM_ID}`)
  }
  return (
    <div>

    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        />
      <button className="home__cta">SIGN IN</button>
    </form>
      <button onClick={handleClick}>Create ROOM</button>
        </div>
  );
};

export default Home;