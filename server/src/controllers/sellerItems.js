const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  admin,
  fileStore,
  ADMIN_COLLECTION,
  TAGS_DOC,
  pointsPriceCalculator,
} = require("../firebase");
const upload = require("../firebaseMulter");
const { Response, errorHandler } = require("../response");

async function checkTags(tags, categories) {
  let adminDoc = await db.collection(ADMIN_COLLECTION).doc(TAGS_DOC).get();
  let adminTags = adminDoc.data().tags;
  let adminCategories = adminDoc.data().categories;
  if (categories) {
    for (let i in categories) {
      if (!adminCategories.includes(categories[i])) return false;
    }
  }
  if (tags) {
    for (let i in tags) {
      if (!adminTags.includes(tags[i])) return false;
    }
  }
  return true;
}

async function addItem(item, sellerId) {
  try {
    if (item.price <= 0)
      return new Response(400, { message: "price should be >= 0" });
    const check = await checkTags(item.tags, item.categories);
    if (!check)
      return new Response(400, { message: "incorrect tags or categories" });
    const data = await db.collection(ITEM_COLLECTION).add({
      ...item,
      sellerId,
      pointsPrice: pointsPriceCalculator(item.tags.length, item.price),
    });
    return new Response(200, { itemId: data.id });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function updateItem(item, itemId, sellerId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(sellerId) !== 0)
        return new Response(403, { message: "Item not owned by user" });
    }
    const check = await checkTags(item.tags, item.categories);
    if (!check)
      return new Response(400, { message: "incorrect tags or categories" });
    let updatedDoc = {
      ...item,
    };
    if (item.price)
      updatedDoc["pointsPrice"] = pointsPriceCalculator(
        item.tags.length,
        item.price
      );

    await db.collection(ITEM_COLLECTION).doc(itemId).update(updatedDoc);
    return new Response(200, { message: "Updated" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
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
      const media = req.files.map((file) => {
        return { url: file.url, alt: file.alt, bucketPath: file.bucketPath };
      });
      db.collection(ITEM_COLLECTION)
        .doc(req.query.itemId)
        .update({ media: admin.firestore.FieldValue.arrayUnion(...media) })
        .then(() => {
          return res.status(201).send({ message: "Uploaded" });
        });
    });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function itemImgDelete(mediaObj, uid, itemId) {
  try {
    let doc = await db.collection(ITEM_COLLECTION).doc(itemId).get();
    if (!doc.exists) {
      return new Response(404, { message: "No such item" });
    } else {
      const data = doc.data();
      if (data.sellerId.localeCompare(uid) !== 0)
        return new Response(403, { message: "Item not owned by user" });
    }
    let promises = [];
    mediaObj.forEach((media) => {
      const temp = fileStore.file(`${uid}${media.bucketPath}`);
      promises.push(
        temp.delete().then(async (data) => {
          await db
            .collection(ITEM_COLLECTION)
            .doc(itemId)
            .update({
              media: admin.firestore.FieldValue.arrayRemove(media),
            });
        })
      );
    });
    await Promise.all(promises);
    return new Response(200, { message: "deleted" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
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
    console.log(error);
    return errorHandler(error);
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
    await fileStore
      .file(`${sellerId}/${itemId}`)
      .delete({ ignoreNotFound: true });
    await db.collection(ITEM_COLLECTION).doc(itemId).delete();
    return new Response(200, { message: "Deleted" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
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
      if (temp.hasOwnProperty("comments")) delete temp["comments"];
      temp["media"] =
        temp.hasOwnProperty("media") && temp["media"].length > 0
          ? temp["media"][0]
          : { url: "none", alt: "No image" };
      items.push({ ...temp, itemId: item.id });
    });
    return new Response(200, { items, page: newPage });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

module.exports = {
  updateItem,
  addItem,
  deleteItem,
  getItem,
  getItemAll,
  itemImgUpload,
  itemImgDelete,
};
