import React, { useContext, useState } from "react";
import "./Signup.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../../Context";

export const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setuser } = useContext(context);
  const login = async () => {
    const { data } = await axios.post("http://localhost:5000/signup", {
      email,
      password,
      username,
    });
    if (data.success) {
      setuser(data.user);
      navigate("/chat");
    }
  };
  return (
    <div className="signup">
      <div className="signupLabel">
        <label htmlFor="">Username</label>
      </div>
      <div>
        <input
          className="signupInput"
          type="text"
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div className="signupLabel">
        <label htmlFor="">Email</label>
      </div>
      <div>
        <input
          className="signupInput"
          type="text"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="signupLabel">
        <label htmlFor="">Password</label>
      </div>
      <div>
        <input
          className="signupInput"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="signupDiv">
        <Button colorScheme="cyan">SIGNUP</Button>
      </div>
    </div>
  );
};
