const validator = require("validator");

const singupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password not Strong");
  }
};

module.exports = singupValidation;
