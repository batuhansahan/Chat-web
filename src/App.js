import React, { useState, useEffect, useRef } from "react";
import "./styles/App.css";

import Message from "./components/Message";
import Room from "./components/Room";
import ConnectionStatus from "./components/ConnectionStatus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWs: "Connecting",
      isConnected: false,
      isRoomJoined: false,
      room: "",
      username: "",
      chat: [],
    };
    this.ws = new WebSocket("ws://localhost:8082");
    this.ws.onopen = () => {
      this.setState({
        isWs: "Connected",
        isConnected: true,
        isRoomJoined: false,
        room: "",
      });
    };

    this.ws.onclose = () => {
      this.setState({
        isWs: "Disconnected",
        isConnected: false,
        isRoomJoined: false,
        room: "",
      });
    };

    this.ws.onmessage = this.receiveMessage;
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.setState({ isWs: "Connecting" });
  }

  receiveMessage = (data) => {
    let message = JSON.parse(data.data);
    this.setState({
      chat: [message, ...this.state.chat],
    });

    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  joinRoom = (room = "Public", username = "User") => {
    this.setState({ isRoomJoined: true, room, username });
    this.ws.send(
      JSON.stringify({
        action: "chat-sub",
        room: room,
      })
    );
  };

  sendMessage = (value) => {
    const { room, username } = this.state;
    if (value.trim()) {
      this.ws.send(
        JSON.stringify({
          action: "chat-pub",
          room: room,
          message: value,
          user: username,
        })
      );
    }
  };

  leaveRoom = () => {
    this.setState({
      isConnected: true,
      isRoomJoined: false,
      room: "",
      chat: [],
    });
  };
  render() {
    const {
      isWs,
      isRoomJoined,
      room,
      username,
      isConnected,
      chat,
    } = this.state;
    const { joinRoom, sendMessage } = this;
    return (
      <div className="App">
        <div className="Container">
          <ConnectionStatus
            isWs={isWs}
            isRoomJoined={isRoomJoined}
            room={room}
            exitRoom={() => this.leaveRoom()}
            username={username}
          />
          <Room
            isConnected={isConnected}
            isRoomJoined={isRoomJoined}
            joinRoom={joinRoom}
          />
          <Message
            isConnected={isConnected}
            isRoomJoined={isRoomJoined}
            messages={chat}
            username={username}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default App;
