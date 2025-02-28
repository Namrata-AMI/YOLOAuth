const passport = require("passport");
const User = require("../models/user.js");


module.exports.Home = (req,res)=>{
    res.render("User/index.ejs")
}


module.exports.getSignup = (req,res)=>{
    res.render("User/signup.ejs");
}

module.exports.postSignup = async(req,res)=>{
    const {username, email, password , name, birthDate, gender , description} = req.body;
    try{
        const newUser = new User({username, email, password , name, birthDate, gender , description});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{          // i am using passport login method to make user already login after sign-in//
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to YOLOAuth!!");
            res.redirect("/login");
        });
    }
    catch(e){
        req.flash("error",e.message);
        return res.redirect("/signup");
    }
};




module.exports.getLogin = async(req,res)=>{
    res.render("User/login.ejs");
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", info.message || "Invalid username or password");
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to YOLOAuth!");
            return res.redirect("/edit-profile");
        });
    })(req, res, next);
};



module.exports.logout = async(req,res)=>{
    req.logout(()=>{
        req.flash("success","You are logged out !");
        res.redirect("/");
    })
}


module.exports.getEditprofile = async(req,res)=>{
    res.render("User/profile.ejs", {user:req.user});
}

module.exports.postEditprofile = async(req,res)=>{
    try{
        const { name, birthDate, gender, description } = req.body;
        await User.findByIdAndUpdate(req.user._id, { name, birthDate, gender, description });
        req.flash("success","Your profile is updated !");
        res.redirect("/");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/edit-profile");
    }
}


