const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendconnectionrequest", userAuth, (req, res) => {
  res.send("connection req send");
  console.log("Connection");
});

module.exports = requestRouter;
