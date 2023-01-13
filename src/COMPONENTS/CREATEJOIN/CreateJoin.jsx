import {
  Modal,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Button,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../../Context";

import "./CreateJoin.css";

export const CreateJoin = () => {
  const [temp, settemp] = useState("");
  const [roomName, setroomName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, setroomMembers, setuser, url } = useContext(context);
  const handle = async () => {
    if (temp.toLowerCase() === "join") {
      try {
        const { data } = await axios.post(`${url}/join`, {
          user,
          roomName,
        });
        if (data.message) {
          toast(data.message, {
            position: "bottom-center",
            hideProgressBar: true,
            type: "warning",
            theme: "light",
          });
        } else {
          onClose();
          setuser((user) => {
            return { ...user, ...data };
          });
          setroomMembers(data.roomMembers);
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Something went wrong", {
          theme: "colored",
          hideProgressBar: true,
          autoClose: 3000,
          position: "bottom-center",
        });
        console.log(error);
      }
    } else if (temp.toLowerCase() === "create") {
      try {
        const { data } = await axios.post(`${url}/create`, {
          user,
          roomName,
        });
        if (data.message) {
          toast(data.message, {
            position: "bottom-center",
            hideProgressBar: true,
            type: "warning",
            theme: "colored",
          });
        } else {
          setuser((user) => {
            return { ...user, ...data };
          });
          setroomMembers(data.roomMembers);
          onClose();
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Something went wrong", {
          theme: "colored",
          hideProgressBar: true,
          autoClose: 3000,
        });
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user.email) {
      if (token) {
        fetchData();
      } else {
        toast.warning("Please log in to proceed", {
          autoClose: 3000,
          theme: "colored",
          hideProgressBar: true,
          position: "bottom-center",
        });
        navigate("/");
      }
    }
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/tokenlogin", {
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
        }
        if (data.roomData) {
          userData = { ...userData, ...data.roomData };
          setroomMembers(data.roomData.roomMembers);
          setuser(userData);
          navigate("/chat");
          return;
        }
        setuser(userData);
      } catch (error) {
        console.log(error, "||", "CreateJoin.jsx", "line-", 105);
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="createJoinOuterContainer">
      <div className="createJoinInnerContainer">
        <div>
          <button
            className="joinButton"
            onClick={() => {
              settemp("JOIN");
              onOpen();
            }}
          >
            JOIN A ROOM
          </button>
        </div>
        <div>
          <button
            className="joinButton"
            onClick={() => {
              settemp("CREATE");
              onOpen();
            }}
          >
            CREATE A ROOM
          </button>
        </div>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ENTER ROOM NAME</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <input
                type="text"
                className="joinInput"
                onChange={(e) => setroomName(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handle}>
                {temp}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
