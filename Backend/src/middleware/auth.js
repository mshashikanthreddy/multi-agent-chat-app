require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next) => {

    try {
        const authHeader = req.headers.authorization ;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized Acesss" });
        }

        const token = authHeader.split(" ")[1];

        const decodedMessage = await jwt.verify(token,process.env.JWT_SECRET);

        const {_id} = decodedMessage;

        const user = await User.findById(_id);
        if(!user){
            throw new Error('User Not Found');
        }
        req.user = user;
        next();
    }
    catch(err) {
        res.status(401).json({
            message : `ERROR : ${err.message}` }
        );
    }

}

module.exports = userAuth ;