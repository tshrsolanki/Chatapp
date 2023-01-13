import React from "react";

import onlineIcon from "../ICONS/onlineIcon.png";
import closeIcon from "../ICONS/closeIcon.png";

import "./Infobar.css";
import { useContext } from "react";
import { context } from "../../Context";

const InfoBar = ({ room, closeChat, username }) => {
  const { roomMembers } = useContext(context);

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>
          Roomname: <span className="room-title">{room} </span>
        </h3>
      </div>
      <div className="roommembers-length">
        {roomMembers.length}
        {roomMembers.length === 1
          ? " member in the room"
          : " members in the room"}
      </div>
      <div className="rightInnerContainer">
        <h3>
          Username: <span className="room-username">{username}</span>
        </h3>
        <div
          onClick={closeChat}
          style={{ cursor: "pointer", marginLeft: "10px" }}
        >
          <img src={closeIcon} alt="close icon" />
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
