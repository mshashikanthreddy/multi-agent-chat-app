const mongoose = require('mongoose');
const {Schema} = mongoose ;

const chatCreationSchema = new Schema({

  agentId: {
    type: mongoose.Schema.Types.ObjectId,   
    required: true,
    index: true
  },

  role: {
    type: String,
    enum: {
     values :   ["user", "assistant"],
     message : '{VALUE} is a invalid role',
    required: true
  }
  },
  content: {
    type: String,
    required: true
  }
  },
  {
    timeStamps : true
  }
)

const Chat = mongoose.model('chat',chatCreationSchema);
module.exports = Chat;