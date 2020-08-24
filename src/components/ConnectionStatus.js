import React from "react";
import "../styles/connectionStatus.css";
import {BiUser,BiMessageDetail} from 'react-icons/bi'
import {FiMessageCircle, FiUser, FiLogOut} from 'react-icons/fi'

function connectionStatus({ isWs, isRoomJoined, room, username, exitRoom}) {
  return (
    <div className="Status">
      <div className="flex-row">
      <div className="StatusBox">
        <div className="aligncenter"><FiMessageCircle size={22} style={{marginRight:5}}/>{isRoomJoined ? room : "Lobby"}</div>
      </div>
      {isRoomJoined &&
      <div className="StatusBox">
        <div className="aligncenter"><FiUser size={22} style={{marginRight:5}}/> {username}</div>
      </div>
      }
      {isRoomJoined && 
      <div className="StatusBox" onClick={()=>exitRoom()}>
        <div className="aligncenter red"><FiLogOut color={"red"} size={22} style={{marginRight:5}}/> Exit</div>
      </div>}
      </div>
      <div className="StatusBox">
        <div className={isWs+'Status'}>{isWs} to server</div>
        <div className={isWs+"Dot"}></div>
      </div>
    </div>
  );
}

export default connectionStatus;
