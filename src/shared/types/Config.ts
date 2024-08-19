export interface Config {
  PORT: number;
  mongodb: MongoDb;
  JWT_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string
  FRONT_URL: string;
}

export interface MongoDb {
  mongoUrl: string;
  options: MongoDbOptions;
}

export interface MongoDbOptions {
  serverSelectionTimeoutMS: number;
}
