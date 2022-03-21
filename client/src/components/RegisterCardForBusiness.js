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
} from "@chakra-ui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function RegisterCardForBusiness() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      inputs.businessname,
      inputs.address,
      inputs.email,
      inputs.phone,
      inputs.docslink
    );
    //  Call the API endpoint here!
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
              <HStack>
                <Box>
                  <FormControl id="businessname" isRequired>
                    <FormLabel>Name of your Business</FormLabel>
                    <Input
                      type="text"
                      name="businessname"
                      value={inputs.businessname || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Physical address of your business</FormLabel>
                <Input
                  type="text"
                  name="address"
                  value={inputs.address || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="docslink" isRequired>
                <FormLabel>Link to documentation for your business:</FormLabel>
                <Input
                  type="url"
                  name="docslink"
                  value={inputs.docslink || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone #:</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                />
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
