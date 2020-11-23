const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware");
const multer = require("multer");
const path = require("path");

const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      done(null, base + Date.now() + ext);
    },
  }),
  limits: 20 * 1024 * 1024,
});

router.post("/", isLoggedIn, (req, res) => {
  return res.send("/post");
});

router.post("/image", isLoggedIn, uploads.array("image"), (req, res) => {
  console.log("req.files", req.files);
  return res.json(req.files.map((v) => v.filename));
});

module.exports = router;
