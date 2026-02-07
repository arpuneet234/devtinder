const express = require("express");
const app = express();

const User = require("./models/user");

const connectDb = require("./config/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });

    console.log(user);

    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Something Went wrong");
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
