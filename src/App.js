import React, { useState, useEffect, useRef } from "react";
import "./styles/App.css";

import Message from "./components/Message";
import Room from "./components/Room";
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  const ws = useRef(null);
  const [isWs, setIsWs] = useState("Not Connected");
  const [isConnected,setIsConnected] = useState(false);
  const [isRoomJoined,setIsRoomJoined] = useState(false);
  const [room,setRoom] = useState("");
  const [username,setUsername] = useState("");
  const [messages,setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    connectWs();
  }, []);

  const connectWs = () => {
    setIsWs("Connecting");
    setIsConnected(false)
    ws.current = new WebSocket("ws://localhost:8082");
    clearInterval(wsRef.current)
    ws.current.onopen = () => {
      setIsWs("Connected");
      setIsConnected(true)
    };

    ws.current.onclose = () => {
        wsRef.current = setInterval(()=>{
          connectWs()
        },2000)
        setIsWs("Connecting");
        setIsConnected(false);
        setIsRoomJoined(false);
        setRoom("");
    };

    ws.current.onmessage = (data) => {
      console.log(data)
    }
  };

  const joinRoom = (room = 'Public', username = 'User') => {
    setIsRoomJoined(true);
    setRoom(room);
    setUsername(username)
    ws.current.send(
      JSON.stringify({
        action:'chat-sub',
        room:room
      })
    );
  }

  const sendMessage = (value) => {
    if(value.trim()){
      ws.current.send(
        JSON.stringify({
          action:'chat-pub',
          room:room,
          message:value,
          user:username
        })
      );
    }
  }

  return (
    <div className="App">
      <div className="Container">
        <ConnectionStatus isWs={isWs} isRoomJoined={isRoomJoined} room={room} username={username}/>
        <Room isConnected={isConnected} isRoomJoined={isRoomJoined} joinRoom={joinRoom} />
        <Message isConnected={isConnected} isRoomJoined={isRoomJoined} messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
