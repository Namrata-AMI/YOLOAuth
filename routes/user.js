const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.js");
const { isLoggedIn } = require("../middleware.js");


// home
router.get("/",userController.Home);

// signup
router.get("/signup",userController.getSignup);
router.post("/signup",userController.postSignup);

// login 
router.get("/login",userController.getLogin);
router.post("/login",userController.postLogin);

// edit 
router.get("/edit-profile", isLoggedIn , userController.getEditprofile);
router.post("/edit-profile" ,isLoggedIn,  userController.postEditprofile);

//logout 
router.get("/logout",userController.logout);


module.exports = router;