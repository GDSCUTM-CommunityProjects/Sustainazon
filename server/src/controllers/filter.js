const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  SELLER_COLLECTION,
} = require("../firebase");

async function filterData(page, search, price) {
  let data;
  let dbRef = db.collection(ITEM_COLLECTION);
  if (price !== undefined && price !== null) {
    if (price.length === 1) {
      // only min
      dbRef = dbRef.where("price", ">=", parseInt(price[0]));
    } else if (price.length === 2) {
      // max and min
      dbRef = dbRef
        .where("price", ">=", parseInt(price[0]))
        .where("price", "<=", parseInt(price[1]));
    }
  }
  if (search !== undefined && search !== null && search.length > 0) {
    const sellerRef = db.collection(SELLER_COLLECTION);
    let promises = [
      dbRef
        .where("itemName", "in", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      dbRef
        .where("categories", "array-contains-any", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      dbRef
        .where("tags", "array-contains-any", search)
        .offset(page * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .get(),
      sellerRef
        .where("name", "in", search)
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
