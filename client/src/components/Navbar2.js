import React from "react";
import {
  HStack,
  Flex,
  Text,
  Button,
  Link,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Spacer,
} from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { SButton } from "./SButton";

export const Navbar2 = ({ user }) => {
  const navigate = useNavigate();

  const menuItems = [
    { itemName: "Your Orders", link: "/account" },
    { itemName: "Logout", link: "/logout" },
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
    <Flex py={6} borderBottom={"1px solid"} borderColor={"gray.300"}>
      <Text pl={14} fontSize={"3xl"} fontWeight={"bold"}>
        <Link as={ReactRouterLink} style={{ textDecoration: "none" }} to={"/"}>
          Sustainazon
        </Link>
      </Text>
      <Spacer />
      <SearchBar />
      <Spacer />
      <HStack>
        <SButton
          px={4}
          bgColor={"secondary.200"}
          onClick={() => {
            navigate("/learn");
          }}
          text={"Learn"}
        />
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
    </Flex>
  );
};

Navbar2.propTypes = {
  user: PropTypes.string.isRequired,
};
