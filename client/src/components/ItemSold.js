import React from "react";
import { Box, Flex, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { SButton } from "./SButton";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ItemSold = ({
  id,
  imgUrl,
  imgAlt,
  itemName,
  inventory,
  price,
  deleteItemSellingHandler,
  editItemSellingHandler,
}) => {
  const navigate = useNavigate();
  const formattedItemName = itemName.replaceAll(" ", "-");

  return (
    <Flex ml={5} my={3} flexDirection={"row"}>
      <Flex w={600} rounded={"xl"} px={2} py={4} background={"other.orders"}>
        <Box ml={3} mr={5} pt={1}>
          <Image boxSize={170} src={imgUrl} rounded={"lg"} alt={imgAlt} />
        </Box>
        <Flex w={200} direction={"column"} mr={10}>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            {itemName}
          </Text>
          <Flex direction={"column"} mt={8}>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              Price: ${price}
            </Text>
            <Flex>
              <Text fontWeight={"semibold"} fontSize={"lg"} pr={2}>
                Inventory:
              </Text>
              <Text
                color={
                  inventory <= 10
                    ? "red"
                    : inventory > 10 && inventory < 50
                    ? "orange"
                    : "green"
                }
                fontWeight={"semibold"}
                fontSize={"lg"}
              >
                {inventory}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <VStack
          flexDirection={"column"}
          ml={2}
          mr={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <SButton
            maxW={120}
            w={"100%"}
            text={"View Item"}
            onClick={() => navigate(`/${formattedItemName}/dp/${id}`)}
          />
          <SButton
            maxW={120}
            mt={3}
            w={"100%"}
            text={"Edit Item"}
            onClick={() => editItemSellingHandler(id)}
          />
          <SButton
            maxW={120}
            mt={3}
            w={"100%"}
            text={"Delete Item"}
            onClick={() => deleteItemSellingHandler(id)}
          />
        </VStack>
      </Flex>
    </Flex>
  );
};

ItemSold.propTypes = {
  id: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  inventory: PropTypes.number.isRequired,
  deleteItemSellingHandler: PropTypes.func.isRequired,
  editItemSellingHandler: PropTypes.func.isRequired,
};
