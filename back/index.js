const express = require("express");

const app = express();

const PORT_NUM = 3085;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT_NUM, () => {
  console.log(`${PORT_NUM}번 포트에서 서버 작동중`);
  console.log(`http://localhost:${PORT_NUM}/`);
});
