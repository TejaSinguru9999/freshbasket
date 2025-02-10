import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

const UserRegisterController=async(req,res)=>{
    const { gmail,password,doorNo,street,villageOrCity,district,state,pincode,role} = req.body;
    try {
        const existingGmail = await User.findOne({gmail:gmail});
        if(existingGmail){
            throw new Error("Email already registered.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSeller = await new User({
            gmail, password:hashedPassword, 
            doorNo,street, villageOrCity,
            district,state,pincode,role
        }).save();
        return res.json({
            success:true,
            message:newSeller
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }
}

export {UserRegisterController};