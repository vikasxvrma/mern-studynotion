const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // get token from cookies or authorization header
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded;

    // continue
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Error verifying token: " + err.message,
    });
  }
};

module.exports = auth;
