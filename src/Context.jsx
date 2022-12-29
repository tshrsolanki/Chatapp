import { createContext, useState } from "react";

export const context = createContext({
  user: {},
  setuser: () => {},
  roomData: {},
  setroomData: () => {},
});

export const UserContext = (props) => {
  const [user, setuser] = useState("11");
  const [roomData, setroomData] = useState("22");
  const value = {
    user,
    setuser,
    roomData,
    setroomData,
  };
  return <context.Provider value={value}>{props.children}</context.Provider>;
};
