"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
// Importacion de Routers
const notFound_routes_1 = __importDefault(require("./shared/routes/notFound.routes"));
// Importacion de loggers
const index_1 = require("./loggers/index");
const database_1 = __importDefault(require("./shared/database/database"));
const main_routes_1 = __importDefault(require("./routers/main.routes"));
//------------------------------------------------------------------------
// server
const app = (0, express_1.default)();
// configuracion server
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
//--------------------------------------------
// Configuración del limitador de tasa
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 50, // Límite de 100 peticiones por IP por ventana de tiempo
    message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.",
});
// Aplica el limitador de tasa a todas las peticiones
app.use(limiter);
//--------------------------------------------
// logging general
app.use((req, res, next) => {
    (0, index_1.logInfo)(`${req.method} ${req.url}`);
    next();
});
app.get("/api", (req, res) => {
    res.send("Bienvenido al CRM!");
});
// Router Api
app.use(main_routes_1.default);
//--------------------------------------------
// Ruta inexistente
app.use(notFound_routes_1.default);
//--------------------------------------------
// Manejo de errores
app.use((error, req, res, next) => {
    var _a;
    const statusError = error;
    const status = (_a = statusError.status) !== null && _a !== void 0 ? _a : 500;
    const message = statusError.message;
    return res.status(status).json({ status, message });
});
//--------------------------------------------
// Conexión a la base de datos MongoDB
(0, database_1.default)();
exports.default = app;
