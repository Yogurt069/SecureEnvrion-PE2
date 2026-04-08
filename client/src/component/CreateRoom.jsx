import React, { useState } from "react";
import ChatRoom from "./ChatRoom";

function CreateRoom() {
  const [users, setUsers] = useState([
    { username : "", password: "" },
  ]);
  const [roomCode, setRoomCode] = useState("")
  const [count, setCount] = useState(0);
  const [inRoom, setInRoom] = useState(false);
  const [error, setError] = useState("");
  


  // Handle user input
  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];

    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  // Add users
  const addUser = () =>{
    setUsers([...users, {username: "", password: ""}]);
  };

  // Remvoe users
  const removeUser = (index)=>{
    const updatedUsers = users.filter((_,i) => i !== index);
    setUsers(updatedUsers);
  };

  // create room
  const handleCreate = async ()=>{
    try{
      const res = await fetch("http://localhost:5000/create-room",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({users}),
      });
      const data = await res.json();

      if (!res.ok){
        setError(data.error);
        return;
      }

      setRoomCode(data.roomCode);
      setError("");
    } catch(err){
      console.error(err);
      setError("Something went wrong");
    }
  };

  return(
  <div className="create-container">
    <div className="card">
      <h2>Create Room</h2>

  {users.map((user, index) => (
    <div key={index} className="user-row">

      <input
        type="text"
        placeholder="username"
        onChange={(e) =>
          handleChange(index, "username", e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          handleChange(index, "password", e.target.value)
        }
      />

      {users.length > 1 && (
        <button type="button" onClick={() => removeUser(index)}>
          ❌
        </button>
      )}

    </div>
  ))}

      <button type="button" className="add-btn" onClick={addUser}>
        + Add User
      </button>

      <button type="button" className="create-btn" onClick={handleCreate}>
        Create Room
      </button>

      {error && <p className="error">{error}</p>}
      {roomCode && (
        <div className="room-code">
          Room Code: <strong>{roomCode}</strong>
        </div>
      )}
    </div>
  </div>

  );
}

export default CreateRoom;
// return (
//   <>
//     {!inRoom ? (
//       <div className="main-container">
        
//         {/* Create Room Card */}
//         <div className="home-card">
//           <h2>Create Room</h2>

//           <input
//             value={roomCode}
//             placeholder="Room Code"
//             readOnly
//           />

//           <input
//             type="number"
//             placeholder="Number of peps"
            
//             onChange={(e) =>
//               setCount(Math.max(1, Math.floor(Number(e.target.value))))
//             }
//           />

//           <br />
//           <br />
//         </div>

//         {/* Setup Users */}
//         <div className="home-card">
//           <div>Setup Users</div>

//           {[...Array(count)].map((_, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 placeholder={`Username ${index + 1}`}
//                 onChange={(e) =>
//                   handleChange(index, "username", e.target.value)
//                 }
//               />

//               <input
//                 type="password"
//                 placeholder={`Password ${index + 1}`}
//                 onChange={(e) =>
//                   handleChange(index, "password", e.target.value)
//                 }
//               />

//               <br />
//               <br />
//             </div>
//           ))}

//           <br />

//           <button onClick={handleCreateRoom}>
//             Create Room
//           </button>
//         </div>

//       </div>
//     ) : (
//       <ChatRoom roomCode={roomCode} users={users} />
//     )}
//   </>
// );