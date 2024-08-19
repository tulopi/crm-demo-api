"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const config_1 = __importDefault(require("./config/config"));
const index_1 = require("./loggers/index");
const server_1 = __importDefault(require("./server"));
const PORT = config_1.default.PORT;
const server = (0, http_1.createServer)(server_1.default);
const enableExpress = () => {
    server.listen(PORT, () => {
        (0, index_1.logInfo)(`🚀 Corriendo servidor en http://localhost:${PORT}...`);
    });
    server.on("error", (error) => (0, index_1.logError)(`Error en servidor ${error}`));
};
enableExpress();
