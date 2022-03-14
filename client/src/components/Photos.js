import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  LinkBox,
  LinkOverlay,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";

export const PhotosList = ({ heading, photoData }) => {
  const photoList = photoData.map((photo, idx) => {
    return (
      <LinkBox key={idx}>
        <LinkOverlay href={photo.link} />
        <Image
          rounded={"lg"}
          mx={2}
          boxSize={"sm"}
          src={photo.imgUrl}
          alt={photo.imgAlt}
        />
      </LinkBox>
    );
  });
  return (
    <Box my={16}>
      <Text mb={3} fontSize={"5xl"} fontWeight={"bold"}>
        {heading}
      </Text>
      <HStack mt={5} justifyContent={"center"}>
        {photoList}
      </HStack>
    </Box>
  );
};

PhotosList.propTypes = {
  heading: PropTypes.string,
  photoData: PropTypes.array.isRequired,
};
