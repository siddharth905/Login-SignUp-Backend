const bcrypt = require("bcrypt");
const User = require("../models/User");


require("dotenv").config();

exports.signup=async (req,res)=>{
           
           try{
                const{name,email,password,role}=req.body;
                const exitingUser= await User.findOne({email});
                if(exitingUser){
                    return res.status(400).json({
                         success: false,
                         message:"user already register"
                    });
                }
                //secure password
                let hashPassword;
                try{
                    hashPassword= await bcrypt.hash(password,10);   //10 is rounds sha256
                }
                catch(error){
                    return res.status(500).json({
                        success:false,
                        message:'Error in hashing Password',
                    });
                }
                     //create entry for User
                    const user=await User.create(
                        {
                            name,email,password:hashPassword,role
                        }
                    )
                     return res.status(200).json({
                        success: true,
                        message: "USer Register / SignUp Sucessfully"
                     });

           }
           catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:'User cannot be registered, please try again later',
            });
           }
}
