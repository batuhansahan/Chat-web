import React, { useEffect } from "react";
import "../styles/message.css";

function App({ isConnected, isRoomJoined, username, sendMessage, messages }) {
  const [text, setText] = React.useState("");

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    isConnected &&
    isRoomJoined && (
      <div className="MessageContainer">
        <div className="MessageHeader"></div>
        <div id="messages" className="MessageBody">
          {messages.map((item, i) => {
            return item.user === username ? (
              <div className="myMessage">
                <div className="username">{item.user}</div>
                <div className="box" key={item.id}>
                  <div>{item.message}</div>
                </div>
              </div>
            ) : (
              <div className="theirMessage">
                <div className="username">{item.user}</div>
                <div className="box">
                  <div>{item.message}</div>
                </div>
              </div>
            );
          })}
        </div>
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
