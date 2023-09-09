import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


import Room from './pages/Room';
import socketIO from 'socket.io-client';


const socket = socketIO.connect('https://videobackend-xgxi.onrender.com');


function App() {
  
  
  return (
    

    
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path='/room/:ROOM_ID'element={<Room socket={socket} />}/>
        </Routes>
      </div>
    
    
  );
}

export default App;
