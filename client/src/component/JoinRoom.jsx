import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function JoinRoom(){
    const[roomCode, setRoomCode] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const handleJoin = async()=>{
        try{
            if(!roomCode || !password){
                setError("All fields are required");
                return;
            } 
        const res = await fetch("http://localhost:5000/join-room",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                roomCode,
                password,
            }),
        });
        
        const data = await res.json();
        if(!res.ok){
            setError(data.error);
            return;
        }
        sessionStorage.setItem("roomId", data.roomId);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("username", data.username);

        setError("");

        history.push("/chat");
    } catch(err){
        console.error(err);
        setError("Server error ");
    }
};

    return(
        <div className="main-container">
            
            <div className="card">
        
            <h2>Join Room</h2>
            <input
            type="text" 
            placeholder="Room Code" 
            value = {roomCode}
            onChange={(e)=> setRoomCode(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <br />
            <button type="button" onClick={handleJoin}>Join</button>

            {error && <p className="error">{error}</p>}
        
        
        </div>
        </div>
    )
}

export default JoinRoom;