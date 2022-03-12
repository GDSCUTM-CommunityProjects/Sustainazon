import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Text,
  Flex,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { instance } from "../axios";
import { tmpOrderData, tmpAccountData } from "../tmp/tmpSearchData";
import { ItemOrdered } from "../components/ItemOrdered";
import { SAccordionButton } from "../components/SAccordionButton";
import { AccountInformation } from "../components/AccountInformation";

export const AccountsPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isLoadingAccountInfo, setIsLoadingAccountInfo] = useState(true);
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
          setIsLoadingOrders(false);
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
          setAccountInformation(tmpAccountData);
          setIsLoadingAccountInfo(false);
        });
    };

    fetchOrders();
    fetchAccountInfo();
  }, []);

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
            {isLoadingOrders ? (
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
          <AccordionPanel pb={4}>
            {isLoadingAccountInfo ? (
              <Spinner
                size={"xl"}
                thickness={4}
                speed={"0.5s"}
                color={"primary.600"}
              />
            ) : (
              <AccountInformation accountInfo={accountInformation} />
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <SAccordionButton text={"Shipping Details"} />
          <AccordionPanel pb={4}>
            {isLoadingAccountInfo ? (
              <Spinner
                size={"xl"}
                thickness={4}
                speed={"0.5s"}
                color={"primary.600"}
              />
            ) : (
              <>
                <Input
                  placeholder={"Billing Address"}
                  value={accountInformation.billingAddress}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <Input
                  placeholder={"Shipping Address"}
                  value={accountInformation.shippingAddress}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
