const { db, ITEM_COLLECTION, PAGINATION_LIMIT } = require("../firebase");
const upload = require("../firebaseMulter");
const Response = require("../responseModel");

async function addItem(item, sellerId) {
  try {
    // TODO: Add sustainability attributes
    await db.collection(ITEM_COLLECTION).add({ ...item, sellerId });
    return new Response(200, { message: "Created" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function updateItem(item, itemId, sellerId) {
  try {
    // TODO: Add sustainability attributes
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(sellerId) !== 0)
        return new Response(403, { message: "Item not owned by user" });
    }
    await db.collection(ITEM_COLLECTION).doc(itemId).update(item);
    return new Response(200, { message: "Updated" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function itemImgUpload(req, res) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(req.query.itemId).get();
    if (!doc.exists) {
      return res.status(404).send({ message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(req.uid) !== 0)
        return res.status(403).send({ message: "Item not owned by user" });
    }

    req.uid = `${req.uid}/${req.query.itemId}`;
    upload.array("imgs", 10)(req, res, function (err) {
      if (err) throw err;
      const imgUrls = req.files.map((file) => file.url);
      const imgAlts = req.files.map((file) => file.alt);
      db.collection(ITEM_COLLECTION)
        .doc(req.query.itemId)
        .update({ imgUrls, imgAlts })
        .then(() => {
          return res.status(201).send({ uploaded: req.files });
        });
    });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return res.status(400).send({ message });
  }
}

async function getItem(itemId, sellerId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(sellerId) !== 0)
        return new Response(403, { message: "Item not owned by user" });
      return new Response(200, data);
    }
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function deleteItem(itemId, sellerId) {
  try {
    // TODO: Add sustainability attributes
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(sellerId) !== 0)
        return new Response(403, { message: "Item not owned by user" });
    }
    await db.collection(ITEM_COLLECTION).doc(itemId).delete();
    return new Response(200, { message: "Deleted" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getItemAll(sellerId, strPage) {
  try {
    const page = parseInt(strPage);

    const data = await db
      .collection(ITEM_COLLECTION)
      .where("sellerId", "==", sellerId)
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
    return new Response(200, { items, page: newPage });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = {
  updateItem,
  addItem,
  deleteItem,
  getItem,
  getItemAll,
  itemImgUpload,
};
