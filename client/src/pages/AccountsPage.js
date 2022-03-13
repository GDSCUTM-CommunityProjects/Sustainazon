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
  FormErrorMessage,
  Box,
  Button,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { instance } from "../axios";
import { tmpOrderData, tmpAccountData } from "../tmp/tmpSearchData";
import { ItemOrdered } from "../components/ItemOrdered";
import { SAccordionButton } from "../components/SAccordionButton";
import { Field, Form, Formik } from "formik";
import { SButton } from "../components/SButton";
import { loadingStatus } from "../constants";

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
  });

  const validatePassword = (value, p) => {
    return p.values.password !== value ? "Passwords must be matching" : "";
  };

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
                    if (values.password !== "") {
                      formattedAccountInfo.password = values.password;
                    }
                    await instance
                      .post("/UPDATEINFO", formattedAccountInfo)
                      .then(() => {
                        console.log("Mocking the account update for now");
                      })
                      .catch(() => {
                        setAccountInfoUpdateStatus("Updated Account Info!");
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
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Email"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name={"password"}>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor={"password"}>Password</FormLabel>
                            <Input
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Password"}
                              mb={3}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name={"confirmPassword"}
                        validate={(value) => validatePassword(value, props)}
                      >
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.confirmPassword}>
                            <FormLabel htmlFor={"confirmPassword"}>
                              Confirm Password
                            </FormLabel>
                            <Input
                              focusBorderColor={"secondary.300"}
                              {...field}
                              placeholder={"Confirm Password"}
                              mb={3}
                            />
                            <FormErrorMessage>
                              {form.errors.confirmPassword}
                            </FormErrorMessage>
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
                    if (values.billingAddress !== "") {
                      formattedAccountInfo.billingAddress =
                        values.billingAddress;
                    }
                    if (values.shippingAddress !== "") {
                      formattedAccountInfo.shippingAddress =
                        values.shippingAddress;
                    }
                    await instance
                      .post("/UPDATESHIPPING", formattedAccountInfo)
                      .then(() => {
                        console.log("Mocking the shipping info for now");
                      })
                      .catch(() => {
                        setShippingInfoStatus("Updated!");
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
