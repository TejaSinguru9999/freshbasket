import Router from "express"
import { UserRegisterController } from "../controllers/register.js";
import { LoginController } from "../controllers/login.js";

const UserRouter = Router();

UserRouter.route("/register").post(UserRegisterController);

UserRouter.route("/login").post(LoginController)

export default UserRouter;