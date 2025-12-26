const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../model/userModel");

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

// login html page rendering
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Html page rendering
router.post(
  "/login",

  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
        message: "Email or Password is incorrect",
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect"`` });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY
    );
    res.json({ token });
  }
);

module.exports = router;
