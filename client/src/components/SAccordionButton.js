import React from "react";
import { AccordionButton, AccordionIcon, Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const SAccordionButton = ({ text }) => {
  return (
    <AccordionButton
      _focus={{ background: "none" }}
      _hover={{ background: "none" }}
    >
      <AccordionIcon fontSize={"3xl"} />
      <Box ml={2}>
        <Text fontSize={"4xl"} fontWeight={"semibold"}>
          {text}
        </Text>
      </Box>
    </AccordionButton>
  );
};

SAccordionButton.propTypes = {
  text: PropTypes.string.isRequired,
};
