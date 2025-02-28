require("dotenv").config();
const mongoose = require("mongoose")
 const db_connect = ()=>{
    mongoose.connect(process.env.DBURL).then(()=>{
        console.log("Data base connected successfully");
    }).catch((e)=>{
        console.log("error");
        console.log(e);
    })
}
module.exports =  db_connect; 