import React from "react";
import {
  Box,
  HStack,
  Image,
  Flex,
  Text,
  LinkBox,
  LinkOverlay,
  VStack,
  Link,
  Button,
  Select,
  border,
  Spacer,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { updateQuantity, removeItem } from "../reducers/shoppingCartSlice";
import { useDispatch } from "react-redux";

export const ShoppingCartItem = ({
  id,
  itemName,
  imgSrc,
  imgAlt,
  points,
  price,
  quantity,
  companyName,
}) => {
  const formattedItemName = itemName.replaceAll(" ", "-");
  const dispatch = useDispatch();
  const itemQuantitySelector = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  return (
    <Flex ml={10} my={2} flexDirection={"row"}>
      <Flex rounded={"xl"} pl={2} pr={5} py={3} background={"other.orders"}>
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={160} src={imgSrc} rounded={"lg"} alt={imgAlt} />
        </Box>
        <VStack alignItems={"flex-start"} mr={12}>
          <HStack>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              {itemName}
            </Text>
            <Text>
              <Select
                borderColor={"primary.600"}
                _hover={{ borderColor: "primary.600" }}
                _focus={{ borderColor: "primary.600" }}
                value={quantity}
                onChange={(e) =>
                  dispatch(updateQuantity({ quantity: e.target.value, id: id }))
                }
              >
                {itemQuantitySelector()}
              </Select>
            </Text>
          </HStack>
          <Text mt={"0 !important"}>Potential Points: {points}</Text>
          <Text mt={"0 !important"} text={"xs"}>
            Sold from:{" "}
            <Link color={"primary.500"} to={`/company/${companyName}`}>
              {companyName}
            </Link>
          </Text>
          <Spacer />
          <Text
            mt={10}
            as={"button"}
            fontSize={"sm"}
            onClick={() => dispatch(removeItem(id))}
          >
            Remove From Cart
          </Text>
        </VStack>
        <Flex mt={2} direction={"row"}>
          <Text fontSize={"xl"} fontWeight={"bold"} pl={1}>{`$${price}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

ShoppingCartItem.propTypes = {
  id: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
};
