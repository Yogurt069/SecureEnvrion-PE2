import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateRoom(){
    const[roomCode, setRoomCode] = useState("");
    const[password, setPassword] = useState("");
    const[passwords, setPasswords] = useState([]);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(1);
    const history= useHistory();

    const CreateRoom = ()=>{
        if(!roomCode || !password) return;

        history.push("/chat", {roomCode, password});
    };
    const handleChange = (index, field, value) => {
        const updated = [...users];

        if (!updated[index]) {
            updated[index] = { username: "", password: "" };
        }

        updated[index][field] = value;

        setUsers(updated);
        };
    
    let i;
    return(
        <div className="main-container">
            <div className="home-card">
            <h2>Create Room</h2>
            <input placeholder="Room Code" 
            onChange={(e)=> setRoomCode(e.target.value)}
            />
           <input
            type="number"
            placeholder="Number of peps: 1"
            Value= "Number of peps: 1"
            onChange={(e) => setCount(Math.floor(Number(e.target.value)))}
            />
            <br />
            <br />

            <div>
                Setup Users
            </div>
           {[...Array(count)].map((_, index) => (
            <div key={index}>
                
                <input
                type="text"
                placeholder={`Username ${index + 1}`}
                onChange={(e) =>
                    handleChange(index, "username", e.target.value)
                }
                />

                <input
                type="password"
                placeholder={`Password ${index + 1}`}
                onChange={(e) =>
                    handleChange(index, "password", e.target.value)
                }
                />

                <br /><br />
            </div>
            ))}
                <br />

            <button onClick={CreateRoom}>Join</button>
        </div>
        </div>
    )
}

export default CreateRoom;