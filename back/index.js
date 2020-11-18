const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
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
app.use(passport.initialize()); // request에 login & logout 넣어줌
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/user", userRouter);

app.listen(PORT_NUM, () => {
  console.log(`${PORT_NUM}번 포트에서 서버 작동중`);
  console.log(`http://localhost:${PORT_NUM}/`);
});
