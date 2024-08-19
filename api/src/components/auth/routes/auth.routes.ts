import { Router } from "express";
import * as controllers from "../controllers";

const authRouter = Router();

// [POST] 🌐/api/auth/login
authRouter.post("/login", controllers.loginUser);

// [POST] 🌐/api/auth/restore
authRouter.post("/restore", controllers.sendRestorePasswordEmail);

// [POST] 🌐/api/auth/restore/:token
authRouter.post("/restore/:token", controllers.restorePassword);

// [PUT] 🌐/api/auth/change/:id
authRouter.put("/change/:id", controllers.changePassword);


export default authRouter;
