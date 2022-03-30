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
/*
 * items is an array where each element is the following object:
 * {
 *    "itemId": "id of the item",
 *    "quantity": "number of items being bought"
 *    "usePoints": "boolean whether or not use user points to buy this"
 *  }
 *
 */
async function placeOrder(uid, items) {
  try {
    let promises = [];
    items.forEach((item) => {
      promises.push(
        db
          .collection(ITEM_COLLECTION)
          .doc(item.itemId)
          .get()
          .then(async (data) => {
            if (!data.exists) throw { message: "Item not found", status: 404 };
            const temp = data.data();
            if (item.quantity > temp.inventory)
              throw {
                message: {
                  message: "Quantity higher than available amount",
                  available: temp.inventory,
                },
              };
            time = new Date();
            return {
              uid,
              sellerId: temp.sellerId,
              quantity: item.quantity,
              status: "ORDERED",
              orderPlaced: time,
              lastUpdated: time,
              itemId: item.itemId,
              potentialPoints: item.usePoints
                ? 0
                : pointsCalculator(
                    temp.tags.length,
                    item.quantity * temp.price
                  ),
              price: !item.usePoints ? item.quantity * temp.price : 0,
              pointsUsed: item.usePoints ? item.quantity * temp.pointsPrice : 0,
            };
          })
      );
    });
    const updateData = await Promise.all(promises);
    let totalPointsUsed = 0;
    updateData.forEach((ud) => {
      totalPointsUsed += ud.pointsUsed;
    });
    if (totalPointsUsed > 0) {
      const data = await db.collection(BUYER_COLLECTION).doc(uid).get();
      const user = data.data();
      if (user.totalPoints < totalPointsUsed)
        return new Response(400, { message: "Not enough points" });
      await db
        .collection(BUYER_COLLECTION)
        .doc(uid)
        .update({
          totalPoints: admin.firestore.FieldValue.increment(
            -1 * totalPointsUsed
          ),
        });
    }
    promises = [];
    updateData.forEach((ud) => {
      promises.push(db.collection(ORDER_COLLECTION).add(ud));
    });
    await Promise.all(promises);
    return new Response(200, { message: "order placed" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getOrders(uid, strPage) {
  try {
    const page = parseInt(strPage);
    const data = await db
      .collection(ORDER_COLLECTION)
      .where("uid", "==", uid)
      .where("status", "not-in", ["CANCELLED", "RETURN_COMPLETED"])
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
            const result = {
              ...temp,
              orderId: doc.id,
              tags: i.tags,
              itemName: i.itemName,
            };
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
    if (status !== "CANCELLED" && status !== "RETURN")
      return new Response(400, { message: "Invalid status" });
    const data = await db.collection(ORDER_COLLECTION).doc(orderId).get();
    if (!data.exists) return new Response(404, { message: "Order not found" });
    const order = data.data();
    if (order.uid !== uid)
      return new Response(403, { message: "Invalid order" });
    if (order.status === "DELIVERED" && status === "CANCELLED")
      return new Response(400, { message: "Cannot cancel a delivered order" });
    if (order.status !== "DELIVERED" && status === "RETURN")
      return new Response(400, {
        message: "Cannot return a not delivered order",
      });
    if (order.status === status)
      return new Response(200, { message: "Order updated" });
    let promises = [
      db.collection(ORDER_COLLECTION).doc(orderId).update({
        status,
        lastUpdated: new Date(),
      }),
    ];
    if (order.pointsUsed > 0 && status === "CANCELLED")
      promises.push(
        db
          .collection(BUYER_COLLECTION)
          .doc(uid)
          .update({
            totalPoints: admin.firestore.FieldValue.increment(order.pointsUsed),
          })
      );
    await Promise.all(promises);
    return new Response(200, {
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

module.exports = { placeOrder, getOrders, updateOrder };
