const TryCatch=require('../middleware/TryCatch')
const sanitize=require('mongo-sanitize')
const bcrypt=require('bcrypt');
const User=require('../models/user')


const registerUser=TryCatch(async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All Feilds are Required Compulsory...!"
        })
    }
    if( typeof name !=="string" || typeof email !=="string" || typeof password !== "string" ){
        return res.status(400).json({
            success:false,
            message:"Invalid Email Formats"
        })
    }
    name=sanitize(name);
    email=sanitize(email);
    password=sanitize(password);

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)){
        return res.status(400).josn({
            success:false,
            message:"email format Must folloed"
        })
    }

    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists..."
        })
    }
    const salt=await bcrypt.genSalt(10);
    const passwordHashed=await bcrypt.hash(password,salt)
    const data=await User.create({
        name:name,
        email:email,
        password:passwordHashed
    })
    
    return res.status(200).json({
        data:data,
        success:true,
        message:"Registered SuccessFully...!"
    })
});

module.exports={registerUser};