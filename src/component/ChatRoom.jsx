import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../utils/socket";
import {encryptMessage, decryptMessage} from "../utils/encryption";
import Message from "./Message";

function ChatRoom(){
    const location = useLocation();
    const {roomCode, password} = location.state || {};
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const username = "User_" + password;

    const sendMessage = () =>{
        if(!roomCode) return;

        setMessage([
            ...messages,
            {
                id: Date.now(),
                text: message,
                user:username
            }
        ]);

        setMessage("");
    }

    const deleteMessage = (id) =>{
        setMessages(messages.filter(m=>m.id !==id));
    };
    
    const editMessage = (id)=>{
        const newText = prompt("Edit MEssage:");
        if(!newText) return;

        setMessage(message.map(m=>
            m.id === id ? {...m, text: newText} : m
        ));
    };

    const downloadChat = () =>{
        const blob = new Blob([JSON.stringify(messages)], {
            type: "application/json"
        });
        
        const a= document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "chat.json";
        a.click();
    };

    return(
        <div className="main-container">
            <div className="chat-card">
            <div className="chat-header">
            <h2>Room: {roomCode}</h2>
            <p>logged in as: {username} </p>
            <button onClick={downloadChat}>Download Chat</button>
                </div>

            <div className="chat-box">
                {messages.map((msg)=> (
                    <Message
                        key={msg.id}
                        msg={msg}
                        isOwn={msg.user === username}
                        onDelete={()=> deleteMessage(msg.id)}
                        onEdit={()=> editMessage(msg.id)}
                    />
                ))};
            </div>

            <div className="input-area">
                <input value={message}
                onChange={(e)=> setMessage(e.target.value)} 
                placeholder="Type Message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        </div>
        

    )
}

export default ChatRoom;