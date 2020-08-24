import React, { useEffect } from "react";
import "../styles/message.css";

function App({ isConnected, isRoomJoined, sendMessage }) {
  const [text,setText] = React.useState("");
  return (
    isConnected &&
    isRoomJoined && (
      <div className="MessageContainer">
        <div className="MessageHeader"></div>
        <div className="MessageBody"></div>
        <div className="MessageFooter">
          <div className="flex-row center margintop50">
            <input
              placeholder="Message"
              type="text"
              className="TextInput"
              name="title"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              className="Button"
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default App;
