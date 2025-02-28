const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,  
    },
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

