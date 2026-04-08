import React, { useEffect, useRef, useState } from "react";
import { encryptMessage, decryptMessage } from "../utils/encryption";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// 🔐 Message Component
function MessageItem({ msg }) {
  const [text, setText] = useState("...");

  useEffect(() => {
    const decrypt = async () => {
      if (!msg ||!msg.ciphertext || !msg.iv) {
        setText("Invalid message");
        return;
      }
      try{
        const result = await decryptMessage(msg.ciphertext, msg.iv);
        setText(result);
      } catch{
        setText("failed");
      }
    };
    
    decrypt();
  }, [msg?.ciphertext, msg?.iv]);

  return <span>{text}</span>;
}

const handleLogout= ()=>{
  sessionStorage.clear();
  window.location.href = "/";
}

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  // ✅ FIX: convert to number
  const roomId = Number(sessionStorage.getItem("roomId"));
  const userId = Number(sessionStorage.getItem("userId"));
  const username = sessionStorage.getItem("username");
  if(!roomId || !userId){
    history.push("/join")
  }
  const messagesEndRef = useRef(null);
  // Load messages
  const loadMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/messages/${roomId}`);
      const data = await res.json();

      if (JSON.stringify(data) !== JSON.stringify(messages)) {
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;
    
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  const [members, setMembers] = useState([]);
  const loadMembers = async () => {
    try {
      const res = await fetch(`http://localhost:5000/room-users/${roomId}`);
      const data = await res.json();

      if (Array.isArray(data)) setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  //Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const encrypted = await encryptMessage(message);
      console.log("sending: ",encrypted);
    
      await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          userId,
          ciphertext: encrypted.ciphertext,
          iv: encrypted.iv,
        }),
      });

      setMessage("");
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Auto load + auto scroll
  useEffect(() => {
    loadMessages();
    loadMembers();

    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
  scrollToBottom();
}, [messages]);

  
  return (
    <div className="chat-bg">
      
      <div className="chat-card">

        {/* HEADER */}
        <div className="chat-header">
          <div>
            <h2>💬 Secure Room</h2>
            <span className="room-id">Room: {roomId}</span>
          </div>

          <div className="header-right">
            <div className="members">
              {members.map((m, index) => (
                <span key={index} className = {`member ${m.username === username ? "me" : ""}`}>
                  {m.username}
                </span>
              ))}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="messages">
          {Array.isArray(messages) &&
            messages.map((msg) => {
              const isMe = msg.username === username;

              return (
                <div
                  key={msg.id}
                  className={`msg-row ${isMe ? "me" : "other"}`}
                >
                  <div className="msg-bubble">
                    {!isMe && (
                      <span className="user">{msg.username}</span>
                    )}

                    <MessageItem msg={msg} />
                  </div>
                </div>
              );
            })}

          <div ref={messagesEndRef}></div>
        </div>

        {/* INPUT */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </div>

      </div>
    </div>
  );
}

export default ChatRoom;