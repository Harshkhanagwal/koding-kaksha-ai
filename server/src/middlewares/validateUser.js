const { body, validationResult } = require("express-validator");

exports.validateUser = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .optional()
    .isIn(["student", "lecturer", "admin"])
    .withMessage("Invalid role selected"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];


//authenticate user- 
// authenticate admin - 2 middelware - one for check that it is admin with all power to perform curd operation //// and one for check that admin have only read only access.