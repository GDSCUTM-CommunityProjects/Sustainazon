import React from "react";
import { Flex, SimpleGrid, GridItem, Box, Text, Stack } from "@chakra-ui/react";
import { tmpFeatureData, tmpCarouselData } from "../tmp/tmpSearchData";
import { SearchResultItem } from "../components/SearchResultItem";
import { FeaturedCarousel } from "../components/FeaturedCarousel";

export const FeaturedPage = () => {
  const featuredItems = tmpFeatureData.map((item, id) => {
    return (
      <GridItem key={id}>
        <SearchResultItem
          price={item.price}
          imgUrl={item.imgUrl}
          imgAlt={item.imgAlt}
          numReviews={item.numReviews}
          id={item.id}
          itemName={item.itemName}
          rating={item.rating}
          tag={item.tag}
        />
      </GridItem>
    );
  });

  return (
    <Flex grow={1} mt={6} flexDirection={"column"} alignItems={"center"}>
      <Stack>
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Featured
        </Text>
        <Flex>
          <Box boxSize={"md"} mr={10}>
            <FeaturedCarousel carouselData={tmpCarouselData} />
          </Box>
          <Box ml={10}>
            <SimpleGrid columns={2}>{featuredItems}</SimpleGrid>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};
