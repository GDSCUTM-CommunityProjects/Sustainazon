const {
  db,
  ITEM_COLLECTION,
  PAGINATION_LIMIT,
  BUYER_COLLECTION,
  ORDER_COLLECTION,
  pointsCalculator,
  admin,
} = require("../firebase");
const { Response, errorHandler } = require("../response");

async function getOrders(uid, strPage) {
  try {
    const page = parseInt(strPage);
    const data = await db
      .collection(ORDER_COLLECTION)
      .where("sellerId", "==", uid)
      .offset(page * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT)
      .get();
    let promises = [];
    data.docs.forEach((doc) => {
      const temp = doc.data();
      promises.push(
        db
          .collection(ITEM_COLLECTION)
          .doc(temp.itemId)
          .get()
          .then((d) => {
            const i = d.data();
            const result = { ...doc, orderId: doc.id, tags: i.tags };
            result["media"] =
              i.hasOwnProperty("media") && i["media"].length > 0
                ? i["media"][0]
                : { url: "none", alt: "No image" };
            return result;
          })
      );
    });

    const result = await Promise.all(promises);

    let newPage;
    if (data.docs.length < PAGINATION_LIMIT) {
      newPage = -1;
    } else {
      newPage = page + 1;
    }
    return new Response(200, { orders: result, page: newPage });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function updateOrder(uid, orderId, status) {
  try {
    if (
      status !== "ORDER_RECEIVED" ||
      status !== "FULFILLING" ||
      status !== "SHIPPING" ||
      status !== "DELIVERED" ||
      status !== "RETURN_COMPLETED"
    )
      return new Response(400, { message: "Invalid status" });
    const data = await db.collection(ORDER_COLLECTION).doc(orderId).get();
    if (!data.exists) return new Response(404, { message: "Order not found" });
    const order = data.data();
    if (order.sellerId !== uid)
      return new Response(403, { message: "Invalid order" });
    if (order.status === "CANCELLED")
      return new Response(400, { message: "Cannot update a cancelled order" });
    if (
      (status !== "RETURN_COMPLETED" && order.status !== "RETURN") ||
      (status === "RETURN_COMPLETED" && order.status !== "RETURN")
    )
      return new Response(400, {
        message:
          "Can only set the status of a returning order to return completed",
      });

    let promises = [
      db.collection(ORDER_COLLECTION).doc(orderId).update({
        status,
      }),
    ];
    if (order.pointsUsed > 0 && status === "RETURN_COMPLETED")
      promises.push(
        db
          .collection(BUYER_COLLECTION)
          .doc(order.uid)
          .update({
            totalPoints: admin.firestore.FieldValue.increment(order.pointsUsed),
          })
      );
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

module.exports = { getOrders, updateOrder };
