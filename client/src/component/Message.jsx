import React from "react";

function Message({ msg, isOwn, onDelete, onEdit }) {
  return (
    <div className={isOwn ? "msg own" : "msg"}>

      {/* Header: user + time */}
      <div className="msg-header">
        <span className="msg-user">{msg.user}</span>
        <span className="msg-time">
          {new Date(msg.time || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Message text */}
      <div className="msg-text">{msg.text}</div>

      {/* Actions (only for own messages) */}
      {isOwn && (
        <div className="msg-actions">
          <button onClick={onEdit}>✏️</button>
          <button onClick={onDelete}>❌</button>
        </div>
      )}
    </div>
  );
}

export default Message;