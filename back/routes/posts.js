const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async (req, res, next) => {
  console.log("posts");
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
      ],
      offset: parseInt(req.params.offset) || 0,
      limit: parseInt(req.params.limit) || 10,
      order: [["createdAt", "DESC"]],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
