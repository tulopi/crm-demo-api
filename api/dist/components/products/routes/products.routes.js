"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("../controllers"));
const productRouter = (0, express_1.Router)();
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
exports.default = productRouter;
