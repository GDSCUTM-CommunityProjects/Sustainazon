import React, { useEffect, useState } from "react";
import { Flex, Text, Stack, Divider } from "@chakra-ui/react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import { useSelector } from "react-redux";
import { instance } from "../axios";
import {
  tmpShoppingCartData,
  tmpShoppingCartItemData,
} from "../tmp/tmpSearchData";

export const ShoppingCartPage = () => {
  const shoppingCartData = useSelector((state) => state.shoppingCart.items);
  const [shoppingCartItemCards, setShoppingCartItemCards] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchShoppingCartItemData = async () => {
      return await Promise.all(
        shoppingCartData.map(async (item, id) => {
          await instance
            .get(`/FETCH ITEM BY ID ${item.id}`)
            .then(() => {
              console.log("Fetched item data");
            })
            .catch(() => {
              console.log("Mocking data for item");
              setSubtotal(
                subtotal + tmpShoppingCartItemData.cost * item.quantity
              );
            });
          return (
            <ShoppingCartItem
              key={id}
              id={item.id}
              quantity={item.quantity}
              imgSrc={tmpShoppingCartItemData.imgSrc}
              imgAlt={tmpShoppingCartItemData.imgAlt}
              itemName={tmpShoppingCartItemData.itemName}
              points={tmpShoppingCartItemData.points}
              cost={tmpShoppingCartItemData.cost}
            />
          );
        })
      );
    };
    fetchShoppingCartItemData().then((data) => setShoppingCartItemCards(data));
  }, [shoppingCartData]);

  console.log("Shopping Card Item Cards:", shoppingCartItemCards.length);

  return (
    <Flex grow={1} mt={6} flexDirection={"column"} alignItems={"center"}>
      <Stack>
        <Text fontSize={"3xl"} mb={6} fontWeight={"bold"}>
          Cart
        </Text>
        {shoppingCartItemCards}
        <Divider size={"lg"} variant={"solid"} orientation={"horizontal"} />
        <Text>Subtotal: $ {subtotal}</Text>
      </Stack>
    </Flex>
  );
};
