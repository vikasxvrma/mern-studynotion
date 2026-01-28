// this middleware checks or authorise the user his role in this app

const isStudent = async (req, res, next) => {
  // fetch the role or accountType from the request body
  // as we have loaded as decode while authenticating the user 
  try {
    if (req.user.accountType !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Students only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error validating student access",
    });
  }
};
const isInstructor = async (req, res, next) => {
  // fetch the role or accountType from the request body
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Instructor only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error validating Instructor access",
    });
  }
};
const isAdmin = async (req, res, next) => {
  // fetch the role or accountType from the request body
  try {
    if (req.user.accountType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error validating Admin access",
    });
  }
};

// exports all
module.exports = { isStudent, isInstructor, isAdmin };
