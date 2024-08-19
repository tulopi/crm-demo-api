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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restorePassword = exports.sendRestorePasswordEmail = void 0;
const services = __importStar(require("../services/restorePassword.service"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const loggers_1 = require("../../../loggers");
const sendRestorePasswordEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield services.sendRestorePasswordEmail(email);
        res.status(200).json({ message: "Correo de restauración enviado." });
    }
    catch (err) {
        (0, loggers_1.logError)(err);
        (0, loggers_1.logWarning)(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        if (err instanceof StatusError_1.StatusError) {
            next(err);
        }
        else {
            const statusError = new StatusError_1.StatusError("Error interno del servidor: " + err, 500);
            next(statusError);
        }
    }
});
exports.sendRestorePasswordEmail = sendRestorePasswordEmail;
const restorePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("llego aca", req.body);
        const { token, newPassword } = req.body;
        yield services.restorePassword(token, newPassword);
        res.status(200).json({ message: "Contraseña restaurada con éxito." });
    }
    catch (err) {
        (0, loggers_1.logError)(err);
        (0, loggers_1.logWarning)(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        if (err instanceof StatusError_1.StatusError) {
            next(err);
        }
        else {
            const statusError = new StatusError_1.StatusError("Error interno del servidor: " + err, 500);
            next(statusError);
        }
    }
});
exports.restorePassword = restorePassword;
