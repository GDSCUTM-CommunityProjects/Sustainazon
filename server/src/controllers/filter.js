const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  SELLER_COLLECTION,
} = require("../firebase");

async function filterData(page, search, filter) {
  let data;
  let dbRef = db.collection(ITEM_COLLECTION);

  if (filter["price"] !== undefined && filter["price"] !== null) {
    if (filter["price"].length == 2) {
      let min = parseInt(filter["price"][0]);
      let max = parseInt(filter["price"][1]);
      dbRef = dbRef.where("price", "<=", max).where("price", ">=", min);
    }
    if (filter["price"].length == 1) {
      let min = parseInt(filter["price"][0]);
      dbRef = dbRef.where("price", ">=", min);
    }
  }
  if (filter["categories"] !== undefined && filter["categories"] !== null) {
    dbRef = dbRef.where(
      "categories",
      "array-contains-any",
      filter["categories"]
    );
  }
  if (filter["tags"] !== undefined && filter["tags"] !== null) {
    dbRef = dbRef.where("tags", "array-contains-any", filter["tags"]);
  }

  if (search !== undefined && search !== null) {
    const sellerRef = db.collection(SELLER_COLLECTION);
    let promises = [
      dbRef
        .where("itemName", "==", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      dbRef
        .where("price", "==", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      dbRef
        .where("tags", "array-contains", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      dbRef
        .where("categories", "array-contains", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      sellerRef
        .where("name", "==", search)
        .get()
        .then(async (d) => {
          if (d.docs.length > 0) {
            return await dbRef
              .where("sellerId", "==", d.docs[0].id)
              .offset(page * PAGINATION_LIMIT)
              .limit(PAGINATION_LIMIT)
              .get();
          }
          return { docs: [] };
        }),
    ];
    const result = await Promise.all(promises);
    data = [];
    result.forEach((r) => {
      data = [...data, ...r.docs];
    });
  } else {
    const result = await dbRef
      .offset(page * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT)
      .get();
    data = result.docs;
  }
  return data;
}

module.exports = { filterData };
