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
import { fetchShoppingCartItems } from "../reducers/shoppingCartSlice";

export const ShoppingCartPage = () => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("auth") === "true";
  const shoppingCartData = useSelector((state) => state.shoppingCart.items);
  const [shoppingCartItemCards, setShoppingCartItemCards] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [checkoutError, setCheckoutError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
    setIsLoading(true);
    setCheckoutError("");
    console.log(filterShoppingCartData());
    await instance
      .post("/buyer/order", filterShoppingCartData())
      .then(() => {
        console.log("Successfully purchased items");
        dispatch(fetchShoppingCartItems());
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.message !== undefined) {
            setCheckoutError(err.response.message);
          } else {
            setCheckoutError("Unable to make purchase");
          }
        } else {
          setCheckoutError("Unable to make purchase");
        }
      });
    setIsLoading(false);
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
            usePoints={true}
          />
        );
      });
      if (isLoggedIn) {
        setSubtotal(newSubtotal);
        return allItemData;
      }
    };
    fetchShoppingCartItemData().then((data) => setShoppingCartItemCards(data));
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
        </>
      ) : (
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Oops! You need to login to add products to your cart
        </Text>
      )}
    </Flex>
  );
};
