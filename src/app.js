const express = require("express");
const app = express();

const { adminauth } = require("./middleware/auth");

app.use("/admin", adminauth);
app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteuser", (req, res) => {
  throw new Error("absbbsn");

  res.send("User Deleted");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Some Error Occured Call Support Team");
  }
});
// app.use("/user", (req, res) => {
//   res.send("user");
// });

app.listen(3000, () => {
  console.log("Server started at 3000");
});
