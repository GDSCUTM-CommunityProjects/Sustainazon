import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { Grid1x2 } from "../components/Grid1x2";
import { aboutUsText, missionStatementText } from "../constants";
import { PhotosList } from "../components/Photos";

export const AboutPage = () => {
  const photoData = [
    {
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Partner",
      link: "https://github.com/hiimchrislim",
    },
    {
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Partner",
      link: "https://github.com/hiimchrislim",
    },
    {
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Partner",
      link: "https://github.com/hiimchrislim",
    },
    {
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Partner",
      link: "https://github.com/hiimchrislim",
    },
  ];

  return (
    <Flex
      ml={5}
      grow={1}
      mt={6}
      mb={12}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Stack>
        <Grid1x2
          heading={"About Us"}
          imgSrc={"https://github.com/hiimchrislim.png"}
          imgAlt={"AboutUs"}
          description={aboutUsText}
        />
        <Grid1x2
          heading={"Mission"}
          imgSrc={"https://github.com/hiimchrislim.png"}
          imgAlt={"MissionStatement"}
          description={missionStatementText}
          reversed={true}
        />
        <PhotosList heading={"Partners"} photoData={photoData} />
      </Stack>
    </Flex>
  );
};
