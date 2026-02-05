const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("hello from hello");
});

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.use("/", (req, res) => {
  res.send("hello from server 2");
});

app.listen(3000, () => {
  console.log("server started at 3000");
});

app.listen(4000, () => {
  console.log("server started at 4000");
});
