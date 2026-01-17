require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { Schema } = mongoose;

const userSchema = new Schema ({
    name: {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50 
    },
    emailId : {
        type : String,
        unique : true,
        trim : true,
        required : true,
        lowercase : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Wrong Email format');
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Not A strong Password');
            }
        }

    }
    },
    {
        timestamps : true
    },
    {
        strict : true
    }
);

userSchema.methods.getJWT = async function() {

    const user = this;

    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn : '1d'});
    return token;   
}

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(
        passwordInputByUser,
        hashedPassword);

    return isValidPassword;
}

const User = mongoose.model("user",userSchema);

module.exports =  User ;