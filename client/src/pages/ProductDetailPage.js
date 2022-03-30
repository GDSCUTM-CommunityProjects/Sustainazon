import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { instance } from "../axios";
import Rate from "rc-rate";
import { MdLocationPin } from "react-icons/md";
import { FaRegHandshake, FaHands } from "react-icons/fa";
import { GoPackage } from "react-icons/go";

export const ProductDetailPage = () => {
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState({
    categories: [],
    comments: [],
    description: "",
    inventory: 0,
    itemName: "",
    media: [{ alt: "", url: "" }],
    price: 0,
    sellerId: "",
    tags: [],
    totalReviews: 0,
    totalStars: 0,
  });

  const fetchItemDetails = async (id) => {
    await instance
      .get(`/item?itemId=${id}`)
      .then((res) => {
        console.log("Fetched Item Data:", res.data);
        setItemData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("Unable to fetch item data or it doesn't exist");
        console.log(e);
        setErrorMessage("Unable to find item you're looking for");
      });
  };

  useEffect(() => {
    const itemSearchParam = searchParams.get("itemId");
    if (itemSearchParam) {
      setItemId(itemSearchParam);
      fetchItemDetails(itemSearchParam);
    }
  }, []);

  const sustainableIcons = () => {
    const iconTagMapping = {
      handmade: {
        icon: <FaHands />,
        description: "This is a handmade product",
      },
      ftrade: {
        icon: <FaRegHandshake />,
        description: "This is a freetrade product",
      },
      local: {
        icon: <MdLocationPin />,
        description: "This is a locally made product",
      },
      sustainable_packaging: {
        icon: <GoPackage />,
        description: "This product has sustainable packaging",
      },
    };
    return itemData.tags.map((item, id) => {
      return (
        <Popover key={id}>
          <PopoverTrigger>
            <IconButton
              fontSize={30}
              w={5}
              _hover={{ background: "white" }}
              _active={{ background: "white" }}
              background={"#ffffff"}
              mr={1}
              color={"primary.600"}
              icon={iconTagMapping[item].icon}
              size={"md"}
              aria-label={"Button"}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>What does this icon mean?</PopoverHeader>
            <PopoverBody>{iconTagMapping[item].description}</PopoverBody>
          </PopoverContent>
        </Popover>
      );
    });
  };

  const formatCategories = () => {
    return itemData.categories.map((category, id) => {
      return (
        <Link
          key={id}
          _hover={{ color: "primary.600" }}
          href={`/search?item=${category}`}
        >
          <Text mx={1}>
            {category}
            {id < itemData.categories.length - 1 ? "," : ""}{" "}
          </Text>
        </Link>
      );
    });
  };
  return (
    <Flex grow={1} mt={10} direction={"column"}>
      {errorMessage !== "" ? (
        <Text fontSize={"lg"}>{errorMessage}</Text>
      ) : (
        <></>
      )}
      {isLoading ? (
        <Spinner
          size={"xl"}
          thickness={4}
          speed={"0.5s"}
          color={"primary.600"}
        />
      ) : (
        <>
          <Flex ml={10} mb={5}>
            <Text fontWeight={"semibold"} pb={1}>
              Categories &gt;
            </Text>
            {formatCategories()}
          </Flex>
          <Flex direction={"column"} alignItems={"center"}>
            <Flex>
              <Box ml={3} mr={5} pt={1}>
                <Image
                  boxSize={350}
                  mr={2}
                  src={itemData.media[0].url}
                  rounded={"lg"}
                  alt={itemData.media[0].alt}
                />
              </Box>
              <Flex w={300} direction={"column"}>
                <Text fontSize={"5xl"} fontWeight={"semibold"}>
                  {itemData.itemName}
                </Text>
                <HStack>{sustainableIcons()}</HStack>
                <Flex>
                  <Rate
                    allowHalf={true}
                    value={itemData.totalStars}
                    disabled={true}
                  />
                  <Text>
                    - {itemData.totalReviews}{" "}
                    {itemData.totalReviews > 1 ? "Reviews" : "Review"}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize={"lg"} mr={1} pt={2}>
                    Price:
                  </Text>
                  <Text
                    color={"primary.700"}
                    fontWeight={"semibold"}
                    fontSize={"2xl"}
                  >
                    ${itemData.price}
                  </Text>
                </Flex>
                <Text
                  fontWeight={"semibold"}
                  color={itemData.inventory > 0 ? "green" : "red"}
                >
                  {itemData.inventory > 0 ? "In Stock" : "Out of Stock"}
                </Text>
                <Text mt={30} fontWeight={"semibold"} fontSize={"xl"}>
                  About this item
                </Text>
                <Text fontSize={"lg"}>{itemData.description}</Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
