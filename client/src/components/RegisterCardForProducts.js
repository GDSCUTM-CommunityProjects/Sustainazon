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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { instance } from "../axios";

export default function RegisterCardForProducts() {
  const [errorMessage, setErrorMessage] = useState("");
  const [itemDescription, setItemDescription] = useState({
    itemName: "",
    description: "",
    price: "",
    inventory: "",
    tags: [],
    categories: [],
  });
  const [itemId, setItemId] = useState("");
  const [image, setImage] = useState();

  console.log(itemDescription);
  const handleImage = (event) => {
    // console.log(event)
    setImage(event.target.files[0]);
    // console.log(image)
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedData = { ...itemDescription };
    updatedData[name] = value;
    setItemDescription(updatedData);
  };

  const tagCheckboxChangeHandler = (e) => {
    // e.preventDefault();
    const target = e.target;
    const value = target.value;
    let updatedTags = [...itemDescription.tags];
    if (target.checked) {
      updatedTags.push(value);
    } else {
      updatedTags = updatedTags.filter((preference) => preference !== value);
    }
    setItemDescription({ ...itemDescription, tags: updatedTags });
  };

  const categoriesCheckboxChangeHandler = (e) => {
    // e.preventDefault();
    const target = e.target;
    const value = target.value;
    let updatedCategories = [...itemDescription.categories];
    if (target.checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter(
        (preference) => preference !== value
      );
    }
    setItemDescription({ ...itemDescription, categories: updatedCategories });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    console.log(itemDescription);
    await instance
      .post("/seller/item", itemDescription)
      .then(async (res) => {
        console.log("Added new product");
        console.log("Uploading image");
        const formData = new FormData();
        formData.append("name", "JSHyvEdEuMCQv4P8yojn");
        formData.append("file", image);
        console.log(formData);
        await instance
          .post(
            `/seller/item/upload?itemId=JSHyvEdEuMCQv4P8yojn`,
            { formData },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            console.log(res);
            console.log("Uploaded image");
          })
          .catch(() => {
            console.log("Unable to upload image");
          });
      })
      .catch((e) => {
        if (
          e.response.data.message === "" ||
          e.response.data.message === undefined
        ) {
          setErrorMessage("Unable to register product");
        } else {
          setErrorMessage(e.response.data.message);
        }
        console.log("Unable to register product");
      });
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
              <FormControl id="itemName" isRequired>
                <FormLabel>Name of the item</FormLabel>
                <Input
                  type="text"
                  name="itemName"
                  value={itemDescription.itemName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={itemDescription.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price of item in USD:</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={itemDescription.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="inventory" isRequired>
                <FormLabel>Number of items in inventory:</FormLabel>
                <Input
                  type="number"
                  name="inventory"
                  value={itemDescription.inventory}
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
