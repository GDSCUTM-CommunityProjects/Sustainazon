import React from "react";
import {
  HStack,
  Text,
  Button,
  Link,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

export const Navbar2 = ({ user }) => {
  const navigate = useNavigate();

  const menuItems = [
    { itemName: "Your Orders", link: "account" },
    { itemName: "Logout", link: "logout" },
  ];
  const menuItemList = menuItems.map((menuItem, idx) => {
    return (
      <Link
        key={idx}
        style={{ textDecoration: "none" }}
        as={ReactRouterLink}
        to={menuItem.link}
      >
        <MenuItem
          _hover={{ background: "secondary.200" }}
          _focus={{ background: "secondary.200" }}
        >
          {menuItem.itemName}
        </MenuItem>
      </Link>
    );
  });

  return (
    <HStack px={3} py={6} borderBottom={"1px solid"} borderColor={"gray.300"}>
      <Text pl={6} fontSize={"3xl"} fontWeight={"bold"}>
        Sustainazon
      </Text>
      <Spacer />
      <SearchBar />
      <Spacer />
      <Button
        px={4}
        bgColor={"secondary.200"}
        _hover={{ background: "secondary.300" }}
        onClick={() => {
          navigate("/learn");
        }}
      >
        Learn
      </Button>
      <Menu>
        <MenuButton
          px={5}
          bgColor={"#ffffff"}
          _expanded={{ background: "secondary.200" }}
          _active={{ background: "secondary.200" }}
          _hover={{ background: "secondary.200" }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          Hello, {user}
        </MenuButton>
        <MenuList>{menuItemList}</MenuList>
      </Menu>
    </HStack>
  );
};

Navbar2.propTypes = {
  user: PropTypes.string.isRequired,
};
