require('dotenv').config(); 

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dns = require('node:dns/promises');
    await dns.setServers(['1.1.1.1', '8.8.8.8']);
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@backend-projects.ewiwyeo.mongodb.net/multi-agent-chat-app`);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


module.exports =  connectDB;

