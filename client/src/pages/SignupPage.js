/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Flex } from "@chakra-ui/react";
import SignupCard from "../components/SignUpCard";
import SignupHeader from "../components/Navbar/SignupHeader";
import Footer from "../components/Navbar/Footer";
import background from "../assets/plant_bg.png";

export default function SignupPage(props) {
  return (
    <Flex direction="column" align="center" maxW="100vw" m="0 auto" {...props}>
      <SignupHeader />
      <Flex
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <SignupCard />
      </Flex>
      <Footer />
    </Flex>
  );
}
