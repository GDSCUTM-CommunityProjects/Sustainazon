import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [userSignupInformation, setUserSignupInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signupUserHandler = async () => {
    setErrorMessage("");
    if (
      userSignupInformation.firstName &&
      userSignupInformation.email &&
      userSignupInformation.password
    ) {
      await instance
        .post("/accounts/register/buyer", {
          name: `${userSignupInformation.firstName}  ${userSignupInformation.lastName}`,
          email: userSignupInformation.email,
          password: userSignupInformation.password,
        })
        .then(() => {
          console.log("Successfully registered => Redirect to login after");
          navigate("/login");
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message);
        });
    } else {
      setErrorMessage(
        "First Name, Email Address and Password are required fields."
      );
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      width={"60vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            and help save our planet! ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={userSignupInformation.firstName}
                    type="text"
                    onChange={(e) => {
                      setUserSignupInformation({
                        ...userSignupInformation,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={userSignupInformation.lastName}
                    type="text"
                    onChange={(e) => {
                      setUserSignupInformation({
                        ...userSignupInformation,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={userSignupInformation.email}
                type="email"
                onChange={(e) => {
                  setUserSignupInformation({
                    ...userSignupInformation,
                    email: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={userSignupInformation.password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setUserSignupInformation({
                      ...userSignupInformation,
                      password: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"#497D59"}
                color={"white"}
                _hover={{
                  bg: "#497D59",
                }}
                onClick={() => signupUserHandler()}
              >
                Sign up
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

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/login">
                  Login
                </Link>
              </Text>
              <Text align={"center"}>
                Want to sell your items?{" "}
                <Link color={"blue.400"} href="/registerbusiness">
                  Register Business
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
