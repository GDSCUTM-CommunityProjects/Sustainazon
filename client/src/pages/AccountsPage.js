import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Text,
  Flex,
  Spinner,
  Input,
  FormLabel,
  FormControl,
  Box,
  Icon,
  HStack,
} from "@chakra-ui/react";

import { instance } from "../axios";
import { ItemOrdered } from "../components/ItemOrdered";
import { SAccordionButton } from "../components/SAccordionButton";
import { Field, Form, Formik } from "formik";
import { SButton } from "../components/SButton";
import { loadingStatus } from "../constants";
import CountUp from "react-countup";
import { MdRecycling } from "react-icons/md";

export const AccountsPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isLoadingAccountInfo, setIsLoadingAccountInfo] = useState(true);
  const [accountInfoUpdateStatus, setAccountInfoUpdateStatus] = useState("");
  const [shippingInfoUpdateStatus, setShippingInfoStatus] = useState("");
  const [accountInformation, setAccountInformation] = useState({
    name: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    points: 0,
  });

  const fetchAccountInfo = async () => {
    await instance
      .get("/accounts/manage")
      .then((response) => {
        console.log(response);
        const userData = response.data;
        setAccountInformation({
          ...accountInformation,
          name: userData.name,
          email: userData.email,
          points: userData.totalPoints,
          billingAddress: userData.billingAddress
            ? userData.billingAddress
            : accountInformation.billingAddress,
          shippingAddress: userData.shippingAddress
            ? userData.shippingAddress
            : accountInfoUpdateStatus.shippingAddress,
        });
        setIsLoadingAccountInfo(false);
      })
      .catch(() => {
        console.log("Unable to fetch account information");
      });
  };

  const fetchOrders = async () => {
    await instance
      .get("/buyer/order/all")
      .then((response) => {
        setOrders(response.data.orders);
        setIsLoadingOrders(false);
      })
      .catch(() => {
        console.log("Unable to fetch orders");
      });
  };

  const returnItemHandler = async (orderId) => {
    await instance
      .patch("/buyer/order", { orderId: orderId, status: "RETURN" })
      .then((res) => {
        console.log(res);
        console.log("Item returned");
        fetchOrders();
      })
      .catch(() => {
        console.log("Unable to return item");
      });
  };

  const cancelItemHandler = async (orderId) => {
    await instance
      .patch("/buyer/order", { orderId: orderId, status: "CANCELLED" })
      .then((res) => {
        console.log(res);
        console.log("Order cancelled");
        fetchOrders();
      })
      .catch(() => {
        console.log("Unable to cancel order");
      });
  };

  const toDateTime = (seconds) => {
    // Epoch
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date;
  };

  const itemsOrdered = orders.map((item, id) => {
    console.log(item);
    return (
      <ItemOrdered
        key={id}
        id={item.itemId}
        orderDate={toDateTime(item.orderPlaced._seconds).toLocaleDateString()}
        status={item.status}
        price={item.price}
        imgUrl={item.media.url}
        imgAlt={item.media.alt}
        tag={item.tags[0]}
        itemName={item.itemName}
        lastUpdated={toDateTime(item.lastUpdated._seconds).toLocaleDateString()}
        points={item.potentialPoints}
        quantity={item.quantity}
        returnItemHandler={
          item.status === "DELIVERED"
            ? () => returnItemHandler(item.orderId)
            : () => {}
        }
        cancelOrderHandler={
          item.status === "ORDERED"
            ? () => cancelItemHandler(item.orderId)
            : () => {}
        }
      />
    );
  });

  useEffect(() => {
    fetchOrders();
    fetchAccountInfo();
  }, []);

  return (
    <Flex grow={1} mt={10} flexDirection={"column"}>
      <Text pl={5} mb={4} fontSize={"4xl"} fontWeight={"bold"}>
        My Account
      </Text>
      <HStack ml={6} mb={4}>
        <Icon as={MdRecycling} />
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Points: <CountUp end={accountInformation.points} duration={3} />
        </Text>
      </HStack>
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
              <Box maxWidth={600} ml={10}>
                <Formik
                  initialValues={{
                    name: accountInformation.name,
                    email: accountInformation.email,
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={async (values, actions) => {
                    setAccountInfoUpdateStatus(loadingStatus);
                    const formattedAccountInfo = {};
                    if (values.name !== "") {
                      formattedAccountInfo.name = values.name;
                    }
                    if (values.email !== "") {
                      formattedAccountInfo.email = values.email;
                    }
                    await instance
                      .put("/accounts/manage", formattedAccountInfo)
                      .then(() => {
                        setAccountInfoUpdateStatus("Updated Account Info!");
                      })
                      .catch(() => {
                        setAccountInfoUpdateStatus(
                          "Unable to update account info"
                        );
                      });
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name={"name"}>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor={"name"}>Name</FormLabel>
                            <Input
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Name"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name={"email"}>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor={"email"}>Email</FormLabel>
                            <Input
                              disabled={true}
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Email"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Flex
                        mt={3}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                      >
                        {accountInfoUpdateStatus === loadingStatus ? (
                          <Spinner
                            size={"xs"}
                            thickness={4}
                            speed={"0.5s"}
                            color={"primary.600"}
                          />
                        ) : (
                          <Text fontWeight={"semibold"} fontSize={"lg"}>
                            {accountInfoUpdateStatus}
                          </Text>
                        )}
                        <SButton
                          ml={5}
                          color={"white"}
                          _focus={{ background: "primary.800" }}
                          _active={{ background: "primary.800" }}
                          _hover={{ background: "primary.800" }}
                          background={"footer.100"}
                          text={"Save Changes"}
                          type={"submit"}
                        />
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Box>
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
              <Box maxWidth={600} ml={10}>
                <Formik
                  initialValues={{
                    billingAddress: accountInformation.billingAddress,
                    shippingAddress: accountInformation.shippingAddress,
                  }}
                  onSubmit={async (values, actions) => {
                    setShippingInfoStatus(loadingStatus);
                    const formattedAccountInfo = {};
                    formattedAccountInfo.name = accountInformation.name;
                    if (values.billingAddress !== "") {
                      formattedAccountInfo.billingAddress =
                        values.billingAddress;
                    }
                    if (values.shippingAddress !== "") {
                      formattedAccountInfo.shippingAddress =
                        values.shippingAddress;
                    }

                    await instance
                      .put("/accounts/manage", formattedAccountInfo)
                      .then((response) => {
                        console.log(response);
                        console.log("Mocking the shipping info for now");
                        setShippingInfoStatus("Updated!");
                      })
                      .catch(() => {
                        setShippingInfoStatus(
                          "Unable to update shipping details"
                        );
                      });
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name={"billingAddress"}>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor={"billingAddress"}>
                              Billing Address
                            </FormLabel>
                            <Input
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Billing Address"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name={"shippingAddress"}>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor={"shippingAddress"}>
                              Shipping Address
                            </FormLabel>
                            <Input
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Shipping Address"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Flex
                        mt={3}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                      >
                        {shippingInfoUpdateStatus === loadingStatus ? (
                          <Spinner
                            size={"xs"}
                            thickness={4}
                            speed={"0.5s"}
                            color={"primary.600"}
                          />
                        ) : (
                          <Text fontWeight={"semibold"} fontSize={"lg"}>
                            {shippingInfoUpdateStatus}
                          </Text>
                        )}
                        <SButton
                          ml={5}
                          color={"white"}
                          _focus={{ background: "primary.800" }}
                          _active={{ background: "primary.800" }}
                          _hover={{ background: "primary.800" }}
                          background={"footer.100"}
                          text={"Save Changes"}
                          type={"submit"}
                        />
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
