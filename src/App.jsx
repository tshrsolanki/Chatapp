import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginSignup } from "./COMPONENTS/ROOT/LoginSignup";
import Chat from "./COMPONENTS/CHAT/Chat";
import { CreateJoin } from "./COMPONENTS/CREATEJOIN/CreateJoin";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/join" element={<CreateJoin />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
