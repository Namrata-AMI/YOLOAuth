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
        validate: {
            validator: function (value) {
                return value <= new Date(); // future dates not tot be selected...//
            },
            message: "Birthdate cannot be in the future!",
        },
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"], 
    },
    description: {
        type: String,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
