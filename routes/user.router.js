const express = require("express");
const router = express.Router();

// router.get("/test", (req, res) => {
//   res.send("User route is working");
// });


// ek route jha par form show hoga or dusra jha data jayega
router.get('/register',(req,res)=>{
    res.render('register')
})


module.exports = router;