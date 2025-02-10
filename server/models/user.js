import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    gmail:String,
    password:String,
    doorNo:String,
    street:String,
    villageOrCity:String,
    district:String,
    state:String,
    pincode:Number,
    role:String,
    products:Array
});
export const User = mongoose.model("User",UserSchema);