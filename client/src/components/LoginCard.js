import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { instance } from "../axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const cookies = new Cookies();
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signInHandler = () => {
    if (userLoginInfo.email && userLoginInfo.password) {
      setErrorMessage("");
      const config = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      };
      firebase.initializeApp(config);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      firebase
        .auth()
        .signInWithEmailAndPassword(userLoginInfo.email, userLoginInfo.password)
        .then(({ user }) => {
          return user.getIdToken().then((idToken) => {
            return instance
              .post("/accounts/login", { idToken: idToken })
              .then((response) => {
                cookies.set("isSeller", response.data.isSeller, { path: "/" });
                cookies.set("auth", true, { path: "/" });
                navigate("/");
                window.location.reload();
              });
          });
        })
        .catch(() => {
          setErrorMessage("Invalid Login");
        });
    } else {
      setErrorMessage("Email and password are required to login");
    }
  };
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      width={"60vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to buy all of our cool{" "}
            <Link color={"blue.400"} href="/home">
              products
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={userLoginInfo.email}
                type="email"
                onChange={(e) => {
                  setUserLoginInfo({ ...userLoginInfo, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={userLoginInfo.password}
                type="password"
                onChange={(e) => {
                  setUserLoginInfo({
                    ...userLoginInfo,
                    password: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"#497D59"}
                color={"white"}
                _hover={{
                  bg: "#497D59",
                }}
                onClick={() => signInHandler()}
              >
                Sign in
              </Button>
            </Stack>
            {errorMessage !== "" ? (
              <Alert status={"error"}>
                <AlertIcon />
                {errorMessage}
              </Alert>
            ) : (
              <></>
            )}
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don&apos;t have an account?{" "}
              <Link color={"blue.400"} href="/signup">
                Sign Up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
