import React from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";
import { tmpShoppingCartData } from "../tmp/tmpSearchData";

export const ShoppingCartPage = () => {
  return (
    <Flex grow={1} mt={6} flexDirection={"column"} alignItems={"center"}>
      <Stack>
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Cart
        </Text>
      </Stack>
    </Flex>
  );
};
