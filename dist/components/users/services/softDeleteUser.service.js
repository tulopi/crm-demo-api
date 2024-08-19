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
exports.softDeleteUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const softDeleteUser = (_id, motivo_baja) => __awaiter(void 0, void 0, void 0, function* () {
    if (_id)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    const user = yield user_model_1.default.findById(_id);
    if (!user)
        throw new StatusError_1.StatusError("No se han encontrado el usuario solicitado en la base de datos.", 400);
    if (user.isDeleted === true)
        throw new StatusError_1.StatusError("El usuario ya se encuentra eliminado.", 400);
    user.isDeleted = true;
    user.motivo_baja = motivo_baja;
    user.status = "Inactivo";
    const result = yield user.save();
    return result;
});
exports.softDeleteUser = softDeleteUser;
