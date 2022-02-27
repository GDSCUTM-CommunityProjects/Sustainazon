/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import Logo from "./Logo";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="150px" color={["white", "white", "black", "black"]} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
}

function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
}

function MenuLinks({ isOpen }) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/login">
          <Button
            size="sm"
            rounded="md"
            color={["primary.1000", "primary.1000", "black", "black"]}
            bg={["white", "white", "primary.1000", "primary.1000"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
            }}
          >
            Sign in
          </Button>
        </MenuItem>

        <MenuItem to="/sellaproduct" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["white", "white", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
            }}
          >
            Sell a product &gt;
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
}

function NavBarContainer({ children, ...props }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
}

export default Header;
