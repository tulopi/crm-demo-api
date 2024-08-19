import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload {
  userid: string;
  username: string;
  iat: number;
  exp?: number;
}

export interface ResponseAuth {
  payload: TokenPayload;
  token: string;
}

export interface TokenValidationResult {
  valido: boolean;
  data?: string | JwtPayload | any;
}
