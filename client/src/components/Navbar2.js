import React, { useEffect } from "react";
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
  Icon,
} from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCartItems } from "../reducers/shoppingCartSlice";
import { instance } from "../axios";
import Cookies from "universal-cookie";

export const Navbar2 = ({ user }) => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.shoppingCart.items.length);
  useEffect(() => {
    dispatch(fetchShoppingCartItems());
  }, [itemCount, dispatch]);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const cookies = new Cookies();
    await instance
      .post("/accounts/logout")
      .then(() => {
        cookies.remove("isSeller");
        cookies.remove("auth");
        navigate("/login");
      })
      .catch(() => {
        console.log("Unable to logout");
      });
  };
  const cookies = new Cookies();
  const menuItems =
    cookies.get("auth") === "true"
      ? [
          { itemName: "Account", link: "/account" },
          {
            itemName: "Logout",
            link: "/logout",
            onClick: () => logoutHandler(),
          },
        ]
      : [
          { itemName: "Login", link: "/login" },
          { itemName: "Sign up", link: "/signup" },
        ];
  const menuItemList = menuItems.map((menuItem, idx) => {
    return menuItem.itemName === "Logout" ? (
      <MenuItem
        key={idx}
        _hover={{ background: "secondary.200" }}
        _focus={{ background: "secondary.200" }}
        onClick={menuItem.onClick}
      >
        {menuItem.itemName}
      </MenuItem>
    ) : (
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
      <HStack mr={3}>
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
        <Button
          onClick={() => {
            navigate("/cart");
          }}
          background={"secondary.200"}
          _active={{ background: "secondary.500" }}
          _hover={{ background: "secondary.500" }}
        >
          <Icon as={AiOutlineShoppingCart} />
          <Text ml={2}>Items: {itemCount}</Text>
        </Button>
      </HStack>
    </Flex>
  );
};

Navbar2.propTypes = {
  user: PropTypes.string.isRequired,
};
