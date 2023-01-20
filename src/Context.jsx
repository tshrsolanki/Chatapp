import { createContext, useState } from "react";

export const context = createContext({
  user: {},
  setuser: () => {},
  roomMembers: [],
  setroomMembers: () => {},
  url: "",
});

export const UserContext = (props) => {
  const [user, setuser] = useState({});
  const [roomMembers, setroomMembers] = useState([]);
  const url = "http://192.168.33.51:5000";
  // const url = "http://localhost:5000";
  const value = {
    user,
    setuser,
    roomMembers,
    setroomMembers,
    url,
  };
  return <context.Provider value={value}>{props.children}</context.Provider>;
};
