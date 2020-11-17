const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const db = require("./models");
const passportConfig = require("./passport");
const app = express();

const PORT_NUM = 3085;
const SECRET_COOKIE = "secret_cookie";

db.sequelize.sync({ force: true }); // force 활성화시 서버를 새로 시작할 때마다, 변경할 때마다 데이터 초기화
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize()); // request에 login & logout 넣어줌
app.use(passport.session());
app.use(cookie(SECRET_COOKIE));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SECRET_COOKIE,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  res.send("hello world!");
});

// 회원가입
app.post("/user", async (req, res, next) => {
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
app.post("/user/login", async (req, res, next) => {
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
});

app.listen(PORT_NUM, () => {
  console.log(`${PORT_NUM}번 포트에서 서버 작동중`);
  console.log(`http://localhost:${PORT_NUM}/`);
});
