import React, { useState } from "react";
import { Text, Image } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";

export const FeaturedCarousel = ({ carouselData }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const featuredContent = carouselData.map((content, id) => {
    return (
      <div key={id}>
        <Image rounded={"xl"} src={content.imgUrl} alt={content.imgAlt} />
      </div>
    );
  });

  return (
    <>
      <Carousel
        onChange={(id, _) => setCurrentImgIdx(id)}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {featuredContent}
      </Carousel>
      <Text mt={3} mb={5} fontSize={"xl"} fontWeight={"bold"}>
        {carouselData[currentImgIdx].heading}
      </Text>
      <Text>{carouselData[currentImgIdx].description}</Text>
    </>
  );
};

FeaturedCarousel.propTypes = {
  carouselData: PropTypes.array.isRequired,
};
