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
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingCartItems } from "../reducers/shoppingCartSlice";
import { instance } from "../axios";
import Cookies from "universal-cookie";

export const Navbar2 = ({ user }) => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("auth") === "true";
  const isSeller = cookies.get("isSeller") === "true";
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.shoppingCart.items.length);
  useEffect(() => {
    dispatch(fetchShoppingCartItems());
  }, [itemCount, dispatch]);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await instance
      .post("/accounts/logout")
      .then(() => {
        cookies.remove("isSeller");
        cookies.remove("auth");
        navigate("/login");
        window.location.reload();
      })
      .catch(() => {
        console.log("Unable to logout");
      });
  };
  let menuItems = isLoggedIn
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
  if (isLoggedIn && isSeller)
    menuItems = [
      {
        itemName: "Logout",
        link: "/logout",
        onClick: () => logoutHandler(),
      },
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
      <HStack mx={3}>
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
        {!isSeller && (
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
        )}
        {isSeller && (
          <Button
            onClick={() => {
              navigate("/itemsSelling");
            }}
            background={"secondary.200"}
            _active={{ background: "secondary.500" }}
            _hover={{ background: "secondary.500" }}
          >
            <Icon as={FaBoxes} />
            <Text ml={2}>My Products</Text>
          </Button>
        )}
        {isSeller && (
          <Button
            onClick={() => {
              navigate("/itemsOrdered");
            }}
            background={"secondary.200"}
            _active={{ background: "secondary.500" }}
            _hover={{ background: "secondary.500" }}
          >
            <Icon as={BsFillBagCheckFill} />
            <Text ml={2}>My Orders</Text>
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

Navbar2.propTypes = {
  user: PropTypes.string.isRequired,
};
