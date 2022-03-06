const {
  db,
  SELLER_COLLECTION,
  BUYER_COLLECTION,
  admin,
  fileStore,
} = require("../firebase");
const { Response, errorHandler } = require("../response");

async function updateInfo(info, isSeller, uid) {
  try {
    const { name, billingAddress, phone, shippingAddress } = info;
    let user;
    if (isSeller) {
      user = db.collection(SELLER_COLLECTION).doc(uid);
    } else {
      user = db.collection(BUYER_COLLECTION).doc(uid);
    }
    await user.update({ name, billingAddress, phone, shippingAddress });
    return new Response(200, { message: "Updated info" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function getInfo(isSeller, uid) {
  try {
    let user;
    if (isSeller) {
      user = db.collection(SELLER_COLLECTION).doc(uid);
    } else {
      user = db.collection(BUYER_COLLECTION).doc(uid);
    }
    const doc = await user.get();
    return new Response(200, doc.data());
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function uploadMedia(files, uid) {
  try {
    let mediaCerts = files["certificates"].map((file) => {
      return {
        url: file.url,
        type: file.type,
        alt: file.alt,
        bucketPath: file.bucketPath,
      };
    });
    let mediaImgs = files["imgs"].map((file) => {
      return {
        url: file.url,
        type: file.type,
        alt: file.alt,
        bucketPath: file.bucketPath,
      };
    });
    const media = [...mediaCerts, ...mediaImgs];
    await db
      .collection(SELLER_COLLECTION)
      .doc(uid)
      .update({
        media: admin.firestore.FieldValue.arrayUnion(...media),
      });
    return new Response(201, { message: "Uploaded" });
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}

async function deleteMedia(mediaObj, uid) {
  try {
    let promises = [];
    mediaObj.forEach((media) => {
      const temp = fileStore.file(`${uid}${media.bucketPath}`);
      promises.push(
        temp.delete().then(async (data) => {
          await db
            .collection(SELLER_COLLECTION)
            .doc(uid)
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

module.exports = { updateInfo, getInfo, uploadMedia, deleteMedia };
