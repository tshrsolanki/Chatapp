import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from "../MESSAGES/Messages";
import InfoBar from "../INFOBAR/Infobar";
import Input from "../INPUT/Input";
import "./Chat.css";
import { useContext } from "react";
import { context } from "../../Context";

// const ENDPOINT = "https://project-chat-application.herokuapp.com/";

let socket;

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { roomData } = useContext(context);

  useEffect(() => {
    socket = io("localhost:5000");
    const name = roomData;
    socket.emit("join", { room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
