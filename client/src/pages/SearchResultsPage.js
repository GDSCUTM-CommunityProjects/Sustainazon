import React, { useEffect, useState } from "react";
import { SearchResultItem } from "../components/SearchResultItem";
import {
  Flex,
  SimpleGrid,
  Text,
  HStack,
  Box,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { instance } from "../axios";
import { tmpSearchData } from "../tmp/tmpSearchData";

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [itemSearched, setItemSearched] = useState("");
  const [searchedItemData, setSearchedItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // On query param change, reset loading and empty last searched data
    if (!isLoading) {
      setIsLoading(true);
      setSearchedItemData([]);
    }

    // Extracting item query param
    const itemSearchParam = searchParams.get("item");
    if (itemSearchParam) {
      console.log("Has Item");
      setItemSearched(itemSearchParam);
    } else {
      navigate("/featured");
    }

    // Searching for item
    const getSearchedItems = async () => {
      await instance
        .get("/whateverGoesHere")
        .then(() => {
          console.log("Success Stuff");
        })
        .catch(() => {
          console.log("Mocking with fake data for now");
          setSearchedItemData(tmpSearchData);
        });
      setIsLoading(false);
    };
    getSearchedItems();
  }, [searchParams]);

  // Returning item components on returned search result
  const searchResultItems = searchedItemData.map((item, idx) => {
    return (
      <SearchResultItem
        key={idx}
        id={item.id}
        itemName={item.itemName}
        imgAlt={item.imgAlt}
        imgUrl={item.imgUrl}
        price={item.price}
        tag={item.tag}
        rating={item.rating}
        numReviews={item.numReviews}
      />
    );
  });

  return (
    <Flex grow={1} mb={24} mt={10} direction={"column"} align={"center"}>
      <Stack spacing={2}>
        <Box mx={4} my={3}>
          {isLoading ? (
            <Spinner
              size={"xl"}
              thickness={4}
              speed={"0.5s"}
              color={"primary.600"}
            />
          ) : (
            <>
              {searchResultItems.length > 0 ? (
                <HStack fontSize={"4xl"}>
                  <Text fontWeight={"bold"}>Results for</Text>
                  <Text>{itemSearched}</Text>
                </HStack>
              ) : (
                <Text>No results for {itemSearched}</Text>
              )}
            </>
          )}
        </Box>
        <SimpleGrid columns={4}>{searchResultItems}</SimpleGrid>
      </Stack>
    </Flex>
  );
};
