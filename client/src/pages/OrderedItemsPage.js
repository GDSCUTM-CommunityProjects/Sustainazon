import React, { useEffect } from "react";
import { instance } from "../axios";

export const OrderedItemsPage = () => {
  useEffect(() => {
    const fetchSellerOrders = () => {
      instance
        .get("/seller/order/all")
        .then((res) => {
          console.log("Fetched all seller ordered items");
          console.log(res);
        })
        .catch(() => {
          console.log("Unable to fetch seller orders");
        });
    };
    fetchSellerOrders();
  }, []);
  return <>Hi</>;
};
