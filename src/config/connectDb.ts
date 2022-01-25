
import mongoose from "mongoose";
require("dotenv").config();


 const url =    "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@cluster0.6wnbf.mongodb.net/ecommerceapp?retryWrites=true&w=majority";

 const connect = async ()=>{
     await mongoose.connect(url)
     console.log("database is connected successfully...");
     
 }

 export default connect
