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
      temp["imgUrls"] = temp["imgUrls"][0];
      temp["imgAlts"] = temp["imgAlts"][0];
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
    const userRef = db.collection(BUYER_COLLECTION).doc(uid);
    const itemRef = db.collection(ITEM_COLLECTION).doc(itemId);
    await db.runTransaction(async (t) => {
      const user = await t.get(userRef);
      t.update(itemRef, {
        comments: admin.firestore.FieldValue.arrayUnion({
          timestamp: new Date(),
          comment,
          name: user.data().name,
          stars: star,
        }),
        totalStars: admin.firestore.FieldValue.increment(star),
        totalReviews: admin.firestore.FieldValue.increment(1),
      });
    });
    return new Response(200, "review added");
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { getItem, getItemAll, rateItem };
