import React, { useEffect, useState } from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import { useSelector } from "react-redux";
import { SButton } from "../components/SButton";
import Cookies from "universal-cookie";

export const ShoppingCartPage = () => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("auth") === "true";
  const shoppingCartData = useSelector((state) => state.shoppingCart.items);
  const [shoppingCartItemCards, setShoppingCartItemCards] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

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
              <SButton maxW={200} text={"Checkout"} mr={5} />
            </Flex>
          </Flex>
        </>
      ) : (
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Oops! You need to login to add products to your cart
        </Text>
      )}
    </Flex>
  );
};
