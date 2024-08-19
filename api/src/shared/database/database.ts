import mongoose from "mongoose";

import config from "../../config/config";
import { logError, logInfo } from "../../loggers";

const connectDB = async (): Promise<void> => {
  const mongoUrl = config.mongodb.mongoUrl;

  try {
    if (typeof mongoUrl === "string") {
      await mongoose.connect(mongoUrl, config.mongodb.options);
      logInfo("Base de datos MongoDB conectada");
    } else {
      logError("URL de MongoDB no está definida en la configuración");
    }
  } catch (error) {
    logError("Error al conectar con la base de datos MongoDB: " + error);
  }
};

export default connectDB;
