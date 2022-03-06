const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  BUYER_COLLECTION,
  admin,
} = require("../firebase");
const Response = require("../responseModel");

async function getItem(itemId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    }
    const data = doc.data();
    return new Response(200, data);
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getItemAll(strPage) {
  try {
    const page = parseInt(strPage);

    const data = await db
      .collection(ITEM_COLLECTION)
      .offset(page * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT)
      .get();

    let newPage;
    if (data.docs.length < PAGINATION_LIMIT) {
      newPage = -1;
    } else {
      newPage = page + 1;
    }

    const items = [];
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
      items.push({ ...temp, id: item.id });
    });
    return new Response(200, {
      items,
      page: newPage,
    });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function rateItem(itemId, uid, comment, star) {
  try {
    const user = await db.collection(BUYER_COLLECTION).doc(uid).get();
    await db
      .collection(ITEM_COLLECTION)
      .doc(itemId)
      .update({
        comments: admin.firestore.FieldValue.arrayUnion([
          {
            timestamp: new Date(),
            comment,
            name: user.data().name,
            stars: star,
          },
        ]),
        totalStars: admin.firestore.FieldValue.increment(star),
        totalReviews: admin.firestore.FieldValue.increment(1),
      });
    return new Response(200, "review added");
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function addItemToCart(itemId, uid) {
  try {
    const item = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!item.exists) {
      return new Response(404, { message: "item does not exist" });
    }
    await db
      .collection(BUYER_COLLECTION)
      .doc(uid)
      .update({
        cart: admin.firestore.FieldValue.arrayUnion([itemId]),
      });
    return new Response(200, "item added to cart");
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getCart(uid) {
  try {
    const user = await db.collection(BUYER_COLLECTION).doc(uid).get();
    const promises = [];
    user.data().cart.forEach((itemId) => {
      promises.push(
        db
          .collection(ITEM_COLLECTION)
          .doc(itemId)
          .get()
          .then((data) => {
            const temp = data.data();
            delete temp["sellerId"];
            delete temp["description"];
            delete temp["inventory"];
            if (temp.hasOwnProperty("comments")) delete temp["comments"];
            temp["imgUrls"] = temp["imgUrls"][0];
            temp["imgAlts"] = temp["imgAlts"][0];
            return { ...temp, id: itemId };
          })
      );
    });
    const result = await Promise.all(promises);
    return new Response(200, { cart: result });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { getItem, getItemAll, rateItem, addItemToCart, getCart };
