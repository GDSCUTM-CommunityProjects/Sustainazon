import React from "react";
import {
  Box,
  HStack,
  Image,
  Flex,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export const ShoppingCartItem = ({
  id,
  itemName,
  imgSrc,
  imgAlt,
  points,
  cost,
  quantity,
}) => {
  const formattedItemName = itemName.replaceAll(" ", "-");

  return (
    <Box>
      <HStack>
        <Box boxSize={"3xs"}>
          <Image rounded={"xl"} src={imgSrc} alt={imgAlt} />
        </Box>
        <Flex flexDirection={"column"}>
          <LinkBox>
            <LinkOverlay href={`${formattedItemName}/dp/${id}`} />
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {itemName}
            </Text>
          </LinkBox>
          <Text fontSize={"sm"}>Potential Points: {points}</Text>
          <Flex>
            <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          </Flex>
          <Text>Delete</Text>
        </Flex>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          ${cost}
        </Text>
      </HStack>
    </Box>
  );
};

ShoppingCartItem.propTypes = {
  id: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};
