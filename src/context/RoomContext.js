const { createContext, useState } = require("react");

export const  RoomID=createContext(null)

export const RoomContext=({children})=>{
    const [roomId,setRoomId]=useState('')
    
    return <RoomID.Provider value={{roomId,setRoomId}}>{children}</RoomID.Provider>
}
