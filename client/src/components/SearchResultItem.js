import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

export const SearchResultItem = ({ imgUrl, imgAlt, itemName, tag, price }) => {
  return (
    <Box mx={4} mt={2}>
      <Box>
        <Image boxSize={"2xs"} src={imgUrl} rounded={"lg"} alt={imgAlt} />
      </Box>
      <Box mt={2} pl={1}>
        <Box fontWeight={"bold"} fontSize={"lg"}>
          {itemName}
        </Box>
        <Flex direction={"row"} fontSize={"sm"}>
          <Link color={"blue.400"} href={`/search?tag=${tag}`}>
            <Text fontSize={"sm"}>{tag}</Text>
          </Link>
          {` - ${price}`}
        </Flex>
      </Box>
    </Box>
  );
};

SearchResultItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
