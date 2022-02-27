const { db } = require("../firebase");
const Response = require("../responseModel");

async function updateInfo(info, isSeller, uid) {
  try {
    const { name, address, phone } = info;
    let user;
    if (isSeller) {
      user = db.ref("seller").child(uid);
    } else {
      user = db.ref("buyer").child(uid);
    }
    await user.update({ name, address, phone });
    return new Response(200, { message: "Updated info" });
  } catch (err) {
    let message = "Bad Request";
    if (error.hasOwnProperty("message")) message = error.message;
    return new Response(400, { message });
  }
}

module.exports = { updateInfo };
