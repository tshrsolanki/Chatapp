import React, { useState } from "react";
import "./Login.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { context } from "../../Context";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setuser } = useContext(context);
  const login = async () => {
    const { data } = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    if (data.success) {
      setuser(data.user);
      navigate("/join");
    }
  };
  return (
    <div className="login">
      <div className="loginLabel">
        <label htmlFor="">Email</label>
      </div>
      <div>
        <input
          className="loginInput"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="loginLabel">
        <label htmlFor="">Password</label>
      </div>
      <div>
        <input
          className="loginInput"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="loginDiv">
        <Button colorScheme="cyan" onClick={login}>
          LOGIN
        </Button>
      </div>
    </div>
  );
};
