import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const Grid1x2 = ({ heading, imgSrc, imgAlt, description, reversed }) => {
  return (
    <Box my={16}>
      <Text fontSize={"5xl"} fontWeight={"bold"}>
        {heading}
      </Text>
      <Flex
        ml={4}
        mt={3}
        alignItems={"center"}
        flexDirection={reversed ? "row-reverse" : ""}
      >
        <Image
          mx={4}
          my={2}
          rounded={"lg"}
          boxSize={"xs"}
          src={imgSrc}
          alt={imgAlt}
        />
        <Text maxWidth={1800} fontSize={"lg"} mx={2}>
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

Grid1x2.propTypes = {
  heading: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reversed: PropTypes.bool,
};
