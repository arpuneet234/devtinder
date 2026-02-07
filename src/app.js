const express = require("express");
const app = express();
const signupValidation = require("./utils/validations");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const connectDb = require("./config/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;

    const ALLOWED_UPDATES = [
      "userId",
      "firstName",
      "lastName",
      "about",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(data).every((key) => {
      ALLOWED_UPDATES.includes(key);
    });

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(user);

    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Something Went wrong" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    }

    res.send(user);
  } catch (err) {
    res.status(404).send("User Not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);
    const user = await User.findByIdAndDelete({});
    console.log(user);
    res.send("user Deleted");
  } catch (err) {
    res.status(404).send("something Went Wrong");
  }
});

connectDb()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server started at 3000");
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });
