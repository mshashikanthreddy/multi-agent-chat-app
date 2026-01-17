const mongoose = require('mongoose');
const {Schema} = mongoose ;

const agentCreationSchema = new Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User" 
    },
    agentName : {
        type : "string",
        required : true,
        maxLength : 50
    },
    tone : {
        type : "string",
        required : true,
        enum : {
          values :  ['professional','friendly','candid'],
          message : '{VALUE} is invalid tone type'
        },
        default : "professional"
    },
    prompt : {
        type : "string",
        required : true,
        minLength : 10,
        maxLength : 100
    }
    },
    {
        timestamps : true
    }
)

const Agent =  mongoose.model('agent', agentCreationSchema);
module.exports = Agent;