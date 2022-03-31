import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
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
import { FaRegHandshake, FaHands, FaRecycle, FaDog } from "react-icons/fa";
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
  const [addToCartText, setAddToCartText] = useState("Add to cart");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();
  const [findItemErrorMessage, setFindItemErrorMessage] = useState("");
  const [isLoadingItemData, setIsLoadingItemData] = useState(true);
  const [isLoadingReviewAdd, setIsLoadingReviewAdd] = useState(false);
  const [addReviewErrorMessage, setAddReviewErrorMessage] = useState("");
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const [usePoints, setUsePoints] = useState(false);
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
    potentialPoints: 0,
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
          totalReviews: data.totalReviews ? data.totalReviews : 0,
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
      Handmade: {
        icon: <FaHands />,
        description: "This is a handmade product",
      },
      "Fair Trade": {
        icon: <FaRegHandshake />,
        description: "This is a free trade product",
      },
      Local: {
        icon: <MdLocationPin />,
        description: "This is a locally made product",
      },
      Packaging: {
        icon: <GoPackage />,
        description: "This product has sustainable packaging",
      },
      "Recycled Materials": {
        icon: <FaRecycle />,
        description: "This product was made of recycled materials",
      },
      "Animal-friendly": {
        icon: <FaDog />,
        description: "This product is animal-friendly and cruelty-free",
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
                    value={itemData.totalStars / itemData.totalReviews}
                    disabled={true}
                  />
                  <Text>
                    {itemData.totalReviews}{" "}
                    {itemData.totalReviews > 1 || itemData.totalReviews === 0
                      ? "Reviews"
                      : "Review"}
                  </Text>
                </Flex>
                <Text fontSize={"sm"}>
                  Potential Points: {itemData.potentialPoints}
                </Text>
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
                <Checkbox
                  mt={2}
                  mb={1}
                  value={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                >
                  Pay with points?
                </Checkbox>
                <SButton
                  disabled={itemData.inventory === 0}
                  text={addToCartText}
                  onClick={() => {
                    let itemIdx = -1;
                    for (let i = 0; i < shoppingCartItems.length; i++) {
                      if (shoppingCartItems[i].itemId === itemId) {
                        itemIdx = i;
                        break;
                      }
                    }
                    console.log("Item Idx", itemIdx);
                    if (itemIdx !== -1) {
                      // Update item quantity
                      const oq = shoppingCartItems[itemIdx].quantity;
                      console.log("Old Quantity", oq);
                      dispatch(
                        updateShoppingCartItemQuantity({
                          oldQuantity: oq,
                          newQuantity: oq + 1,
                          id: itemId,
                          usePoints: usePoints,
                        })
                      );
                    } else {
                      // Add new item to cart
                      dispatch(
                        addShoppingCartItem({
                          id: itemId,
                          usePoints: usePoints,
                        })
                      );
                    }
                    setAddToCartText("Added!");
                    setTimeout(() => {
                      setAddToCartText("Add to cart");
                    }, 5000);
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
            {reviewItems().length === 0 ? (
              <Text mt={3}>
                Be the first to write a review for this product!
              </Text>
            ) : (
              reviewItems()
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
