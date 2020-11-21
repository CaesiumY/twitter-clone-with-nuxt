const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");

router.post("/");

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

        return res.json(user);
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

      return res.json(user);
    }); // serializeUser를 통해 세션에 저장
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send("logout");
});

module.exports = router;
