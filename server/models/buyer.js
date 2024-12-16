import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
    gmail:String,
    password:String,
    villageOrCity:String,
    role:String,
});

export const BuyerRegisterSchema = mongoose.model("Buyer",BuyerSchema );
