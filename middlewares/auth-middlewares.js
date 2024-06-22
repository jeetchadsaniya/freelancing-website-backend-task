const jwt = require("jsonwebtoken");

const isLoginIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({
      statusCode: 401,
      message: error.message,
    });
  }
};

const checkPermission = (req, res, next) => {
  try {
    if (req.originalUrl.includes("project")) {
      if (req.user.roll != "client") {
        res.status(403).send({
          statusCode: 403,
          message: "use dont have to access to do operations on project",
        });
        return;
      }
    }
    if (req.originalUrl.includes("tag")) {
      if (req.user.roll != "admin") {
        res.status(403).send({
          statusCode: 403,
          message: "admin only do operation on tags",
        });
        return;
      }
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = Object.freeze({
  isLoginIn,
  checkPermission,
});
