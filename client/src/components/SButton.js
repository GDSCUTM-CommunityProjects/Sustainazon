import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

export const SButton = ({ text, ...props }) => {
  return (
    <Button
      _hover={{ background: "secondary.500" }}
      _active={{ background: "secondary.300" }}
      _focus={{ background: "secondary.300" }}
      styles={{ border: "none" }}
      background={"secondary.300"}
      {...props}
    >
      {text}
    </Button>
  );
};

SButton.propTypes = {
  text: PropTypes.string.isRequired,
};
