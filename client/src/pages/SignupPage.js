/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Flex, Link, Text } from "@chakra-ui/react";
import SignupCard from "../components/SignUpCard";
import SignupHeader from "../components/Navbar/SignupHeader";
import Footer from "../components/Navbar/Footer";
import background from "../assets/plants.png";
import { Link as ReactRouterLink } from "react-router-dom";

export default function SignupPage(props) {
  return (
    <Flex direction="column" align="center" maxW="100vw" m="0 auto" {...props}>
      <Flex
        mr={"auto"}
        py={6}
        borderBottom={"1px solid"}
        borderColor={"gray.300"}
      >
        <Text pl={14} fontSize={"3xl"} fontWeight={"bold"}>
          <Link
            as={ReactRouterLink}
            style={{ textDecoration: "none" }}
            to={"/"}
          >
            Sustainazon
          </Link>
        </Text>
      </Flex>
      <Flex
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "80vh",
          justifyContent: "center",
          backgroundSize: "cover",
        }}
      >
        <SignupCard />
      </Flex>
      <Footer />
    </Flex>
  );
}
