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
exports.softDeleteRequest = void 0;
const requests_model_1 = __importDefault(require("../models/requests.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const softDeleteRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    const request = yield requests_model_1.default.findById(id);
    if (!request)
        throw new StatusError_1.StatusError("No se han encontrado la request solicitada en la base de datos.", 400);
    request.isActive = false;
    request.save();
    return request;
});
exports.softDeleteRequest = softDeleteRequest;
