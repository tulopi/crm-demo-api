import nodemailer from 'nodemailer';
import config from "../../../config/config";
import productModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";
import userModel from '../../users/models/user.model';

export const expirationReminder = async (): Promise<void> => {
  const today = new Date();
  const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const products = await productModel.find({
    expirationDate: { $lte: oneWeekFromNow },
    isDeleted: { $ne: true }
  });

 

  if (products.length === 0) {
    throw new StatusError(
      "No hay productos próximos a vencer en los próximos 7 días.",
      400
    );
  }

  if (products.length !== 0) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD,
    },
  });

  for (const product of products) {
    const expirationDate = new Date(product.expirationDate);
    const user = await userModel.findById(product.user);
    if (!user) {
      throw new StatusError(
        `No se encontró el usuario asociado al producto ${product.name}`,
        404
      );
    }

    const mailOptions = {
      from: config.EMAIL_USER,
      to: user.email,
      subject: "Recordatorio de Vencimiento de Servicio",
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
                <h1>Recordatorio de Vencimiento de Servicio</h1>
              </div>
              <div class="content">
                <p>Estimado ${user.first_name } ${user.last_name},</p>
                <p>Le informamos que su servicio <strong>${product.name}</strong> está por vencer.</p>
                <p>Si desea renovar su servicio, contáctese con la administración.</p>
                <p>De no renovar, su servicio será dado de baja automáticamente.</p>
                <p>Si tiene alguna pregunta, no dude en ponerse en contacto con nosotros.</p>
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
  }
};
