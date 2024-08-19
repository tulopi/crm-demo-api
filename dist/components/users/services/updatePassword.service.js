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
exports.updatePassword = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updatePassword = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    if (id)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new StatusError_1.StatusError("No hay campos para actualizar", 400);
    }
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new StatusError_1.StatusError("El id proporcionado no es válido", 400);
    }
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new StatusError_1.StatusError("No se ha encontrado el usuario solicitado en la base de datos.", 400);
    }
    const { password } = req.body;
    if (yield bcrypt_1.default.compare(password, user.password)) {
        throw new StatusError_1.StatusError("La contraseña no debe ser igual a la anterior", 401);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    user.password = hashedPassword;
    yield user.save();
    return user;
});
exports.updatePassword = updatePassword;
