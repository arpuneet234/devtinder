const validator = require("validator");

const signupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password not Strong");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "about", "gender", "age"];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });

  return isEditAllowed;
};
const passwordValidation = (password) => {
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Strong");
  }
};
module.exports = {
  signupValidation,
  validateEditProfileData,
  passwordValidation,
};
