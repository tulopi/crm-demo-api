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
exports.changePassword = void 0;
const user_model_1 = __importDefault(require("../../users/models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const config_1 = __importDefault(require("../../../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const changePassword = (id, oldPassword, newPassword, comparePassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (id || oldPassword || newPassword || comparePassword)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!id || !oldPassword || !newPassword || !comparePassword)
        throw new StatusError_1.StatusError("Debe completar todos los campos.", 400);
    if (!(0, mongoose_1.isValidObjectId)(id))
        throw new StatusError_1.StatusError("El id del usuario no es valido", 400);
    const user = yield user_model_1.default.findById(id);
    if (!user)
        throw new StatusError_1.StatusError("No se ha encontrado un usuario en la base de datos", 404);
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch)
        throw new StatusError_1.StatusError("La contraseña actual es incorrecta", 400);
    if (newPassword === oldPassword)
        throw new StatusError_1.StatusError("La nueva contraseña no puede ser igual a la contraseña actual", 400);
    if (newPassword !== comparePassword)
        throw new StatusError_1.StatusError("Las nuevas contraseñas no coinciden", 400);
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(newPassword, salt);
    yield user.save();
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.EMAIL_USER,
            pass: config_1.default.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: config_1.default.EMAIL_USER,
        to: user.email,
        subject: "Restaurar Contraseña",
        html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f0f0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .content {
              padding: 20px;
              text-align: left;
            }
            .footer {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
            .button {
              display: inline-block;
              background-color: #ffffff;
              color: #007bff;
              border: 2px solid #007bff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Cambiar Contraseña</h1>
            </div>
            <div class="content">
              <p>Estimado/a ${user.first_name || user.last_name || "Usuario"},</p>
              <p>Su contraseña ha sido actualizada.</p>
            </div>
            <div class="footer">
              <p>Saludos,<br>Equipo de Nexus Forge</p>
            </div>
          </div>
        </body>
      </html>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.changePassword = changePassword;
