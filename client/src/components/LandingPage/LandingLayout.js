/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

export default function LandingLayout(props) {
  return (
    <Flex direction="column" align="center" maxW="100vw" m="0 auto" {...props}>
      {/* <Header /> */}
      {props.children}
      {/* <Footer /> */}
    </Flex>
  );
}
