const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    console.log(res);
    return cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, res, cb) {
    return cb(
      null,
      `${Date.now()}_${Math.floor(Math.random() * 10000000000000)}.png`
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
