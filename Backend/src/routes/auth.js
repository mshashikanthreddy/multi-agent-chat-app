const express = require('express');
const authRouter = express.Router();
const userController = require('../controllers/Users');

authRouter.post('/signup', userController.signupUser);

authRouter.post('/login', userController.loginUser);

module.exports = authRouter ;