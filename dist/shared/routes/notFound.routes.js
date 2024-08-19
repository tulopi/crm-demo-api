"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notFound_controller_1 = require("../controllers/notFound.controller");
const notFoundRouter = (0, express_1.Router)();
notFoundRouter.use("*", notFound_controller_1.notFound);
exports.default = notFoundRouter;
