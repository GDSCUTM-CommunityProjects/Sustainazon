const { admin, db, ITEM_COLLECTION } = require("../firebase");
const Response = require("../responseModel");

async function addItem(item) {
  try {
    await db.collection(ITEM_COLLECTION).add({ ...item, sellerId: req.uid });
    return new Response(200, { message: "Created" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function updateItem(item, itemId) {
  try {
    // TODO: Add sustainability attributes
    const { name, price, description, inventory } = item;
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (!data.sellerId.localeCompare(req.uid))
        return new Response(403, { message: "Item not owned by user" });
    }
    await db
      .collection(ITEM_COLLECTION)
      .doc(itemId)
      .update({ name, price, description, inventory });
    return new Response(200, { message: "Updated" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getItem(itemId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (!data.sellerId.localeCompare(req.uid))
        return new Response(403, { message: "Item not owned by user" });
      return new Response(200, data);
    }
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function deleteItem(itemId) {
  try {
    // TODO: Add sustainability attributes
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (!data.sellerId.localeCompare(req.uid))
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

module.exports = { updateItem, addItem, deleteItem, getItem };
