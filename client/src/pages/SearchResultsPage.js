import React, { useEffect, useState } from "react";
import { SearchResultItem } from "../components/SearchResultItem";
import { Flex, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { instance } from "../axios";
import { tmpSearchData } from "../tmp/tmpSearchData";

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [itemSearched, setItemSearched] = useState("");
  const [searchedItemData, setSearchedItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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
        itemName={item.itemName}
        imgAlt={item.imgAlt}
        imgUrl={item.imgUrl}
        price={item.price}
        tag={item.tag}
      />
    );
  });

  return (
    <Flex mb={"24"} mt={"10"} direction={"column"} align={"center"}>
      <SearchBar />
      {isLoading ? (
        "Loading..."
      ) : (
        <Box>
          {searchResultItems.length > 0 ? (
            <Text>Results for {itemSearched}</Text>
          ) : (
            <Text>No results for {itemSearched}</Text>
          )}
        </Box>
      )}
      <SimpleGrid columns={4}>{searchResultItems}</SimpleGrid>
    </Flex>
  );
};
