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
exports.createNewUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const StatusError_1 = require("../../../shared/classes/StatusError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../../config/config"));
const createNewUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (email)
        throw new StatusError_1.StatusError("Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.", 400);
    if (!email || !password)
        throw new StatusError_1.StatusError("Campos obligatorios no proporcionados.", 400);
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser)
        throw new StatusError_1.StatusError("El correo electrónico ya está en uso.", 400);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new user_model_1.default({ email, password: hashedPassword });
    const result = yield user.save();
    const generateEmailTemplate = (email, password) => {
        return `
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
              <h1>Cuenta Creada Exitosamente</h1>
            </div>
            <div class="content">
              <p>Estimado Usuario,</p>
              <p>Se ha creado su cuenta exitosamente. Por favor, inicie sesión para completar sus datos y cambiar su contraseña provisional.</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Contraseña provisional:</strong> ${password}</p>
            </div>
            <div class="footer">
              <p>Saludos,<br>Equipo de Nexus Forge</p>
            </div>
          </div>
        </body>
      </html>
    `;
    };
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.EMAIL_USER,
            pass: config_1.default.EMAIL_PASSWORD,
        },
    });
    const emailTemplate = generateEmailTemplate(email, password);
    const mailOptions = {
        from: config_1.default.EMAIL_USER,
        to: email,
        subject: "Cuenta Creada Exitosamente",
        html: emailTemplate,
    };
    yield transporter.sendMail(mailOptions);
    return result;
});
exports.createNewUser = createNewUser;
