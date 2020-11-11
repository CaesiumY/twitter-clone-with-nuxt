const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT_NUM = 3085;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/user", (req, res) => {
  console.log(req.body);
});

app.listen(PORT_NUM, () => {
  console.log(`${PORT_NUM}번 포트에서 서버 작동중`);
  console.log(`http://localhost:${PORT_NUM}/`);
});
