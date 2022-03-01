const multer = require("multer");
const fs = require("fs");
const { fileStore } = require("./firebase");

function FireStorage(opts) {
  this.getDestination = (req, file, cb) => {
    cb(null, "/dev/null");
  };
}

FireStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, function (err, path) {
    if (err) return cb(err);
    const cloudFileObj = fileStore.file(`${req.userID}/${file.originalname}`);
    const outStream = cloudFileObj.createWriteStream();
    file.stream.pipe(outStream);
    outStream.on("error", cb);
    outStream.on("finish", function () {
      cb(null, {
        path: `${req.userID}/${file.originalname}`,
        size: outStream.bytesWritten,
      });
    });
  });
};

FireStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

const fireStorage = (opts) => {
  return new FireStorage(opts);
};

const upload = multer({ storage: fireStorage() });

module.exports = upload;
