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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config/config"));
const loggers_1 = require("../../loggers");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUrl = config_1.default.mongodb.mongoUrl;
    try {
        if (typeof mongoUrl === "string") {
            yield mongoose_1.default.connect(mongoUrl, config_1.default.mongodb.options);
            (0, loggers_1.logInfo)("Base de datos MongoDB conectada");
        }
        else {
            (0, loggers_1.logError)("URL de MongoDB no está definida en la configuración");
        }
    }
    catch (error) {
        (0, loggers_1.logError)("Error al conectar con la base de datos MongoDB: " + error);
    }
});
exports.default = connectDB;
