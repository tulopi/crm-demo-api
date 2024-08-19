import dotenv from "dotenv";
import { Config } from "../shared/types/Config";

dotenv.config();

const config: Config = {
  PORT: parseInt(process.env.PORT ?? "8080"),
  mongodb: {
    mongoUrl: process.env.MONGO_URI ?? "",
    options: {
      serverSelectionTimeoutMS: 5000,
    },
  },
  JWT_SECRET: process.env.JWT_SECRET ?? "" ,
  EMAIL_USER: process.env.EMAIL ?? "",
  EMAIL_PASSWORD: process.env.PASSWORD ?? "",
  FRONT_URL: process.env.FRONT_URL ?? ""
};

export default config;
