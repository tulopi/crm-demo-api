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
exports.createNewProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../../users/models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const createNewProduct = (name, description, price, user, expirationDate) => __awaiter(void 0, void 0, void 0, function* () {
    if (name || description || price || user)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!name || !description || !price || !user) {
        throw new StatusError_1.StatusError("Los campos 'name', 'description', 'user' y 'price' son requeridos", 400);
    }
    let userId;
    const userFromDB = yield user_model_1.default.findOne({ email: user });
    if (!userFromDB) {
        throw new StatusError_1.StatusError(`No se encontró ningún usuario con el email ${user}`, 400);
    }
    userId = userFromDB._id;
    const newProduct = new product_model_1.default({
        name,
        description,
        price,
        expirationDate,
        user: userId,
    });
    const savedProduct = yield newProduct.save();
    return savedProduct;
});
exports.createNewProduct = createNewProduct;
