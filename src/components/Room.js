import React from "react";
import "../styles/room.css";

function App({ isConnected, isRoomJoined, joinRoom }) {
  const [room, setRoom] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [showError,setShowError] = React.useState(false);

  const navigateRoom = () =>{
    if(room.trim() && username.trim()){
      joinRoom(room,username)
    }
  }

  return (
    isConnected &&
    !isRoomJoined && (
      <div>
        <div className="flex-row center margintop50">
          <input
            placeholder="Enter Username"
            type="text"
            className="TextInput"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div
            className="Button"
            style={{visibility:"hidden"}}
          >
            Join
          </div>
        </div>
        <div className="flex-row center">
          <input
            placeholder="Enter room name"
            type="text"
            className="TextInput"
            name="room"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
          <button
            className="Button"
            onClick={() => {
              navigateRoom();
            }}
          >
            Join
          </button>
        </div>
        {showError && <div className="flex-row center" style={{fontSize:18,marginTop:"10px"}}>
            Please type all fields.
        </div>}
      </div>
    )
  );
}

export default App;
