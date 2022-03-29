import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
  CheckboxGroup,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RegisterCardForProducts({
  registerProductHandler,
  isLoading,
}) {
  const [itemDescription, setItemDescription] = useState({
    itemName: "",
    description: "",
    price: "",
    inventory: "",
    tags: [],
    categories: [],
  });
  const [image, setImage] = useState();

  console.log(itemDescription);
  const handleImage = (event) => {
    setImage(event.target.files[0]);
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

  return (
    <Flex align={"center"} justify={"center"}>
      <form onSubmit={(e) => registerProductHandler(e, itemDescription, image)}>
        <Stack spacing={8} my={4} mx={"auto"} px={1}>
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
            bg={useColorModeValue("#fcfcfc", "gray.700")}
            boxShadow={"lg"}
            px={6}
            py={3}
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
                  _active={{
                    bg: "#497D59",
                  }}
                >
                  {isLoading ? (
                    <Spinner
                      size={"md"}
                      thickness={4}
                      speed={"0.5s"}
                      color={"#ffffff"}
                    />
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}

RegisterCardForProducts.propTypes = {
  registerProductHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
