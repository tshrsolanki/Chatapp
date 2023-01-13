import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "../MESSAGE/Message";

import "./Messages.css";

const Messages = (props) => {
  return (
    <ScrollToBottom className="messages">
      {props.messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};
export default Messages;
