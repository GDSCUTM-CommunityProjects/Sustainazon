import React, { useEffect, useState } from "react";
import { Flex, Text, Stack, Divider } from "@chakra-ui/react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import { useSelector } from "react-redux";
import { instance } from "../axios";
import {
  tmpShoppingCartData,
  tmpShoppingCartItemData,
} from "../tmp/tmpSearchData";
import { SButton } from "../components/SButton";

export const ShoppingCartPage = () => {
  const shoppingCartData = useSelector((state) => state.shoppingCart.items);
  const [shoppingCartItemCards, setShoppingCartItemCards] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchShoppingCartItemData = async () => {
      let newSubtotal = 0;
      const allItemData = await Promise.all(
        shoppingCartData.map(async (item, id) => {
          await instance
            .get(`/FETCH ITEM BY ID ${item.id}`)
            .then(() => {
              console.log("Fetched item data");
            })
            .catch(() => {
              console.log("Mocking data for item");
            });
          newSubtotal += tmpShoppingCartItemData.price * item.quantity;
          return (
            <ShoppingCartItem
              key={id}
              id={item.id}
              quantity={item.quantity}
              imgSrc={tmpShoppingCartItemData.imgSrc}
              imgAlt={tmpShoppingCartItemData.imgAlt}
              itemName={tmpShoppingCartItemData.itemName}
              points={tmpShoppingCartItemData.points}
              price={tmpShoppingCartItemData.price}
              companyName={tmpShoppingCartItemData.companyName}
            />
          );
        })
      );
      setSubtotal(newSubtotal);
      return allItemData;
    };
    fetchShoppingCartItemData().then((data) => setShoppingCartItemCards(data));
  }, [shoppingCartData]);

  console.log("Shopping Card Item Cards:", shoppingCartItemCards.length);

  return (
    <Flex grow={1} mt={6} flexDirection={"column"} ml={10} px={20}>
      <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
        Shopping Cart
      </Text>
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
    </Flex>
  );
};
