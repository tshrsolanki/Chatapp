import React, { useState } from "react";
import "./Login.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { context } from "../../Context";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setemail] = useState("test@mail");
  const [password, setpassword] = useState("123");
  const navigate = useNavigate();
  const { setuser, url } = useContext(context);
  console.log(url);
  const login = async () => {
    try {
      const { data } = await axios.post(`${url}/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.user.token);
        setuser(data.user);
        navigate("/join");
        return;
      } else {
        toast.error(data.message, {
          theme: "colored",
          autoClose: 3000,
          hideProgressBar: true,
          position: "bottom-center",
        });
        return;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 3000,
      });
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
