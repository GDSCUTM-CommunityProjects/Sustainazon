import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Flex,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { instance } from "../axios";
import { tmpOrderData, tmpAccountData } from "../tmp/tmpSearchData";
import { ItemOrdered } from "../components/ItemOrdered";
import { SAccordionButton } from "../components/SAccordionButton";

export const AccountsPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePassword, setUpdatedPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [accountInformation, setAccountInformation] = useState({
    name: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const itemsOrdered = orders.map((item, id) => {
    return (
      <ItemOrdered
        key={id}
        id={item.id}
        orderDate={item.orderDate}
        status={item.status}
        price={item.price}
        imgUrl={item.imgUrl}
        imgAlt={item.imgAlt}
        tag={item.tag}
        itemName={item.itemName}
      />
    );
  });
  useEffect(() => {
    const fetchOrders = async () => {
      await instance
        .get("/GETORDERS")
        .then(() => {
          console.log("Replace with actual data later");
        })
        .catch(() => {
          console.log("Mocking ordered data");
          setOrders(tmpOrderData);
          setIsLoading(false);
        });
    };

    const fetchAccountInfo = async () => {
      await instance
        .get("/ACCOUNTINFO")
        .then(() => {
          console.log("Replace with actual data later");
        })
        .catch(() => {
          console.log("Mocking Account Info Data");
          setAccountInformation(accountInformation);
          setIsLoading(false);
        });
    };

    fetchOrders();
    fetchAccountInfo();
  }, [accountInformation]);

  console.log(orders);
  console.log(accountInformation);

  return (
    <Flex grow={1} mt={10} flexDirection={"column"}>
      <Text pl={5} mb={4} fontSize={"4xl"} fontWeight={"bold"}>
        My Account
      </Text>
      <Accordion allowToggle={true} w={"100%"}>
        <AccordionItem>
          <SAccordionButton text={"Orders"} />
          <AccordionPanel pb={4}>
            {isLoading ? (
              <Spinner
                size={"xl"}
                thickness={4}
                speed={"0.5s"}
                color={"primary.600"}
              />
            ) : (
              itemsOrdered
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <SAccordionButton text={"Login Information"} />
          <AccordionPanel pb={4}>LOGIN INFORMATION</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <SAccordionButton text={"Shipping Details"} />
          <AccordionPanel pb={4}>ALL YOUR ORDERS</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
