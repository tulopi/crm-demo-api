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
exports.restorePassword = exports.sendRestorePasswordEmail = void 0;
const user_model_1 = __importDefault(require("../../users/models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendRestorePasswordEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!email)
        throw new StatusError_1.StatusError("Email es requerido.", 400);
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new StatusError_1.StatusError("Usuario no encontrado.", 404);
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.JWT_SECRET, { expiresIn: "1h" });
    const restoreLink = `${config_1.default.FRONT_URL}restore/${token}`;
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
              <h1>Restaurar Contraseña</h1>
            </div>
            <div class="content">
              <p>Estimado ${user.first_name || user.last_name || 'Usuario'},</p>
              <p>Haga clic en el siguiente enlace para restaurar su contraseña:</p>
              <p><a class="button" href="${restoreLink}">Restaurar Contraseña</a></p>
              <p>Si no solicitó restablecer su contraseña, puede ignorar este correo electrónico de manera segura.</p>
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
exports.sendRestorePasswordEmail = sendRestorePasswordEmail;
const restorePassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token || newPassword)
            throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        console.log(decoded);
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user)
            throw new StatusError_1.StatusError("Usuario no encontrado.", 404);
        user.password = yield bcrypt_1.default.hash(newPassword, 10);
        yield user.save();
    }
    catch (err) {
        throw new StatusError_1.StatusError("Token inválido o expirado.", 400);
    }
});
exports.restorePassword = restorePassword;
