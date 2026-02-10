const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 20,
      unique: true,
    },
    lastName: {
      type: String,
      maxLength: 20,
    },
    gender: {
      type: String,
      validate: function (value) {
        allowedGender = ["male", "female", "others"];
        return allowedGender.includes(value.toLowerCase());
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not Correct");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(" Password not strong , Enter New Password");
        }
      },
    },

    about: {
      type: String,
      default: "Default About of User",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devTinder@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function () {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
