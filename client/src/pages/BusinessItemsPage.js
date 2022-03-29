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
  const [addNewItem, setAddNewItem] = useState(true);
  const [currentItemId, setCurrentItemId] = useState("");
  const [itemDescription, setItemDescription] = useState({
    itemName: "",
    description: "",
    price: "",
    inventory: "",
    tags: [],
    categories: [],
  });

  const registerProductHandler = async (event, itemDescription, image) => {
    setErrorMessage("");
    setIsLoading(true);
    if (addNewItem) {
      event.preventDefault();
      console.log("Item Desc:", itemDescription);
      console.log("Image:", image);
      await instance
        .post("/seller/item", {
          ...itemDescription,
          price: parseInt(itemDescription.price),
          inventory: parseInt(itemDescription.inventory),
        })
        .then(async (res) => {
          const formData = new FormData();
          console.log("Added new product");
          console.log("Uploading image");
          formData.append("imgs", image);
          console.log("FormData", formData);
          await instance
            .post(`/seller/item/upload?itemId=${res.data.itemId}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              onClose();
              console.log(res);
              console.log("Uploaded image");
              fetchItemsSelling();
            })
            .catch(() => {
              console.log("Unable to upload image");
            });
          setIsLoading(false);
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
        });
    } else {
      console.log(image);
      // Update item here
      console.log("Updating item");
      await instance
        .put("/seller/item", {
          ...itemDescription,
          price: parseInt(itemDescription.price),
          inventory: parseInt(itemDescription.inventory),
          itemId: currentItemId,
        })
        .then(async (res) => {
          console.log("Updated item");
          setIsLoading(false);
          const formData = new FormData();
          console.log("Added new product");
          console.log("Uploading image");
          console.log(image);
          if (image !== null) {
            formData.append("imgs", image);
            console.log("FormData", formData);
            await instance
              .post(`/seller/item/upload?itemId=${res.data.itemId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                console.log(res);
                console.log("Uploaded image");
              })
              .catch(() => {
                console.log("Unable to upload image");
              });
          }
          fetchItemsSelling();
          onClose();
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
          if (
            e.response.data.message === "" ||
            e.response.data.message === undefined
          ) {
            setErrorMessage("Unable to update product description");
          } else {
            setErrorMessage(e.response.data.message);
          }
        });
    }
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

  const fetchEditItem = async (itemId) => {
    await instance
      .get(`/seller/item?itemId=${itemId}`)
      .then((res) => {
        console.log("Fetched item data");
        const fetchEditItemData = res.data;
        setItemDescription({
          itemName: fetchEditItemData.itemName,
          description: fetchEditItemData.description,
          price: `${fetchEditItemData.price}`,
          inventory: `${fetchEditItemData.inventory}`,
          tags: fetchEditItemData.tags,
          categories: fetchEditItemData.categories,
        });
      })
      .catch(() => {
        console.log("Unable to fetch item data");
      });
    setCurrentItemId(itemId);
    setAddNewItem(false);
    onOpen();
  };

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
        editItemSellingHandler={fetchEditItem}
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
              itemDescription={itemDescription}
              setItemDescription={setItemDescription}
              actionButtonText={
                addNewItem ? "Add New Product" : "Update Product"
              }
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
      <Text pl={5} mb={2} fontSize={"4xl"} fontWeight={"bold"}>
        Items you&apos;re selling
      </Text>
      <SButton
        ml={5}
        mb={2}
        onClick={() => {
          setItemDescription({
            itemName: "",
            description: "",
            price: "",
            inventory: "",
            tags: [],
            categories: [],
          });
          setAddNewItem(true);
          onOpen();
        }}
        text={"Add New Product"}
      />
      {itemsSold}
    </Flex>
  );
};
