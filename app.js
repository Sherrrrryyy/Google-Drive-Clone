const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.router.js");
const dotenv = require('dotenv')
dotenv.config();
const connectToDB = require('./config/db.js')
connectToDB();

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/user', userRouter);


app.listen(4000, () => {
  console.log("server is running on port 4000");
});
