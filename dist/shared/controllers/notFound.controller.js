"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const index_1 = require("../../loggers/index");
const notFound = (req, res, next) => {
    (0, index_1.logWarning)(`${req.method} ${req.originalUrl} - Ruta inexistente`);
    return res.status(404).json({ message: "Ups, Ruta inexistente..." });
};
exports.notFound = notFound;
