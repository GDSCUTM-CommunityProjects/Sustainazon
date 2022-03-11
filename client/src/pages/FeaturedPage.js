import React from "react";
import { Flex, SimpleGrid, GridItem } from "@chakra-ui/react";
import { tmpFeatureData, tmpCarouselData } from "../tmp/tmpSearchData";
import { SearchResultItem } from "../components/SearchResultItem";

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
    <Flex>
      <SimpleGrid columns={2}>{featuredItems}</SimpleGrid>
    </Flex>
  );
};
