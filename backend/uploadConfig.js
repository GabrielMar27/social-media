const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePic") {
      cb(null, "./uploads/profiles/");
    } else if (file.fieldname === "video") {
      cb(null, "./uploads/videos/");
    } else if (file.fieldname === "imagePost") {
      cb(null, "./uploads/images/");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const profileUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
}).single("profilePic");

const videoUpload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 * 1024 }, // 1GB
  fileFilter: fileFilter,
}).single("video");

const imagePostUpload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: fileFilter,
}).single("imagePost");

module.exports = { profileUpload, videoUpload, imagePostUpload };
