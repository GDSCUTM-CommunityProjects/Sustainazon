import React from "react";
import PropTypes from "prop-types";
import {
  LinkOverlay,
  LinkBox,
  Box,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
export const SearchResultItem = ({
  id,
  imgUrl,
  imgAlt,
  itemName,
  tag,
  price,
  rating,
  numReviews,
  points,
}) => {
  const formattedTag = tag.replaceAll(" ", "+");
  return (
    <Box>
      <LinkBox mx={4} mb={3}>
        <LinkOverlay href={`/dp?itemId=${id}`} />
        <Image boxSize={"2xs"} src={imgUrl} rounded={"lg"} alt={imgAlt} />
        <Box mt={2} pl={1}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {itemName}
          </Text>
          <Text fontSize={"sm"}>Potential Points: {points}</Text>
          <Flex direction={"row"} fontSize={"sm"}>
            <Link color={"blue.400"} href={`/search?item=${formattedTag}`}>
              <Text fontSize={"sm"}>{`${tag}`}</Text>
            </Link>
            <Text pl={1}>{`- $${price}`}</Text>
          </Flex>
        </Box>
        <Box pl={1} display={"flex"} alignItems={"center"}>
          <Rate allowHalf={true} value={rating} />
          <Box as={"span"} ml={2} color={"gray.600"} fontSize={"sm"}>
            {numReviews} reviews
          </Box>
        </Box>
      </LinkBox>
    </Box>
  );
};

SearchResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};
