const validator = require('validator');


const validateUserOnSignup = (data) => {
    
    const {name , emailId, password} = data;
    
    if(!name){
        throw new Error('please fill the mandatory details')
    } 
    else if((!validator.isEmail(emailId)) || !emailId.endsWith('@gmail.com')){
        throw new Error('Enter a Valid EmailId');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password');
    }
}

module.exports = { validateUserOnSignup };