import React, { useContext, useState } from "react";
import "./Signup.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../../Context";
import { toast } from "react-toastify";

export const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setuser, url } = useContext(context);
  const signupHandler = async () => {
    try {
      const { data } = await axios.post(`${url}/signup`, {
        email,
        password,
        username,
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
        });
        return;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-center",
      });
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
        <Button colorScheme="cyan" onClick={signupHandler}>
          SIGNUP
        </Button>
      </div>
    </div>
  );
};
