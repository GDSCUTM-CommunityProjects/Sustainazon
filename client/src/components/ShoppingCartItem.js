import React from "react";
import {
  Box,
  HStack,
  Image,
  Flex,
  Text,
  VStack,
  Link,
  Select,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  updateQuantity,
  removeShoppingCartItem,
  updateShoppingCartItemQuantity,
  fetchShoppingCartItems,
} from "../reducers/shoppingCartSlice";
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
  usePoints,
  pointsPrice,
}) => {
  const formattedCompanyName = companyName.replace(" ", "+");
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
      <Flex
        w={600}
        rounded={"xl"}
        pl={2}
        pr={5}
        py={3}
        background={"other.orders"}
      >
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={160} src={imgSrc} rounded={"lg"} alt={imgAlt} />
        </Box>

        <VStack alignItems={"flex-start"} mr={12}>
          <HStack>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              {itemName}
            </Text>
            <Select
              width={100}
              borderColor={"primary.600"}
              _hover={{ borderColor: "primary.600" }}
              _focus={{ borderColor: "primary.600" }}
              value={quantity}
              onChange={(e) =>
                dispatch(
                  updateShoppingCartItemQuantity({
                    oldQuantity: quantity,
                    newQuantity: e.target.value,
                    id: id,
                    usePoints: usePoints,
                  })
                )
              }
            >
              {itemQuantitySelector()}
            </Select>
          </HStack>
          <Text mt={"0 !important"}>Potential Points: {points}</Text>
          <Flex>
            <Text mt={"0 !important"} text={"xs"} mr={1}>
              Sold by:
            </Text>
            <Link
              color={"primary.500"}
              href={`/search?item=${formattedCompanyName}`}
            >
              {companyName}
            </Link>
          </Flex>
          <Checkbox
            isChecked={usePoints}
            onChange={() => {
              dispatch(
                updateShoppingCartItemQuantity({
                  oldQuantity: quantity,
                  newQuantity: quantity,
                  id: id,
                  usePoints: usePoints,
                })
              );
            }}
          >
            Use Points?
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              This item costs {pointsPrice} points
            </Text>
          </Checkbox>
          <Spacer />
          <Text
            mt={10}
            as={"button"}
            fontSize={"sm"}
            onClick={() =>
              dispatch(
                removeShoppingCartItem({
                  itemId: id,
                  quantity: quantity,
                  usePoints: usePoints,
                })
              )
            }
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
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  usePoints: PropTypes.bool.isRequired,
  pointsPrice: PropTypes.number.isRequired,
};
