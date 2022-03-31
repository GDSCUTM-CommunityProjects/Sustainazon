import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import Rate from "rc-rate";

export default function AddReviewForm({
  review,
  setReview,
  addReviewHandler,
  isLoading,
  itemName,
}) {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedData = { ...review };
    updatedData[name] = value;
    setReview(updatedData);
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <form onSubmit={(e) => addReviewHandler(e, review)}>
        <Stack spacing={8} my={4} mx={"auto"} px={1}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add your review for {itemName}
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("#fcfcfc", "gray.700")}
            boxShadow={"lg"}
            px={6}
            py={3}
          >
            <Stack spacing={4}>
              <FormControl id={"rating"} isRequired>
                <FormLabel>Rating</FormLabel>
                <Rate
                  allowHalf={true}
                  value={review.star}
                  onChange={(star) => setReview({ ...review, star: star })}
                />
              </FormControl>
              <FormControl id="itemName" isRequired>
                <FormLabel>Comment</FormLabel>
                <Input
                  type="text"
                  name="comment"
                  value={review.comment}
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
                    "Add Review"
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

AddReviewForm.propTypes = {
  review: PropTypes.object.isRequired,
  setReview: PropTypes.func.isRequired,
  addReviewHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  itemName: PropTypes.string.isRequired,
};
