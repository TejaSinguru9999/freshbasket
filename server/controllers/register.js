import { BuyerRegisterSchema } from "../models/buyer.js";
import { SellerRegisterSchema } from "../models/seller.js";
import bcrypt from "bcryptjs";

const BuyerRegisterController = async(req,res)=>{
    const { gmail, password, villageOrCity, role } = req.body;
    try {
        const existingGmail = await BuyerRegisterSchema.findOne({gmail:gmail});
        if(existingGmail){
            throw new Error("Email alrady registered.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newBuyer = await new BuyerRegisterSchema({
            gmail, password:hashedPassword, villageOrCity, role
        }).save();
        return res.json({
            success:true,
            message:newBuyer
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }
}

const SellerRegisterController=async(req,res)=>{
    const { gmail,password,doorNo,street,villageOrCity,district,state,pincode,role} = req.body;
    try {
        const existingGmail = await SellerRegisterSchema.findOne({gmail:gmail});
        if(existingGmail){
            throw new Error("Email alrady registered.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSeller = await new SellerRegisterSchema({
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

export {BuyerRegisterController, SellerRegisterController};