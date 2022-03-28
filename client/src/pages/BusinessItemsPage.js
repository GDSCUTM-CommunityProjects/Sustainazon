import React, { useState, useEffect } from "react";
import { instance } from "../axios";

export const BusinessItemsPage = () => {
  const [itemsSelling, setItemsSelling] = useState([]);

  useEffect(() => {
    const fetchItemsSelling = async () => {
      await instance
        .get("/seller/item/all?page=1")
        .then((res) => {
          console.log("Fetched items selling");
          console.log(res);
        })
        .catch(() => {
          console.log("Unable to fetch items selling");
        });
    };
    fetchItemsSelling();
  }, [itemsSelling]);

  return <div>Hi</div>;
};
