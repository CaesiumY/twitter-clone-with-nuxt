const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware");
const multer = require("multer");
const path = require("path");

const db = require("../models");

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

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    await db.Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Deleted");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { contents } = req.body;

    const newPost = await db.Post.create({
      contents,
      UserId: req.user.id,
    });

    const hashtags = contents.match(/#[^\s#]+/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((hashtag) =>
          db.Hashtag.findOrCreate({
            where: { name: hashtag.slice(1).toLowerCase() },
          })
        )
      );

      await newPost.addHashtags(result.map((r) => r[0]));
    }

    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["nickname", "id"],
        },
      ],
    });

    return res.json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/image", isLoggedIn, uploads.array("image"), (req, res) => {
  return res.json(req.files.map((v) => v.filename));
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comments = await db.Comment.findAll({
      where: {
        PostId: post.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:id/comment", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    const newContent = db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });

    const comment = await db.Comment.findOne({
      where: {
        id: newContent.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    return res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
