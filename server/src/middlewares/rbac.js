const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isWriteMethod = (method) =>
  ["POST", "PUT", "PATCH", "DELETE"].includes(method);

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token user.",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

const readOnlyGuard = (req, res, next) => {
  if (req.user?.isReadOnly && isWriteMethod(req.method)) {
    return res.status(403).json({
      success: false,
      message: "Read-only user cannot perform write operations.",
    });
  }
  return next();
};

const superadminMiddleware = (req, res, next) => {
  if (req.user?.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super Admin only.",
    });
  }
  return readOnlyGuard(req, res, next);
};

const adminMiddleware = (req, res, next) => {
  const role = req.user?.role;
  if (role !== "admin" && role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin or Super Admin only.",
    });
  }
  return readOnlyGuard(req, res, next);
};

const lecturerMiddleware = (req, res, next) => {
  const role = req.user?.role;
  if (role !== "lecturer" && role !== "admin" && role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Lecturer/Admin/Super Admin only.",
    });
  }
  return readOnlyGuard(req, res, next);
};

module.exports = {
  authenticateUser,
  superadminMiddleware,
  adminMiddleware,
  lecturerMiddleware,
  readOnlyGuard,
};
