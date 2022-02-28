const { db } = require("../firebase");
const Response = require("../responseModel");

async function updateInfo(info, isSeller, uid) {
  try {
    const { name, billingAddress, phone, shippingAddress } = info;
    let user;
    if (isSeller) {
      user = db.ref("seller").child(uid);
    } else {
      user = db.ref("buyer").child(uid);
    }
    await user.update({ name, billingAddress, phone, shippingAddress });
    return new Response(200, { message: "Updated info" });
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

async function getInfo(isSeller, uid) {
  try {
    let user;
    if (isSeller) {
      user = db.ref("seller").child(uid);
    } else {
      user = db.ref("buyer").child(uid);
    }
    const data = await (await user.once("value")).val();
    return new Response(200, data);
  } catch (error) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { updateInfo, getInfo };
