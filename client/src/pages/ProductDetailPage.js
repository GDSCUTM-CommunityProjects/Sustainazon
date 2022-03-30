import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { instance } from "../axios";
import Rate from "rc-rate";
import { MdLocationPin } from "react-icons/md";
import { FaRegHandshake, FaHands } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { Review } from "../components/Review";
import { SButton } from "../components/SButton";
import AddReviewForm from "../components/AddReviewForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addShoppingCartItem,
  updateShoppingCartItemQuantity,
} from "../reducers/shoppingCartSlice";

export const ProductDetailPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();
  const [findItemErrorMessage, setFindItemErrorMessage] = useState("");
  const [isLoadingItemData, setIsLoadingItemData] = useState(true);
  const [isLoadingReviewAdd, setIsLoadingReviewAdd] = useState(false);
  const [addReviewErrorMessage, setAddReviewErrorMessage] = useState("");
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
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
  const [review, setReview] = useState({
    itemId: itemId,
    comment: "",
    star: 0,
  });
  const dispatch = useDispatch();

  const fetchItemDetails = async (id) => {
    await instance
      .get(`/item?itemId=${id}`)
      .then((res) => {
        console.log("Fetched Item Data:", res.data);
        const data = res.data;
        setItemData({
          ...data,
          comments: data.comments === undefined ? [] : data.comments,
          media: data.media === undefined ? [{ alt: "", url: "" }] : data.media,
        });
      })
      .catch((e) => {
        console.log("Unable to fetch item data or it doesn't exist");
        console.log(e);
        setFindItemErrorMessage("Unable to find item you're looking for.");
      });
    setIsLoadingItemData(false);
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
        description: "This is a free trade product",
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
            <PopoverHeader>
              <Text fontWeight={"semibold"}>What does this icon mean?</Text>
            </PopoverHeader>
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

  const toDateTime = (seconds) => {
    // Epoch
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date;
  };

  const reviewItems = () => {
    return itemData.comments.map((review, id) => {
      return (
        <Review
          key={id}
          rating={review.stars}
          comment={review.comment}
          name={review.name}
          commentDate={toDateTime(
            review.timestamp._seconds
          ).toLocaleDateString()}
        />
      );
    });
  };

  const addReviewHandler = async (e, review) => {
    e.preventDefault();
    if (review.star !== 0) {
      setIsLoadingReviewAdd(true);
      await instance
        .post("/buyer/item/rate", review)
        .then(() => {
          console.log("Successfully added review");
          setIsLoadingReviewAdd(false);
          fetchItemDetails(itemId);
          onClose();
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 403) {
              setAddReviewErrorMessage("Unable to add review as a seller");
            } else {
              setAddReviewErrorMessage("Login to add a review");
            }
          } else {
            setAddReviewErrorMessage(
              "Unable to add review...something went wrong"
            );
          }
          setIsLoadingReviewAdd(false);
        });
    } else {
      setAddReviewErrorMessage("Please input a rating");
    }
  };

  return (
    <Flex pb={4} grow={1} mt={10} direction={"column"}>
      {findItemErrorMessage !== "" ? (
        <Flex justifyContent={"center"} mb={3}>
          <Text fontSize={"lg"}>{findItemErrorMessage}</Text>
        </Flex>
      ) : (
        <></>
      )}
      {isLoadingItemData ? (
        <Flex grow={1} justifyContent={"center"}>
          <Spinner
            size={"xl"}
            thickness={4}
            speed={"0.5s"}
            color={"primary.600"}
          />
        </Flex>
      ) : itemData.itemName === "" ? (
        <></>
      ) : (
        <>
          <Modal
            isOpen={isOpen}
            size={"4xl"}
            onClose={onClose}
            isCentered={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <AddReviewForm
                  isLoading={isLoadingReviewAdd}
                  addReviewHandler={addReviewHandler}
                  review={review}
                  setReview={setReview}
                  itemName={itemData.itemName}
                />
              </ModalBody>
              <ModalFooter justifyContent={"center"}>
                {addReviewErrorMessage !== "" ? (
                  <Alert rounded={"lg"} width={"100%"} status={"error"}>
                    <AlertIcon />
                    {addReviewErrorMessage}
                  </Alert>
                ) : (
                  <></>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Flex ml={10} mb={5}>
            <Text fontWeight={"semibold"} pb={1}>
              Categories &gt;
            </Text>
            {formatCategories()}
          </Flex>
          <Flex mb={2} direction={"column"} alignItems={"center"}>
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
                    {itemData.totalReviews}{" "}
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
                <SButton
                  mt={2}
                  disabled={itemData.inventory === 0}
                  text={"Add to cart"}
                  onClick={() => {
                    let itemIdx = -1;
                    for (let i = 0; i < shoppingCartItems.length; i++) {
                      if (shoppingCartItems[i].itemId === itemId) {
                        itemIdx = i;
                        break;
                      }
                    }
                    console.log(itemIdx);
                    if (itemIdx !== -1) {
                      // Update item quantity
                      const oq = shoppingCartItems[itemIdx].quantity;
                      dispatch(
                        updateShoppingCartItemQuantity({
                          oldQuantity: oq,
                          newQuantity: oq + 1,
                          id: itemId,
                        })
                      );
                    } else {
                      // Add new item to cart
                      dispatch(addShoppingCartItem({ id: itemId }));
                    }
                  }}
                />
                <Text mt={30} fontWeight={"semibold"} fontSize={"xl"}>
                  About this item
                </Text>
                <Text fontSize={"lg"}>{itemData.description}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex ml={10} mt={10} direction={"column"}>
            <Text fontWeight={"semibold"} fontSize={"3xl"} mb={1}>
              Reviews
            </Text>
            <SButton
              mb={2}
              w={200}
              text={"Add Review"}
              onClick={() => {
                setReview({ itemId: itemId, comment: "", star: 0 });
                onOpen();
              }}
            />
            {reviewItems()}
          </Flex>
        </>
      )}
    </Flex>
  );
};
