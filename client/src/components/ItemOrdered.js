import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  HStack,
  Image,
  VStack,
  Box,
  Text,
  Flex,
  Link,
  Spacer,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { SButton } from "./SButton";

export const ItemOrdered = ({
  id,
  itemName,
  price,
  imgUrl,
  imgAlt,
  tag,
  orderDate,
  status,
  lastUpdated,
  points,
  quantity,
  returnItemHandler,
  cancelOrderHandler,
}) => {
  const formattedTag = tag.replaceAll(" ", "+");
  const formattedItemName = itemName.replaceAll(" ", "-");
  const formattedStatus = `${status.slice(0, 1)}${status
    .slice(1)
    .toLowerCase()}`;
  return (
    <Flex ml={10} my={3} flexDirection={"row"}>
      <Flex rounded={"xl"} px={2} py={3} background={"other.orders"}>
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={170} src={imgUrl} rounded={"lg"} alt={imgAlt} />
        </Box>
        <VStack alignItems={"flex-start"} mr={12}>
          <HStack>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              {itemName}
            </Text>
            <Text>x {quantity}</Text>
          </HStack>
          <Flex mt={"0 !important"} direction={"row"} fontSize={"sm"}>
            <Link color={"blue.400"} href={`/search?item=${formattedTag}`}>
              <Text fontSize={"sm"}>{`${tag}`}</Text>
            </Link>
            <Text pl={1}>{`- $${price}`}</Text>
          </Flex>
          <Text pt={2} fontSize={"sm"} mt={"0 !important"}>
            Potential Points: {points}
          </Text>
          <Text fontSize={"sm"}>Order placed: {orderDate}</Text>
          <Text fontSize={"sm"} mt={"0 !important"}>
            Status: {formattedStatus}
          </Text>
          <Text pb={8} fontSize={"sm"} mt={"0 !important"}>
            Status Updated On: {lastUpdated}
          </Text>
        </VStack>
        <VStack
          flexDirection={"column"}
          ml={12}
          mr={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Link textDecoration={"none"} href={`/${formattedItemName}/dp/${id}`}>
            {status === "Delivered" ? (
              <SButton maxW={120} text={"Write a review"} />
            ) : (
              <SButton maxW={120} text={"View Details"} />
            )}
          </Link>
          {status === "DELIVERED" ? (
            <SButton
              onClick={returnItemHandler}
              maxW={120}
              mt={3}
              w={"100%"}
              text={"Return Item"}
            />
          ) : status === "RETURN" ? (
            <></>
          ) : (
            <SButton
              onClick={cancelOrderHandler}
              maxW={120}
              mt={3}
              w={"100%"}
              text={"Cancel Order"}
            />
          )}
        </VStack>
      </Flex>
    </Flex>
  );
};

ItemOrdered.propTypes = {
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  returnItemHandler: PropTypes.func,
  cancelOrderHandler: PropTypes.func,
};
