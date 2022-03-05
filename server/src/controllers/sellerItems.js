const {
  db,
  ITEM_COLLECTION,
  admin,
  ADMIN_COLLECTION,
  ITEM_ADMIN_DOC,
} = require("../firebase");
const Response = require("../responseModel");

async function addItem(item, sellerId) {
  try {
    const newItemRef = db.collection(ITEM_COLLECTION).doc();
    const adminItemCount = db.collection(ADMIN_COLLECTION).doc(ITEM_ADMIN_DOC);
    // TODO: Add sustainability attributes
    await db.runTransaction(async (t) => {
      const itemDoc = await t.get(adminItemCount);
      if (itemDoc.exists)
        t.update(adminItemCount, {
          totalItemCount: admin.firestore.FieldValue.increment(1),
        });
      else
        t.set(adminItemCount, {
          totalItemCount: 1,
        });
      t.create(newItemRef, { ...item, sellerId });
    });
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
    const itemDoc = db.collection(ITEM_COLLECTION).doc(itemId);
    const adminItemCount = db.collection(ADMIN_COLLECTION).doc(ITEM_ADMIN_DOC);
    await db.runTransaction(async (t) => {
      t.delete(itemDoc);
      t.update(adminItemCount, {
        totalItemCount: admin.firestore.FieldValue.increment(-1),
      });
    });
    return new Response(200, { message: "Deleted" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getItemAll(sellerId, next) {
  try {
    let doc;
    if (next === null || next === undefined) {
      doc = await db.collection(ITEM_COLLECTION).limit(20).get();
    } else {
      const nextDoc = await db.collection(ITEM_COLLECTION).doc(next).get();
      doc = await db
        .collection(ITEM_COLLECTION)
        .where("sellerId", "==", sellerId)
        .startAfter(nextDoc)
        .limit(20)
        .get();
    }
    let nextDocId;
    if (doc.docs.length == 0) {
      nextDocId = -1;
    } else {
      nextDocId = doc.docs[doc.docs.length - 1].id;
    }

    const items = [];
    doc.forEach((item) => {
      const temp = item.data();
      delete temp["sellerId"];
      delete temp["description"];
      delete temp["inventory"];
      items.push({ ...temp, id: item.id });
    });
    return new Response(200, { items, next: nextDocId });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { updateItem, addItem, deleteItem, getItem, getItemAll };
