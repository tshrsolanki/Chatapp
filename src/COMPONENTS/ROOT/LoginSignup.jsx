import { useState, useEffect, useContext } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "./LoginSignup.css";
import { Login } from "../LOGIN&SIGNUP/Login";
import { Signup } from "../LOGIN&SIGNUP/Signup";
import { useNavigate } from "react-router-dom";
import { context } from "../../Context";

export const LoginSignup = () => {
  const [idx, setidx] = useState(0);
  const [container, setcontainer] = useState("innerContainerGreen");
  const navigate = useNavigate();
  const { setroomMembers, setuser, url } = useContext(context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData();
    }

    async function fetchData() {
      try {
        const res = await fetch(`${url}/tokenlogin`, {
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
          setuser(userData);
          setroomMembers(data.roomData.roomMembers);
          navigate("/chat");
          return;
        }
        setuser(userData);
        navigate("/join");
      } catch (error) {
        console.log(error, "||", "CreateJoin.jsx", "line-", 105);
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <strong>
        <div className="loginsignuptitle">WELCOME TO CHAT APP</div>
      </strong>
      <div className="main">
        <div className={container}>
          <Tabs
            onChange={(e) => {
              if (e === 1) {
                setcontainer("innerContainerBlue");
                setidx(e);
              } else {
                setcontainer("innerContainerGreen");
                setidx(e);
              }
            }}
            index={idx}
            variant="soft-rounded"
            align="center"
            colorScheme="green"
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: "green.400" }}>LOGIN</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>SIGNUP</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
};
