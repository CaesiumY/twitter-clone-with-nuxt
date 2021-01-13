const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");

router.post("/");

router.get("/", isLoggedIn, async (req, res, next) => {
  const user = req.user;

  res.json(user);
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10),
      },
      include: [
        {
          model: db.Post,
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"],
        },
      ],
      attributes: ["id", "nickname"],
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  console.time("start");
  const { email, nickname, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const existUser = await db.User.findOne({
      where: {
        email,
      },
    });
    console.log("existUser", existUser);

    if (existUser) {
      return res.status(403).json({
        error: 1,
        message: "이미 존재하는 아이디입니다.",
      });
    }

    await db.User.create({
      email,
      nickname,
      password: hashedPassword,
    });

    passport.authenticate("local", async (err, user, options) => {
      if (err) {
        console.error(error);
        return next(err);
      }
      if (options) {
        return res.status(401).send(options.reason);
      }
      return req.login(user, async (error) => {
        if (err) {
          console.error(error);
          return next(err);
        }

        const fullUser = await db.User.findOne({
          where: {
            id: user.id,
          },
          attributes: ["id", "nickname", "email"],
          include: [
            {
              model: db.Post,
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"],
            },
          ],
        });

        return res.json(fullUser);
      }); // serializeUser를 통해 세션에 저장
    })(req, res, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
  console.timeEnd("start");
});

// 로그인
router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", async (err, user, options) => {
    console.log("user", user);

    if (err) {
      console.error(error);
      return next(err);
    }
    if (options) {
      return res.status(401).send(options.reason);
    }
    return req.login(user, async (error) => {
      if (err) {
        console.error(error);
        return next(err);
      }

      const fullUser = await db.User.findOne({
        where: {
          id: user.id,
        },
        attributes: ["id", "nickname", "email"],
        include: [
          {
            model: db.Post,
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });

      return res.json(fullUser);
    }); // serializeUser를 통해 세션에 저장
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send("logout");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    res.send(req.body.nickname);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    let where = {
      id: parseInt(req.params.id, 10),
      RetweetId: null,
    };

    if (parseInt(req.query.lastId, 10))
      where[db.Sequelize.Op.lt] = parseInt(req.query.lastId, 10);

    const post = await db.Post.findOne({
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
        // {
        //   model: db.Post,
        //   as: "Retweet",
        //   include: [
        //     {
        //       model: db.User,
        //       attributes: ["id", "nickname"],
        //     },
        //     {
        //       model: db.Image,
        //     },
        //   ],
        // },
      ],
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    await user.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    await user.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id/follower", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    await user.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id/followings", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.params.id },
    });

    const followings = await me.getFollowings({
      attributes: ["id", "nickname"],
      limit: parseInt(req.params.limit || 3, 10),
      offset: parseInt(req.params.offset || 0, 10),
    });

    res.json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.params.id },
    });

    const followers = await me.getFollowers({
      attributes: ["id", "nickname"],
      limit: parseInt(req.params.limit || 3, 10),
      offset: parseInt(req.params.offset || 0, 10),
    });

    res.json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
