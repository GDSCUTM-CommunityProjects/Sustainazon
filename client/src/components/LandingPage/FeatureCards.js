import React from "react";
import { VStack, HStack, Image } from "@chakra-ui/react";
import recycling from "../../assets/recycling.png";
import clothing from "../../assets/clothing.png";
import support from "../../assets/support.png";

export default function FeatureCards() {
  return (
    <HStack margin={5}>
      <Image src={clothing} alt="Clothing" />
      <VStack spacing={8}>
        <Image src={recycling} alt="Recycling" />
        <Image src={support} alt="Support" />
      </VStack>
    </HStack>
  );
}
