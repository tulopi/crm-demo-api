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
exports.loginUser = void 0;
const user_model_1 = __importDefault(require("../../users/models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new StatusError_1.StatusError("Campos obligatorios no proporcionados.", 400);
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new StatusError_1.StatusError("Credenciales inválidas.", 401);
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new StatusError_1.StatusError("Credenciales inválidas.", 401);
    user.lastConnection = new Date();
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
    return { token };
});
exports.loginUser = loginUser;
