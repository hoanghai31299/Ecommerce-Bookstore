const { check, validationResult } = require("express-validator");
exports.userSignupValidator = [
  check("name", "Name is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];
exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstErr = errors.array()[0].msg;
    console.log(firstErr);
     return res.status(422).json({ error: firstErr });
    
  }
  next();
};
