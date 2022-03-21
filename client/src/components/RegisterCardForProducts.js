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
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

export default function RegisterCardForProducts() {
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const tagCheckboxChangeHandler = (e) => {
    // e.preventDefault();
    const target = e.target;
    const value = target.value;
    let updatedTags = tags;
    if (target.checked) {
      updatedTags.push(value);
    } else {
      updatedTags = tags.filter((preference) => preference !== value);
    }
    setTags(updatedTags);
  };

  const categoriesCheckboxChangeHandler = (e) => {
    // e.preventDefault();
    const target = e.target;
    const value = target.value;
    let updatedCategories = categories;
    if (target.checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = categories.filter(
        (preference) => preference !== value
      );
    }
    setCategories(updatedCategories);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      inputs.itemName,
      inputs.price,
      inputs.inventory,
      inputs.description
    );
    console.log(tags);
    console.log(categories);
    console.log(image);
    alert("Product Successfully Added!");
    //  Call the API endpoint here!
  };

  return (
    <Flex
      margin={"0px"}
      minH={"100%"}
      align={"center"}
      justify={"center"}
      width={"60vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} my={"50px"} mx={"auto"} maxW={"lg"} py={10} px={1}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add your sustainable product to our platform
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              and help save our planet! ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={6}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="itemName" isRequired>
                    <FormLabel>Name of the item</FormLabel>
                    <Input
                      type="text"
                      name="itemName"
                      value={inputs.itemName || ""}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={inputs.description || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price of item in USD:</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={inputs.price || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="inventory" isRequired>
                <FormLabel>Number of items in inventory:</FormLabel>
                <Input
                  type="number"
                  name="inventory"
                  value={inputs.inventory || ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="tags">
                <FormLabel>Tell us how is your product sustainable:</FormLabel>
                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox
                      value="handmade"
                      onChange={tagCheckboxChangeHandler}
                    >
                      Handmade
                    </Checkbox>
                    <Checkbox
                      value="sustainable_packaging"
                      onChange={tagCheckboxChangeHandler}
                    >
                      Sustainable Packaging
                    </Checkbox>
                    <Checkbox value="local" onChange={tagCheckboxChangeHandler}>
                      Local
                    </Checkbox>
                    <Checkbox
                      value="ftrade"
                      onChange={tagCheckboxChangeHandler}
                    >
                      Ftrade
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>
              <FormControl id="categories">
                <FormLabel>Categories:</FormLabel>
                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 3]} direction={["column", "row"]}>
                    <Checkbox
                      value="bags"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Bags
                    </Checkbox>
                    <Checkbox
                      value="shirt"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Shirt
                    </Checkbox>
                    <Checkbox
                      value="pants"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Pants
                    </Checkbox>
                    <Checkbox
                      value="men"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Men
                    </Checkbox>
                    <Checkbox
                      value="women"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Women
                    </Checkbox>
                    <Checkbox
                      value="children"
                      onChange={categoriesCheckboxChangeHandler}
                    >
                      Children
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>
              <FormControl id="image" isRequired>
                <FormLabel>Upload image</FormLabel>
                <Input type="file" name="image" onChange={handleImage} />
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
                  Add Product
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
