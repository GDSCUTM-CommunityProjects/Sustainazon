const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  ADMIN_COLLECTION,
  ITEM_ADMIN_DOC,
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
    let promise = [];
    promise.push(
      db
        .collection(ITEM_COLLECTION)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get()
    );
    promise.push(db.collection(ADMIN_COLLECTION).doc(ITEM_ADMIN_DOC).get());
    const result = await Promise.all(promise);

    let newPage;
    if (result[0].docs.length < PAGINATION_LIMIT) {
      newPage = -1;
    } else {
      newPage = page + 1;
    }

    const items = [];
    result[0].forEach((item) => {
      const temp = item.data();
      delete temp["sellerId"];
      delete temp["description"];
      delete temp["inventory"];
      items.push({ ...temp, id: item.id });
    });
    return new Response(200, {
      items,
      page: newPage,
      totalItems: result[1].data().totalItemCount,
    });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { getItem, getItemAll };
