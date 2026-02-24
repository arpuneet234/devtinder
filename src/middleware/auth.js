const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("token" + token);
    if (!token) {
      return res.status(401).send("please login!");
    }
    const decodedObject = jwt.verify(token, "devTinder@123");
    const { _id } = decodedObject;
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User Not Found...");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
