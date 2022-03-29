import React, { useEffect, useState } from "react";
import { instance } from "../axios";
import { Flex, Text } from "@chakra-ui/react";
import { OrderedItem } from "../components/OrderedItem";

export const OrderedItemsPage = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const fetchSellerOrders = async () => {
    await instance
      .get("/seller/order/all")
      .then((res) => {
        console.log("Fetched all seller ordered items");
        console.log(res.data.orders);
        setOrderedItems(res.data.orders);
      })
      .catch(() => {
        console.log("Unable to fetch seller orders");
      });
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const toDateTime = (seconds) => {
    // Epoch
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date;
  };

  const updateOrderedItemStatusHandler = async (orderId, status) => {
    console.log({ orderId: orderId, status: status });
    await instance
      .patch("/seller/order", { orderId: orderId, status: status })
      .then(() => {
        console.log("Updated ordered item status");
        fetchSellerOrders();
      })
      .catch(() => {
        console.log("Unable to update ordered item status");
      });
  };

  const orderedItemCards = orderedItems.map((item, id) => {
    return (
      <OrderedItem
        key={id}
        lastUpdated={toDateTime(item.lastUpdated._seconds).toLocaleDateString()}
        orderDate={toDateTime(item.orderPlaced._seconds).toLocaleDateString()}
        orderId={item.itemId}
        imgUrl={item.media.url}
        imgAlt={item.media.alt}
        itemName={item.itemName}
        status={item.status}
        quantity={item.quantity}
        price={item.price}
        updateOrderedItemStatusHandler={updateOrderedItemStatusHandler}
      />
    );
  });

  return (
    <Flex mt={10} direction={"column"} ml={10}>
      <Text pl={5} mb={2} fontSize={"4xl"} fontWeight={"bold"}>
        Customer ordered items
      </Text>
      {orderedItemCards}
    </Flex>
  );
};
