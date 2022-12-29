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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../Context";

import "./CreateJoin.css";

export const CreateJoin = () => {
  const [temp, settemp] = useState("");
  const [roomName, setroomName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { setroomData } = useContext(context);
  const handle = async () => {
    onClose();
    if (temp.toLowerCase() === "join") {
      const { data } = await axios.get(
        `http://localhost:5000/join/:${roomName}`
      );
      if (data.message) {
      } else {
        setroomData(data.data);
        navigate("/chat");
      }
    } else if (temp.toLowerCase() === "create") {
      const { data } = await axios.get(
        `http://localhost:5000/create/:${roomName}`
      );
      if (data.message) {
      } else {
        setroomData(data.data);
        navigate("/chat");
      }
    }
  };
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
