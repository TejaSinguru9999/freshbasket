import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

const LoginController = async (req, res) => {
    const { gmail, password } = req.body;
    try {
        const existingUser = await User.findOne({ gmail: gmail });
        if (!existingUser) {
            throw new Error("No user found, please register.")
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid user credentials");
        }
        return res.json({
            success: true,
            message: existingUser,
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export { LoginController }