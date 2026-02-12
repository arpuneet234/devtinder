const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type" + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send({ message: "User Not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request Sent",
        data,
      });
    } catch (err) {
      res.status(400).send("ERORR :" + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestID",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestID } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestID,
        status: "interested",
        toUserId: loggedInUser._id,
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request is not found" });
      }

      connectionRequest.status = status;
      connectionRequest.save();
      res.json({ message: "Connecetion request has been " + status });
    } catch (err) {}
  },
);
module.exports = requestRouter;
