import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Rate from "rc-rate";

export const Review = ({ rating, comment, commentDate, name }) => {
  return (
    <Flex
      my={2}
      rounded={"xl"}
      p={3}
      w={800}
      direction={"column"}
      background={"other.orders"}
    >
      <Box pb={5}>
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          {name}
        </Text>
        <Rate allowHalf={true} disabled={true} value={rating} />
        <Text fontSize={"xs"}>Review Posted On: {commentDate}</Text>
      </Box>
      <Text fontSize={"sm"}>{comment}</Text>
    </Flex>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  commentDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
