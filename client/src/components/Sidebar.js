import React, { useState } from "react";
import { Flex, IconButton, Text, Box, Link, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const Sidebar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const categories = [
    "Clothing",
    "Outerwear",
    "Accessories",
    "Bags",
    "Skincare",
    "Household",
    "Artwork",
    "Productivity",
  ];

  const categoryButtons = categories.map((category, id) => {
    return (
      <Link
        rounded={"xl"}
        _hover={{ background: "secondary.400" }}
        key={id}
        href={`/search?item=${category.toLowerCase()}`}
      >
        <Text py={3} fontSize={"lg"} pr={"auto"} color={"white"} as={"button"}>
          <ChevronRightIcon />
          {category}
        </Text>
      </Link>
    );
  });
  const openCloseDrawer = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Flex w={250}>
      <Flex
        w={navOpen ? 250 : 55}
        background={"footer.100"}
        flexDir={"column"}
        as={"nav"}
      >
        {!navOpen ? (
          <IconButton
            background={"none"}
            color={"white"}
            mt={1}
            _active={{ background: "none" }}
            _hover={{ background: "none" }}
            icon={<HamburgerIcon />}
            onClick={() => openCloseDrawer()}
          />
        ) : (
          <Box px={4}>
            <Flex mt={1} justifyContent={"flex-end"}>
              <IconButton
                background={"none"}
                color={"white"}
                mt={1}
                _hover={{ background: "none" }}
                _active={{ background: "none" }}
                icon={<CloseIcon />}
                onClick={() => openCloseDrawer()}
                size={"xs"}
              />
            </Flex>
            <Text
              color={"white"}
              px={1}
              mb={2}
              fontSize={"2xl"}
              fontWeight={"semibold"}
            >
              Products
            </Text>
            <VStack align={"stretch"}>{categoryButtons}</VStack>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
