const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware");

router.post("/", isLoggedIn, (req, res) => {
  return res.send("/post");
});

module.exports = router;
