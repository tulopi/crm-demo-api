import userModel from "../../users/models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import jwt from "jsonwebtoken";
import config from "../../../config/config";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const sendRestorePasswordEmail = async (
  email: string
): Promise<void> => {
  if (email) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!email) throw new StatusError("Email es requerido.", 400);

  const user = await userModel.findOne({ email });
  if (!user) throw new StatusError("Usuario no encontrado.", 404);

  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const restoreLink = `${config.FRONT_URL}restore/${token}`;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.EMAIL_USER,
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

  await transporter.sendMail(mailOptions);
};

export const restorePassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    if (token || newPassword) throw new StatusError(
      "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
      400
    );
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      id: string;
      email: string;
    };
    console.log(decoded)
    const user = await userModel.findById(decoded.id);
    if (!user) throw new StatusError("Usuario no encontrado.", 404);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  } catch (err) {
    throw new StatusError("Token inválido o expirado.", 400);
  }
};
