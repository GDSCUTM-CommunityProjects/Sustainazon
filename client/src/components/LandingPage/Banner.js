/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import {
  Button,
  Flex,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import background from "../../assets/plants.png";

export default function Banner() {
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      backgroundImage={`url(${background})`}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to bottom right,#497D59, transparent)"}
      >
        <Stack maxW={"3xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "8xl", md: "7xl" })}
          >
            Sustainable Shopping: All in one place
          </Text>
          <Text
            color={"white"}
            fontWeight={300}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Buy what you need at the click of a button, while knowing
            you&apos;re supporting small, environmentally-friendly businesses
          </Text>
          <Stack direction={"row"}>
            <Link href="/featured">
              <Button
                bg={"primary.1000"}
                rounded={"full"}
                color={"black"}
                _hover={{ bg: "primary.500" }}
              >
                Buy products &gt;
              </Button>
            </Link>
            <Link href="/about">
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                About
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
