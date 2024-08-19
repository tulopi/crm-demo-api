import { Router } from "express";
import * as controllers from "../controllers";

const adminRouter = Router();

// [POST] 🌐/api/admin/email/
adminRouter.post("/email", controllers.sendEmail);

export default adminRouter;
