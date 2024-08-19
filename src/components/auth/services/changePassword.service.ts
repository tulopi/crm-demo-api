import userModel from "../../users/models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import config from "../../../config/config";
import nodemailer from "nodemailer";
import bcrypt, { compare } from "bcrypt";
import { isValidObjectId } from "mongoose";

export const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string,
  comparePassword: string
): Promise<void> => {
  if (id || oldPassword || newPassword || comparePassword) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!id || !oldPassword || !newPassword || !comparePassword)
    throw new StatusError("Debe completar todos los campos.", 400);

  if (!isValidObjectId(id))
    throw new StatusError("El id del usuario no es valido", 400);

  const user = await userModel.findById(id);
  if (!user)
    throw new StatusError(
      "No se ha encontrado un usuario en la base de datos",
      404
    );

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch)
    throw new StatusError("La contraseña actual es incorrecta", 400);

  if (newPassword === oldPassword)
    throw new StatusError("La nueva contraseña no puede ser igual a la contraseña actual", 400);

  if (newPassword !== comparePassword)
    throw new StatusError("Las nuevas contraseñas no coinciden", 400);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

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
              <h1>Cambiar Contraseña</h1>
            </div>
            <div class="content">
              <p>Estimado/a ${
                user.first_name || user.last_name || "Usuario"
              },</p>
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

  await transporter.sendMail(mailOptions);
};
