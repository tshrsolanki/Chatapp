import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from "../MESSAGES/Messages";
import InfoBar from "../INFOBAR/Infobar";
import Input from "../INPUT/Input";
import "./Chat.css";
import { useContext } from "react";
import { context } from "../../Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const ENDPOINT = "https://project-chat-application.herokuapp.com/";

let socket;

const Chat = () => {
  const localStorageMessages = JSON.parse(localStorage.getItem("messages"));
  let msgArray = [];
  if (localStorageMessages) {
    msgArray = localStorageMessages;
  }
  const [messages, setMessages] = useState(msgArray);
  const { user, setroomMembers, setuser, url } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      const token = localStorage.getItem("token");
      if (token) {
        fetchData();
        async function fetchData() {
          try {
            const res = await fetch(`${url}/tokenlogin`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
            });
            const data = await res.json();
            let userData = {};
            if (data.user) {
              userData = { ...data.user };
              setuser(userData);
            }
            if (data.roomData) {
              userData = { ...userData, ...data.roomData };
              setuser(userData);
              setroomMembers(data.roomData.roomMembers);
              socket = io(`${url}`);
              console.log("socket connect");
              socket.emit("join", { ...data.roomData, ...data.user });
              socket.on("update", (roomMembers) => {
                setroomMembers(roomMembers);
              });
              socket.on("message", (message) => {
                setMessages((messages) => [...messages, message]);
              });
              return;
            }
            navigate("/join");
          } catch (error) {
            console.log(error, "||", "CreateJoin.jsx", "line-", 105);
          }
        }
      } else {
        toast.warning("Please log in to proceed", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        });
        navigate("/");
        return;
      }
    } else {
      socket = io(`${url}`);
      socket.emit("join", { ...user });
      socket.on("update", (roomMembers) => {
        setroomMembers(roomMembers);
      });
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
  const sendMessage = (event, message, setMessage) => {
    event.preventDefault();
    if (message) {
      const { username, roomName } = user;
      socket.emit("sendMessage", { message, username, roomName }, () =>
        setMessage("")
      );
    }
  };
  const closeChat = (e) => {
    e.preventDefault();
    socket.emit("closechat", user, callback);
    function callback() {
      localStorage.removeItem("messages");
      setuser({});
      setroomMembers([]);
      navigate("/join");
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar
          room={user.roomName}
          closeChat={closeChat}
          username={user.username}
        />
        <Messages messages={messages} />
        <Input sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
