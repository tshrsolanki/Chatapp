import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "./LoginSignup.css";
import { Login } from "../LOGIN&SIGNUP/Login";
import { Signup } from "../LOGIN&SIGNUP/Signup";
export const LoginSignup = () => {
  const [idx, setidx] = useState(0);
  const [container, setcontainer] = useState("innerContainerGreen");

  return (
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
  );
};
