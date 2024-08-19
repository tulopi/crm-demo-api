import { Router } from "express";
import userRouter from "../components/users/routes/users.routes";
import authRouter from "../components/auth/routes/auth.routes";
import adminRouter from "../components/admin/routes/admin.routes";
import productRouter from "../components/products/routes/products.routes";
import requestsRouter from "../components/requests/routes/requests.routes";

const router = Router();

// Ruta Users
router.use("/api/users", userRouter);

// Ruta Auth
router.use("/api/auth", authRouter);

// Ruta Admin
router.use("/api/admin", adminRouter);

// Ruta Products 
router.use("/api/products", productRouter);

// Ruta Requests
router.use("/api/requests", requestsRouter);

export default router;