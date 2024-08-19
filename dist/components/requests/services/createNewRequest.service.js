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
exports.createNewRequest = void 0;
const requests_model_1 = __importDefault(require("../models/requests.model"));
const user_model_1 = __importDefault(require("../../users/models/user.model"));
const mongoose_1 = require("mongoose");
const StatusError_1 = require("../../../shared/classes/StatusError");
const createNewRequest = (user, telefono, product, description, ticket) => __awaiter(void 0, void 0, void 0, function* () {
    if (user)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!user) {
        throw new StatusError_1.StatusError("El campo user es obligatorio", 400);
    }
    if (!(0, mongoose_1.isValidObjectId)(user)) {
        throw new StatusError_1.StatusError("El campo user tiene que ser un ObjectId válido", 400);
    }
    const userFromDB = yield user_model_1.default.findById(user);
    if (!userFromDB) {
        throw new StatusError_1.StatusError(`No se encontró ningún usuario con el id solicitado`, 400);
    }
    const newRequest = new requests_model_1.default({
        user: user,
        telefono: telefono,
        product: product,
        description: description,
        ticket: ticket
    });
    yield newRequest.save();
    return newRequest;
});
exports.createNewRequest = createNewRequest;
