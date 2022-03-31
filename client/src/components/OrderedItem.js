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
  const cleanStatus = (status) => {
    return `${status.slice(0, 1)}${status.slice(1).toLowerCase()}`;
  };

  const formattedStatus = () => {
    const fs = status.split("_");
    if (fs.length === 1) {
      return cleanStatus(fs[0]);
    } else {
      return `${cleanStatus(fs[0])} ${cleanStatus(fs[1])}`;
    }
  };

  const formatOrderItemStatus = (status) => {
    return status.toUpperCase().replace(" ", "_");
  };

  const [orderedItemStatus, setOrderedItemStatus] = useState(formattedStatus());
  const itemQuantitySelector = () => {
    const returnUpdateOptions = ["Return", "Return Completed"];
    const orderUpdateOptions = [
      "Ordered",
      "Order Received",
      "Fulfilling",
      "Shipping",
      "Delivered",
    ];
    console.log(orderedItemStatus);
    const optionItems = [];
    let foundCurrentStatus = false;
    if (returnUpdateOptions.includes(orderedItemStatus)) {
      for (let i = 0; i < returnUpdateOptions.length; i++) {
        if (
          orderedItemStatus === returnUpdateOptions[i] ||
          foundCurrentStatus
        ) {
          foundCurrentStatus = true;
          optionItems.push(
            <option key={i} value={returnUpdateOptions[i]}>
              {returnUpdateOptions[i]}
            </option>
          );
        }
      }
    } else if (orderUpdateOptions.includes(orderedItemStatus)) {
      for (let i = 0; i < orderUpdateOptions.length; i++) {
        if (orderedItemStatus === orderUpdateOptions[i] || foundCurrentStatus) {
          foundCurrentStatus = true;
          optionItems.push(
            <option key={i} value={orderUpdateOptions[i]}>
              {orderUpdateOptions[i]}
            </option>
          );
        }
      }
    } else {
      optionItems.push(
        <option key={1} value={"Cancelled"}>
          Cancelled
        </option>
      );
    }
    return optionItems;
  };

  return (
    <Flex ml={10} my={3} flexDirection={"row"}>
      <Flex w={550} rounded={"xl"} px={2} py={3} background={"other.orders"}>
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
          <Text fontSize={"sm"} mt={"0 !important"}>
            Status Updated On: {lastUpdated}
          </Text>
          <Text fontSize={"sm"} mt={"0 !important"}>
            Order Status:
          </Text>
          <Select
            w={200}
            borderColor={"primary.600"}
            _hover={{ borderColor: "primary.600" }}
            _focus={{ borderColor: "primary.600" }}
            value={orderedItemStatus}
            onChange={(e) => {
              const newStatus = e.target.value;
              updateOrderedItemStatusHandler(
                orderId,
                formatOrderItemStatus(newStatus)
              );
              setOrderedItemStatus(newStatus);
            }}
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
