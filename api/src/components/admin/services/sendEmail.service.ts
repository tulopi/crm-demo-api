import userModel from "../../users/models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import config from "../../../config/config";
import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
): Promise<void> => {
  if (to || subject || content) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!to) throw new StatusError("Email es requerido.", 400);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new StatusError("Formato de email inválido.", 400);
  }

  const user = await userModel.findOne({ email: to });
  if (!user) throw new StatusError("Usuario no encontrado.", 404);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.EMAIL_USER,
    to: to,
    subject: `${subject}`,
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
              <h1>${subject}</h1>
            </div>
            <div class="content">
              <p>Estimado/a ${user.first_name || "Usuario"} ${user.last_name },</p>
              <p>${content}</p>
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
