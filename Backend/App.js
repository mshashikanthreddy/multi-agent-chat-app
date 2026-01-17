const connectDB = require('./src/config/database');
const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./src/routes/auth');
app.use(express.json());

app.use('/auth', authRouter);


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


