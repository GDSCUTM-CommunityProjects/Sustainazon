const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  BUYER_COLLECTION,
  admin,
} = require("../firebase");
const { Response, errorHandler } = require("../response");
const { filterData } = require("./filter");

async function getItem(itemId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    }
    const data = doc.data();
    return new Response(200, data);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getItemAll(strPage, search, filter) {
  try {
    const page = parseInt(strPage);
    const data = await filterData(page, search, filter);
    let newPage;
    if (data.length < PAGINATION_LIMIT) {
      newPage = -1;
    } else {
      newPage = page + 1;
    }

    const items = [];
    const itemsAdded = [];
    data.forEach((item) => {
      const temp = item.data();
      delete temp["sellerId"];
      delete temp["description"];
      delete temp["inventory"];
      if (temp.hasOwnProperty("comments")) delete temp["comments"];
      temp["media"] =
        temp.hasOwnProperty("media") && temp["media"].length > 0
          ? temp["media"][0]
          : { url: "none", alt: "No image" };
      if (!itemsAdded.includes(item.id)) {
        items.push({ ...temp, itemId: item.id });
        itemsAdded.push(item.id);
      }
    });

    return new Response(200, {
      items,
      page: newPage,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function rateItem(itemId, uid, comment, star) {
  try {
    if (star > 5)
      return new Response(400, {
        message: "star rating should be less than 5",
      });
    const user = await db.collection(BUYER_COLLECTION).doc(uid).get();
    await db
      .collection(ITEM_COLLECTION)
      .doc(itemId)
      .update({
        comments: admin.firestore.FieldValue.arrayUnion({
          timestamp: new Date(),
          comment,
          name: user.data().name,
          stars: star,
        }),
        totalStars: admin.firestore.FieldValue.increment(star),
        totalReviews: admin.firestore.FieldValue.increment(1),
      });
    return new Response(200, { message: "review added" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function addItemToCart(itemId, uid, quantity) {
  try {
    const item = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!item.exists) {
      return new Response(404, { message: "item does not exist" });
    }
    if (quantity > item.data().inventory)
      return new Response(400, {
        message: "quantity higher than the number of items available",
      });
    await db
      .collection(BUYER_COLLECTION)
      .doc(uid)
      .update({
        cart: admin.firestore.FieldValue.arrayUnion({ itemId, quantity }),
      });
    return new Response(200, { message: "item added to cart" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getCart(uid) {
  try {
    const user = await db.collection(BUYER_COLLECTION).doc(uid).get();
    const promises = [];
    user.data().cart.forEach((item) => {
      promises.push(
        db
          .collection(ITEM_COLLECTION)
          .doc(item.itemId)
          .get()
          .then((data) => {
            const temp = data.data();
            delete temp["sellerId"];
            delete temp["description"];
            delete temp["inventory"];
            if (temp.hasOwnProperty("comments")) delete temp["comments"];
            temp["media"] =
              temp.hasOwnProperty("media") && temp["media"].length > 0
                ? temp["media"][0]
                : { url: "none", alt: "No image" };
            return { ...temp, itemId: item.itemId, quantity: item.quantity };
          })
      );
    });
    const result = await Promise.all(promises);
    return new Response(200, { cart: result });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function deleteItemFromCart(itemId, uid, quantity) {
  try {
    const item = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!item.exists) {
      return new Response(404, { message: "item does not exist" });
    }
    const data = await db
      .collection(BUYER_COLLECTION)
      .doc(uid)
      .update({
        cart: admin.firestore.FieldValue.arrayRemove({ itemId, quantity }),
      });
    return new Response(200, { message: "item deleted" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

module.exports = {
  getItem,
  getItemAll,
  rateItem,
  addItemToCart,
  getCart,
  deleteItemFromCart,
};
