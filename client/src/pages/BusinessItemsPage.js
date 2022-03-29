import React, { useState, useEffect, useRef } from "react";
import { instance } from "../axios";
import { ItemSold } from "../components/ItemSold";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import RegisterCardForProducts from "../components/RegisterCardForProducts";
import { SButton } from "../components/SButton";

export const BusinessItemsPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [itemsSelling, setItemsSelling] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const registerProductHandler = async (event, itemDescription, image, id) => {
    event.preventDefault();
    console.log("Item Desc:", itemDescription);
    console.log("Image:", image);
    console.log("Id:", id);
    setErrorMessage("");
    setIsLoading(true);
    await instance
      .post("/seller/item", {
        ...itemDescription,
        price: parseInt(itemDescription.price),
        inventory: parseInt(itemDescription.inventory),
      })
      .then(async (res) => {
        // Fetching new items (Should move under image upload once that's fixed)
        setIsLoading(false);
        fetchItemsSelling();
        onClose();
        const formData = new FormData();
        console.log("Added new product");
        console.log("Uploading image");
        formData.append("name", res.data.itemId);
        formData.append("file", image);
        console.log(formData);
        await instance
          .post(
            `/seller/item/upload?itemId=${res.data.itemId}`,
            { formData },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            console.log(res);
            console.log("Uploaded image");
          })
          .catch(() => {
            console.log("Unable to upload image");
          });
      })
      .catch((e) => {
        setIsLoading(false);
        if (
          e.response.data.message === "" ||
          e.response.data.message === undefined
        ) {
          setErrorMessage("Unable to register product");
        } else {
          setErrorMessage(e.response.data.message);
        }
        console.log("Unable to register product");
      });
  };

  const fetchItemsSelling = async () => {
    await instance
      .get("/seller/item/all")
      .then((res) => {
        console.log("Fetched items selling");
        console.log(res);
        setItemsSelling(res.data.items);
      })
      .catch(() => {
        console.log("Unable to fetch items selling");
      });
  };

  const deleteItemSellingHandler = async (itemId) => {
    console.log("ItemId", itemId);
    await instance
      .delete(`/seller/item?itemId=${itemId}`)
      .then(() => {
        console.log("Removed Item");
        fetchItemsSelling();
      })
      .catch(() => {
        console.log("Unable to remove selling item");
      });
  };

  useEffect(() => {
    fetchItemsSelling();
  }, []);

  const itemsSold = itemsSelling.map((item, id) => {
    return (
      <ItemSold
        key={id}
        id={item.itemId}
        inventory={item.inventory}
        imgUrl={item.media.url}
        imgAlt={item.media.alt}
        itemName={item.itemName}
        price={item.price}
        deleteItemSellingHandler={deleteItemSellingHandler}
      />
    );
  });

  return (
    <Flex mt={10} direction={"column"} ml={10}>
      <Modal isOpen={isOpen} size={"4xl"} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RegisterCardForProducts
              isLoading={isLoading}
              registerProductHandler={registerProductHandler}
            />
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            {errorMessage !== "" ? (
              <Alert rounded={"lg"} width={"100%"} status={"error"}>
                <AlertIcon />
                {errorMessage}
              </Alert>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text pl={5} mb={4} fontSize={"4xl"} fontWeight={"bold"}>
        Items you&apos;re selling
      </Text>
      <SButton ml={5} onClick={onOpen} text={"Add New Product"} />
      {itemsSold}
    </Flex>
  );
};
