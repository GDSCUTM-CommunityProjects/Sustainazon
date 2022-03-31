import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Divider,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import { useDispatch, useSelector } from "react-redux";
import { SButton } from "../components/SButton";
import Cookies from "universal-cookie";
import { instance } from "../axios";
import {
  fetchShoppingCartItems,
  removeShoppingCartItem,
} from "../reducers/shoppingCartSlice";

export const ShoppingCartPage = () => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("auth") === "true";
  const shoppingCartData = useSelector((state) => state.shoppingCart.items);
  const [shoppingCartItemCards, setShoppingCartItemCards] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [checkoutError, setCheckoutError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
  const [timer, setTimer] = useState(null);

  const filterShoppingCartData = () => {
    return shoppingCartData.map((item) => {
      return {
        itemId: item.itemId,
        quantity: item.quantity,
        usePoints: item.usePoints,
      };
    });
  };

  const checkoutHandler = async () => {
    const items = filterShoppingCartData();
    if (items.length > 0) {
      setIsLoading(true);
      setCheckoutError("");
      await instance
        .post("/buyer/order", { items: items })
        .then(() => {
          console.log("Successfully purchased items");
          // Loop through all items and remove shopping cart item
          for (let i = 0; i < items.length; i++) {
            dispatch(removeShoppingCartItem(items[i]));
          }
          setIsPurchaseSuccessful(true);
          setTimer(
            setTimeout(() => {
              setIsPurchaseSuccessful(false);
            }, 3000)
          );
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message !== undefined) {
              setCheckoutError(
                `Unable to make purchase. ${err.response.data.message}`
              );
            } else {
              setCheckoutError("Unable to make purchase");
            }
          } else {
            setCheckoutError("Unable to make purchase");
          }
        });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchShoppingCartItemData = async () => {
      let newSubtotal = 0;
      const allItemData = shoppingCartData.map((item, id) => {
        newSubtotal += item.price * item.quantity;
        return (
          <ShoppingCartItem
            key={id}
            id={item.itemId}
            quantity={item.quantity}
            imgSrc={item.media.url}
            imgAlt={item.media.alt}
            itemName={item.itemName}
            points={item.potentialPoints}
            price={item.price}
            companyName={item.sellerName}
            usePoints={item.usePoints}
            pointsPrice={item.pointsPrice}
          />
        );
      });
      if (isLoggedIn) {
        setSubtotal(newSubtotal);
        return allItemData;
      }
    };
    fetchShoppingCartItemData().then((data) => setShoppingCartItemCards(data));
    return () => {
      clearTimeout(timer);
    };
  }, [shoppingCartData]);

  return (
    <Flex grow={1} mt={6} flexDirection={"column"} ml={10} px={20}>
      <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
        Shopping Cart
      </Text>
      {isLoggedIn ? (
        <>
          {shoppingCartItemCards}
          <Divider
            borderColor={"gray.600"}
            size={"lg"}
            variant={"solid"}
            orientation={"horizontal"}
            mt={5}
          />
          <Flex my={2} justifyContent={"flex-end"}>
            <Flex flexDirection={"column"}>
              <Text fontSize={"2xl"} fontWeight={"semibold"} mr={20}>
                Subtotal: $ {subtotal.toFixed(2)}
              </Text>
              <SButton
                maxW={200}
                text={
                  isLoading ? (
                    <Spinner
                      size={"md"}
                      thickness={2}
                      speed={"0.5s"}
                      color={"primary.600"}
                    />
                  ) : (
                    "Checkout"
                  )
                }
                mr={5}
                onClick={() => checkoutHandler()}
              />
            </Flex>
          </Flex>
          {checkoutError !== "" ? (
            <Alert rounded={"lg"} mb={3} width={"100%"} status={"error"}>
              <AlertIcon />
              {checkoutError}
            </Alert>
          ) : (
            <></>
          )}
          {isPurchaseSuccessful ? (
            <Alert rounded={"lg"} mb={3} width={"100%"} status={"success"}>
              <AlertIcon />
              Purchase Successful!
            </Alert>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Oops! You need to login to add products to your cart
        </Text>
      )}
    </Flex>
  );
};
