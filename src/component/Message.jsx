import React from "react";

function Message({ msg, isOwn, onDelete, onEdit }) {
  return (
    <div className={isOwn ? "msg own" : "msg"}>
      <span>{msg.text}</span>

      {isOwn && (
        <>
          <span><button onClick={onEdit}>✏️</button></span>
          <span><button onClick={onDelete}>❌</button></span>
        </>
      )}
    </div>
  );
}

export default Message;