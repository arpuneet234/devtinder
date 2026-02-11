const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const {
  validateEditProfileData,
  passwordValidation,
} = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log(validateEditProfileData(req));
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName} , your Profile is updated sucessfully`);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);

    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword);
    console.log(newPassword);
    const user = req.user;

    isPasswordValid = await user.validatePassword(oldPassword);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    passwordValidation(newPassword);

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user["password"] = passwordHash;

    await user.save();

    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Password Updated , Login with Updated Password");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
