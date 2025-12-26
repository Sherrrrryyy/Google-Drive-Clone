const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// router.get("/test", (req, res) => {
//   res.send("User route is working");
// });

// ek route jha par form show hoga or dusra jha data jayega
// Register html page rendering
router.get("/register", (req, res) => {
  res.render("register");
});

// register route
router.post(
  "/register",

  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res
        .status(400)
        .json({ errors: error.array(), message: "Invalid data" });
    }

    const { username, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashPass,
    });

    res.json(newUser);
  }
);


// Login Html page rendering
router.get("/login", (req, res) => {
  res.render("login");
});

// login route

module.exports = router;
