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
}) => {
  const formattedTag = tag.replaceAll(" ", "+");
  const formattedItemName = itemName.replaceAll(" ", "-");

  return (
    <Flex ml={10} my={3} flexDirection={"row"}>
      <Flex rounded={"xl"} px={2} py={3} background={"other.orders"}>
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={150} src={imgUrl} rounded={"lg"} alt={imgAlt} />
        </Box>
        <VStack alignItems={"flex-start"} mr={12}>
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            {itemName}
          </Text>
          <Flex mt={"0 !important"} direction={"row"} fontSize={"sm"}>
            <Link color={"blue.400"} href={`/search?item=${formattedTag}`}>
              <Text fontSize={"sm"}>{`${tag}`}</Text>
            </Link>
            <Text pl={1}>{`- ${price}`}</Text>
          </Flex>
          <Text pt={2} fontSize={"sm"} mt={"0 !important"}>
            Potential Points: {points}
          </Text>
          <Text fontSize={"sm"}>Order placed: {orderDate}</Text>
          <Text fontSize={"sm"} mt={"0 !important"}>
            Status: {status}
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
              <SButton text={"View Details"} />
            )}
          </Link>
          {status === "Delivered" ? (
            <SButton mt={3} w={"100%"} text={"Return Item"} />
          ) : (
            <SButton maxW={120} mt={3} w={"100%"} text={"Cancel Order"} />
          )}
        </VStack>
      </Flex>
    </Flex>
  );
};

ItemOrdered.propTypes = {
  id: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};
