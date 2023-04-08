const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

const port = 5000;
const app = require("./app");

// Mongoose connect with mongoDB
const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/acc-api-three')
        console.log("DB is connected")

    } catch (error){
        console.log("DB is not connected");
        console.log(error.message);
        process.exit(1);
    }
};


app.listen(port, async ()=>{
    console.log(`Server is running on ${port}`.blue.bold);
    await connectDB();
})