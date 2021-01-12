const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async (req, res, next) => {
  console.log("posts");
  try {
    let where = {};

    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }

    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
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
