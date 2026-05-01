const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"authenticationDB"
        });
        console.log("MongoDB is Connected SuccessFully...!")
    }catch(error){
        console.log("Connection with database is disturbed",error.message);
        process.exit(1);
    }
}

module.exports=connectDB;