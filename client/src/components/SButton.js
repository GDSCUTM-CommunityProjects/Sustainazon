import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

export const SButton = ({ text, disabled, ...props }) => {
  return (
    <Button
      disabled={disabled}
      _hover={
        !disabled ? { background: "secondary.500", textDecoration: "none" } : {}
      }
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
  text: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};
