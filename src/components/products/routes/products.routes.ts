import { Router } from "express";
import * as controllers from "../controllers";

const productRouter = Router();

// [GET] 🌐/api/products
productRouter.get("/", controllers.getAllProducts);

// [GET] 🌐/api/products/expiration
productRouter.get("/expiration", controllers.expirationReminder);

// [GET] 🌐/api/products/:id
productRouter.get("/:id", controllers.getOneProduct);

// [GET] 🌐/api/products/client/:id
productRouter.get("/client/:id", controllers.getAllProductsClient);

// [POST] 🌐/api/products
productRouter.post("/", controllers.createNewProduct);

// [PUT] 🌐/api/products/:id
productRouter.put("/:id", controllers.updateOneProduct);

// [DELETE] 🌐/api/products/:id
productRouter.delete("/:id", controllers.deleteProduct);

export default productRouter;