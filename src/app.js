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
