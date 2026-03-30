import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function JoinRoom(){
    const[roomCode, setRoomCode] = useState("");
    const[password, setPassword] = useState("");

    const history= useHistory();

    const joinRoom = ()=>{
        if(!roomCode || !password) return;

        history.push("/chat", {roomCode, password});
    };

    return(
        <div className="main-container">
            
            <div className="join-card">
        
            <h2>Join Room</h2>
            <div className="join-row">
            <input placeholder="Room Code" 
            onChange={(e)=> setRoomCode(e.target.value)}
            />
            <input type="password"
            placeholder="Password" 
            onChange={(e)=> setPassword(e.target.value)}
            />
            <br />
            <button onClick={joinRoom}>Join</button>
        
        
        </div>
        </div>

        </div>
    )
}

export default JoinRoom;