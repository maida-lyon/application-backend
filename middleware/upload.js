const multer = require("multer");
const path = require("path");
const fs = require("fs");

const destination = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
