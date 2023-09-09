import React, { useContext, useEffect, useRef, useState } from 'react';
import RoomContext, { RoomID } from '../context/RoomContext';
import { Peer } from 'peerjs';

function Room({ socket }) {
  const myVideoRef = useRef();
  const { roomId, setRoomId } = useContext(RoomID);
  const [peerId, setPeerId] = useState([]);
  const [remotePeerId, setRemotePeerId] = useState(null);
  const peer = useRef();
  const peers = useRef({}); // Store remote peers in an object

  peer.current = new Peer();
 useEffect(()=>{

   peer.current.on('open',(id)=>{
     console.log(id)
     socket.emit("join-room",roomId,id)
    })
    
    const videoGrid=document.querySelector(".videogrid")
    const myVideo=document.createElement('video')
    myVideo.muted=true
    console.log(myVideo)
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: true, audio: true},function(stream){
    console.log(stream)
    addVideo(myVideo,stream)

    socket.on("userconnected",(peerid)=>{
      setPeerId((prev)=>{
        return[...prev,peerid]
      })
      connectNewUser(peerid,stream)
      alert(`${peerid} just joined the meeting`)
    })
    peer.current.on('call',call=>{
      call.answer(stream)
      const video=document.createElement('video')
      call.on('stream',userVideoStream=>{
        addVideo(video,userVideoStream)
    })
    })



  })
  
  function addVideo(video,stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
  })
    videoGrid.append(video)
  }
  console.log(videoGrid)

  const connectNewUser=(peerid,stream)=>{
    const call=peer.current.call(peerid,stream)
    const video=document.createElement('video')
    call.on('stream',(userVideoStream)=>{
      addVideo(video,userVideoStream)
    })
  }

},[roomId,socket])

  return (
    <div className='left'>
      Room
      <div className='videogrid'>
       
      </div>
      
    </div>
  );
}

export default Room;
