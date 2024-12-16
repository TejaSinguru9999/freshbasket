import Router from "express"
import { BuyerRegisterController, SellerRegisterController } from "../controllers/register.js";
import { LoginController } from "../controllers/login.js";
const UserRouter = Router();

UserRouter.route("/register/buyer").post(BuyerRegisterController);
UserRouter.post(["/register/seller", "/register/farmer"], SellerRegisterController);

UserRouter.route("/login").post(LoginController)

export default UserRouter;