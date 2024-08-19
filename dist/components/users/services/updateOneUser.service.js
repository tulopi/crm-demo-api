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
exports.updateOneUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const mongoose_1 = require("mongoose");
const updateOneUser = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    if (id)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new StatusError_1.StatusError("No hay campos para actualizar", 400);
    }
    if (!(0, mongoose_1.isValidObjectId)(id))
        throw new StatusError_1.StatusError("El id proporcionado no es válido", 400);
    const user = yield user_model_1.default.findById(id);
    if (!user)
        throw new StatusError_1.StatusError("No se ha encontrado el usuario solicitado en la base de datos.", 400);
    const { first_name, last_name, email, telefono, dni, status, motivo_baja, address } = req.body;
    if (first_name) {
        user.first_name = first_name;
    }
    if (last_name) {
        user.last_name = last_name;
    }
    if (email) {
        user.email = email;
    }
    if (telefono) {
        user.telefono = telefono;
    }
    if (dni) {
        user.dni = dni;
    }
    if (status) {
        user.status = status;
    }
    if (motivo_baja) {
        user.motivo_baja = motivo_baja;
    }
    if (address) {
        if (address.address) {
            user.address.address = address.address;
        }
        if (address.locality) {
            user.address.locality = address.locality;
        }
        if (address.district) {
            user.address.district = address.district;
        }
        if (address.number) {
            user.address.number = address.number;
        }
        if (address.postal_code) {
            user.address.postal_code = address.postal_code;
        }
        if (address.nationality) {
            user.address.nationality = address.nationality;
        }
    }
    yield user.save();
    return user;
});
exports.updateOneUser = updateOneUser;
