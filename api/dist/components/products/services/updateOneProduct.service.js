"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const updateOneProduct = (id, name, description, price, expirationDate) => __awaiter(void 0, void 0, void 0, function* () {
    if (name || description || price)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!name || !description || !price) {
        throw new StatusError_1.StatusError("Name, description, y price son requeridos", 400);
    }
    const productToUpdate = yield product_model_1.default.findById(id);
    if (!productToUpdate) {
        throw new Error("El producto no se ha encontrado en la base de datos");
    }
    if (expirationDate !== undefined) {
        productToUpdate.expirationDate = expirationDate;
    }
    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.price = price;
    const updatedProduct = yield productToUpdate.save();
    return updatedProduct;
});
exports.updateOneProduct = updateOneProduct;
