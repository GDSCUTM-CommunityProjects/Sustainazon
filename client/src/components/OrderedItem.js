import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { updateShoppingCartItemQuantity } from "../reducers/shoppingCartSlice";

export const OrderedItem = ({
  orderId,
  quantity,
  price,
  imgUrl,
  imgAlt,
  itemName,
  status,
  orderDate,
  lastUpdated,
  updateOrderedItemStatusHandler,
}) => {
  const formattedStatus = `${status.slice(0, 1)}${status
    .slice(1)
    .toLowerCase()}`;
  const [orderedItemStatus, setOrderedItemStatus] = useState(formattedStatus);
  const itemQuantitySelector = () => {
    const updateOptions = [
      "Ordered",
      "Return",
      "Order Received",
      "Fulfilling",
      "Shipping",
      "Delivered",
    ];
    const optionItems = [];
    for (let i = 0; i < updateOptions.length; i++) {
      optionItems.push(
        <option key={i} value={updateOptions[i]}>
          {updateOptions[i]}
        </option>
      );
    }
    return optionItems;
  };

  const formatOrderItemStatus = (status) => {
    return status.toUpperCase().replace(" ", "_");
  };

  return (
    <Flex ml={10} my={3} flexDirection={"row"}>
      <Flex rounded={"xl"} px={2} py={3} background={"other.orders"}>
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={170} src={imgUrl} rounded={"lg"} alt={imgAlt} />
        </Box>
        <VStack alignItems={"flex-start"} mr={12}>
          <HStack>
            <Text fontWeight={"semibold"} fontSize={"xl"}>
              {itemName}
            </Text>
            <Text fontSize={"lg"}>{`- $${price}`}</Text>
          </HStack>
          <Flex mt={"0 !important"} direction={"row"} fontSize={"sm"}>
            <Text>Quantity: {quantity}</Text>
          </Flex>
          <Text fontSize={"sm"}>Order placed: {orderDate}</Text>
          <Text pb={8} fontSize={"sm"} mt={"0 !important"}>
            Status Updated On: {lastUpdated}
          </Text>
          <Text fontSize={"sm"} mt={"0 !important"}>
            Status:
          </Text>
          <Select
            borderColor={"primary.600"}
            _hover={{ borderColor: "primary.600" }}
            _focus={{ borderColor: "primary.600" }}
            value={orderedItemStatus}
            onChange={(e) =>
              updateOrderedItemStatusHandler(
                orderId,
                formatOrderItemStatus(e.target.value)
              )
            }
          >
            {itemQuantitySelector()}
          </Select>
        </VStack>
      </Flex>
    </Flex>
  );
};

OrderedItem.propTypes = {
  orderId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  updateOrderedItemStatusHandler: PropTypes.func.isRequired,
};
