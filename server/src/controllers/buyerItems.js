const { db, ITEM_COLLECTION, PAGINATION_LIMIT } = require("../firebase");
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

module.exports = { getItem, getItemAll };
