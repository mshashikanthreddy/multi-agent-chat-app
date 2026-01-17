const User = require('../models/User');
const {validateUserOnSignup} = require('../utils/validation');
const bcrypt = require('bcrypt');

const signupUser = async(req,res) => {
    try {

        validateUserOnSignup(req.body);

        const {name , emailId , password,} = req.body;

       const hashPassword = await bcrypt.hash(password,10);
         const user = new User({
            name,
            emailId,
            password : hashPassword,
         });
        await user.save();
        const token = await user.getJWT();
                res.status(200).json({
                    token :  token ,
                    message : `user signUp Successful`
                })
    
    }
    catch(err) {
        res.status(400).send("Error : " +  err.message);
    }
};

const loginUser = async(req,res) => {

    const {emailId ,password} = req.body;
        try {
    
            const user = await User.findOne({emailId : emailId});
            if(!user){
                throw new Error('Invalid credentials');
            }
            const isValidPassword = await user.validatePassword(password);
            if(!isValidPassword){
                throw new Error('Invalid credentials');
            }
            else{
                const token = await user.getJWT();
                res.status(200).json({
                    token :  token ,
                    message : `User Login Successful`
                })
            }
        }
        catch(err) {
            res.status(400).send('Unable to Login : ' + err.message);
        }
    };

module.exports = {
    signupUser,
    loginUser
}
