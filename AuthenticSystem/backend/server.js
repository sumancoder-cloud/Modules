const express=require('express');
const connectDB=require('./src/config/db')
require('dotenv').config();

connectDB();

const app=express();

const authRoutes=require('./src/routes/authRoutes')
app.use(express.json());
app.use('/api',authRoutes)


const PORT=process.env.PORT || 3001;







app.listen(PORT,()=>{
    console.log(`Server is Connected to ${PORT}`);
})