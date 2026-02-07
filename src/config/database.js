const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://puneet159160:puneet159160@nodejslearning.mmk53gv.mongodb.net/devTinder",
  );
};
module.exports = connectDB;
