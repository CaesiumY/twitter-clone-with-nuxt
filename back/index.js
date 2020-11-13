const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./models");
const app = express();

db.sequelize.sync();

app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT_NUM = 3085;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/user", async (req, res, next) => {
  console.log(req.body);
  const { email, nickname, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const newUser = await db.User.create({
      email,
      nickname,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.listen(PORT_NUM, () => {
  console.log(`${PORT_NUM}번 포트에서 서버 작동중`);
  console.log(`http://localhost:${PORT_NUM}/`);
});
