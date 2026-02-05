const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Akshay", lastName: "saini" });
});

app.post("/user", (req, res) => {
  //saving Data to Data Base

  res.send("Data Successfully added to DB");
});

app.delete("/user", (req, res) => {
  // Delete Operation
  res.send("Deleted");
});

app.get("/abc/:abcid", (req, res) => {
  res.send(req.params);
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
