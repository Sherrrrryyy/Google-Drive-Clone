const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// router.get("/test", (req, res) => {
//   res.send("User route is working");
// });

// ek route jha par form show hoga or dusra jha data jayega
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().isLength({ min: 3 }),
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res
        .status(400)
        .json({ errors: error.array(), message: "Invalid data" });
    }
    res.send(error);
  }
);

module.exports = router;
