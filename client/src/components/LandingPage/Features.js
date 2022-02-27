/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsFillHouseDoorFill } from "react-icons/bs";

function Feature({ title, text, icon }) {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="gray.100"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
}

export default function FourColumns() {
  return (
    <Flex
      w="80vw"
      h="40vh"
      justify="center"
      direction="column"
      align="center"
      backgroundColor="#F6F6F6"
      margin="50px 50px"
    >
      <Text
        color="black"
        fontWeight={700}
        lineHeight={1.2}
        fontSize={useBreakpointValue({ base: "7xl", md: "5xl" })}
      >
        Follow our sustainable product symbols
      </Text>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          <Feature
            icon={
              <Icon
                as={BsFillHouseDoorFill}
                w={10}
                h={10}
                alignItems="center"
                color="green"
              />
            }
            title="Produced locally"
            text=""
          />
          <Feature
            icon={
              <Icon
                as={BsFillHouseDoorFill}
                w={10}
                h={10}
                color="green"
                flexDirection="row"
              />
            }
            title="Packaged sustainably"
            text=""
          />
          <Feature
            icon={<Icon as={BsFillHouseDoorFill} w={10} h={10} color="green" />}
            title="Friendly to wildlife"
            text=""
          />
          <Feature
            icon={<Icon as={BsFillHouseDoorFill} w={10} h={10} color="green" />}
            title="Recycled materials"
            text=""
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
