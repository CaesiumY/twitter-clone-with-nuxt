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

    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        await Promise.all(
          req.body.images.map((image) =>
            db.Image.create({ src: image, PostId: newPost.id })
          )
        );
      } else {
        await db.Image.create({ src: req.body.images, PostId: newPost.id });
      }
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
        {
          model: db.Image,
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

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
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

    res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    const newContent = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.contents,
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

router.post("/:id/retweet", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.Post,
          as: "Retweet",
        },
      ],
    });

    if (!post) return res.status(404).send("Post Not Found");

    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("Cannot Retweet my own post!");
    }

    const retweetTargetId = post.Retweet.UserId || post.id;

    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });

    if (exPost) {
      return res.status(403).send("You already Retweeted");
    }

    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet content",
    });

    const retweetWithPrevPost = await db.Post.findOne({
      where: {
        id: retweet.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
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
    });

    res.json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
