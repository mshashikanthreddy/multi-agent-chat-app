require('dotenv').config(); 

const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@backend-projects.ewiwyeo.mongodb.net/multi-agent-chat-app`)
}

module.exports =  connectDB;