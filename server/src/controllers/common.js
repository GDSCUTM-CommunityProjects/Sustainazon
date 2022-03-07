const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  ADMIN_COLLECTION,
  TAGS_DOC,
  SELLER_COLLECTION,
} = require("../firebase");
const { Response, errorHandler } = require("../response");
const { filterData } = require("./filter");

async function getTags() {
  try {
    const data = await db.collection(ADMIN_COLLECTION).doc(TAGS_DOC).get();
    return new Response(200, { ...data.data() });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getSeller(sellerId) {
  try {
    const data = await db.collection(SELLER_COLLECTION).doc(sellerId).get();
    if (!data.exists) return new Response(404, { message: "No such seller" });
    const temp = data.data();
    delete temp["billingAddress"];
    delete temp["shippingAddress"];
    return new Response(200, temp);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getAllSellers(strPage, search) {
  const page = parseInt(strPage);
  let dbRef = db.collection(SELLER_COLLECTION);
  if (search !== undefined && search !== null && search.length > 0) {
    dbRef = dbRef.where("name", "in", search);
  }
  const data = (
    await dbRef
      .offset(page * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT)
      .get()
  ).docs;
  let newPage;
  if (data.length < PAGINATION_LIMIT) {
    newPage = -1;
  } else {
    newPage = page + 1;
  }

  const sellers = [];
  data.forEach((seller) => {
    const temp = seller.data();
    delete temp["billingAddress"];
    delete temp["shippingAddress"];
    delete temp["phone"];
    if (temp.hasOwnProperty("description")) delete temp["description"];
    if (temp.hasOwnProperty("media")) delete temp["media"];
    seller.push({ ...temp, sellerId: seller.id });
  });

  return new Response(200, {
    sellers,
    page: newPage,
  });
}

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

module.exports = { getItem, getItemAll, getTags, getSeller, getAllSellers };
