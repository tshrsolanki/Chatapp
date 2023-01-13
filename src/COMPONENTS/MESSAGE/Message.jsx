import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";
import { useContext } from "react";
import { context } from "../../Context";

const Message = ({ message }) => {
  let isSentByCurrentUser = false;
  const { user } = useContext(context);

  if (message.userData === user.username) {
    isSentByCurrentUser = true;
  }
  const SystemMessage = ({ message }) => (
    <div className="messageContainer justifyCenter">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
      <p className="sentText pl-10 ">:{message.userData}</p>
    </div>
  );

  const UserMessage = ({ message }) => (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
      <p className="sentText pl-10 ">:{message.userData}</p>
    </div>
  );
  const SelfMessage = ({ message }) => (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{"You"}:</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
    </div>
  );

  return message.userData === "system" ? (
    <SystemMessage message={message} />
  ) : isSentByCurrentUser ? (
    <SelfMessage message={message} />
  ) : (
    <UserMessage message={message} />
  );
};

export default Message;
