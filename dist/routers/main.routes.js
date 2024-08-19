"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("../components/users/routes/users.routes"));
const auth_routes_1 = __importDefault(require("../components/auth/routes/auth.routes"));
const admin_routes_1 = __importDefault(require("../components/admin/routes/admin.routes"));
const products_routes_1 = __importDefault(require("../components/products/routes/products.routes"));
const requests_routes_1 = __importDefault(require("../components/requests/routes/requests.routes"));
const router = (0, express_1.Router)();
// Ruta Users
router.use("/api/users", users_routes_1.default);
// Ruta Auth
router.use("/api/auth", auth_routes_1.default);
// Ruta Admin
router.use("/api/admin", admin_routes_1.default);
// Ruta Products 
router.use("/api/products", products_routes_1.default);
// Ruta Requests
router.use("/api/requests", requests_routes_1.default);
exports.default = router;
