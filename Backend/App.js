const connectDB = require('./src/config/database');
const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./src/routes/auth');
const agentRouter = require('./src/routes/agent');
const chatRouter = require('./src/routes/chat');
app.use(express.json());

app.use('/auth', authRouter);
app.use('/agents',chatRouter);
app.use('/',agentRouter);


connectDB()
    .then(() =>{
        console.log("Database is connected successfully");
    app.listen(process.env.PORT || 3000,() =>{
        console.log('Server is successfully listening on port 3000');
    })
    })   
    .catch((err) => {
        console.log(err.message);
    })


