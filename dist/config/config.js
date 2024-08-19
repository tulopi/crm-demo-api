"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080"),
    mongodb: {
        mongoUrl: (_b = process.env.MONGO_URI) !== null && _b !== void 0 ? _b : "",
        options: {
            serverSelectionTimeoutMS: 5000,
        },
    },
    JWT_SECRET: (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "",
    EMAIL_USER: (_d = process.env.EMAIL) !== null && _d !== void 0 ? _d : "",
    EMAIL_PASSWORD: (_e = process.env.PASSWORD) !== null && _e !== void 0 ? _e : "",
    FRONT_URL: (_f = process.env.FRONT_URL) !== null && _f !== void 0 ? _f : ""
};
exports.default = config;
