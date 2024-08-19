import userModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import config from "../../../config/config";


export const createNewUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  if (email) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  
  


  if (!email || !password) throw new StatusError("Campos obligatorios no proporcionados.", 400);

  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new StatusError("El correo electrónico ya está en uso.", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ email, password: hashedPassword });
  const result = await user.save();

  const generateEmailTemplate = (email: string, password: string) => {
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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const emailTemplate = generateEmailTemplate(email, password);

  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: "Cuenta Creada Exitosamente",
    html: emailTemplate,
  };

  await transporter.sendMail(mailOptions);

  return result;
};
