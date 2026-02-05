const adminauth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    console.log("admin authorised");
    next();
  } else {
    res.status(401).send("not authorised");
  }
};

module.exports = { adminauth };
