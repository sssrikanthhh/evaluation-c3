const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploadedImages"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "application/jpeg" || file.mimetype === "application/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const options = {
  strorage: storage,
  fileFilter: fileFilter,
  limits: {
    // limits file size to 5mb
    fileSize: 1024 * 1024 * 5
  }
};

module.exports = multer(options);