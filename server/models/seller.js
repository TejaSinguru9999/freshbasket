import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
    gmail:String,
    password:String,
    doorNo:String,
    street:String,
    villageOrCity:String,
    district:String,
    state:String,
    pincode:Number,
    role:String
});
export const SellerRegisterSchema = mongoose.model("Seller",SellerSchema);