import React from "react";
import { Box, HStack, Image, Flex } from "@chakra-ui/react";

export const ShoppingCartItem = () => {
  return (
    <Box>
      <HStack>
        <Box boxSize={"3xs"}>
          <Image
            rounded={"xl"}
            src={"https://github.com/hiimchrislim.png"}
            alt={"imgAlt"}
          />
        </Box>
        <Flex flexDirection={"column"}>
          ID TITLE POTENTIAL POINTS QUANTITY DELETE
        </Flex>
        COST
      </HStack>
    </Box>
  );
};
