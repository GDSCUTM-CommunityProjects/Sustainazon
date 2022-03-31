/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-brace-presence */
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
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";

export default function RegisterCardForBusiness() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    billingAddress: "",
    email: "",
    phone: "",
    password: "",
    shippingAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedData = { ...businessInfo };
    updatedData[name] = value;
    console.log(updatedData);
    setBusinessInfo(updatedData);
  };

  const handleSubmit = async (event) => {
    setErrorMessage("");
    event.preventDefault();
    console.log(businessInfo);
    await instance
      .post("/accounts/register/seller", businessInfo)
      .then((res) => {
        console.log("Registered Business");
        navigate("/login");
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message);
        console.log("Unable to register business");
      });
  };

  return (
    <Flex
      margin={"10vh"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      width={"60vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Register your business
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
              <FormControl id="businessname" isRequired>
                <FormLabel>Name of your Business</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={businessInfo.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={businessInfo.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="billingAddress" isRequired>
                <FormLabel>Physical address of your business</FormLabel>
                <Input
                  type="text"
                  name="billingAddress"
                  value={businessInfo.billingAddress}
                  onChange={handleChange}
                />
              </FormControl>
              {/* <FormControl id="docslink" isRequired> */}
              {/*    <FormLabel>Link to documentation for your business:</FormLabel> */}
              {/*    <Input */}
              {/*        type={"url"} */}
              {/*        name={"docsLink"} */}
              {/*        value={businessInfo.docsLink} */}
              {/*        onChange={handleChange} */}
              {/*    /> */}
              {/* </FormControl> */}
              <FormControl id="phone" isRequired>
                <FormLabel>Phone #:</FormLabel>
                <Input
                  type={"number"}
                  name={"phone"}
                  value={businessInfo.phone}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id={"password"} isRequired>
                <FormLabel>Password:</FormLabel>
                <Input
                  type={"password"}
                  name={"password"}
                  value={businessInfo.password}
                  onChange={handleChange}
                />
              </FormControl>
              {errorMessage !== "" ? (
                <Alert status={"error"}>
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              ) : (
                <></>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"#497D59"}
                  color={"white"}
                  _hover={{
                    bg: "#497D59",
                  }}
                  type="submit"
                >
                  Submit your registration request
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
