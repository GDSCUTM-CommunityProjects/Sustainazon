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
import { MdLocationPin } from "react-icons/md";
import { FaRegHandshake, FaHands, FaRecycle, FaDog } from "react-icons/fa";
import { GoPackage } from "react-icons/go";

function Feature({ title, text, icon }) {
  return (
    <Stack alignItems={"center"}>
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
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
      h="45vh"
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
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={
              <Icon
                as={FaHands}
                w={10}
                h={10}
                alignItems="center"
                color="green"
              />
            }
            title="Handmade Products"
            text=""
          />
          <Feature
            icon={
              <Icon
                as={FaRegHandshake}
                w={10}
                h={10}
                color="green"
                flexDirection="row"
              />
            }
            title="Fair trade products"
            text=""
          />
          <Feature
            icon={<Icon as={MdLocationPin} w={10} h={10} color="green" />}
            title="Locally made products"
            text=""
          />
          <Feature
            icon={<Icon as={GoPackage} w={10} h={10} color="green" />}
            title="Sustainable Packaging"
            text=""
          />
          <Feature
            icon={<Icon as={FaRecycle} w={10} h={10} color="green" />}
            title="Recycled Materials"
            text=""
          />
          <Feature
            icon={<Icon as={FaDog} w={10} h={10} color="green" />}
            title="Cruelty-free"
            text=""
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
