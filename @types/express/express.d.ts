import { JwtPayload } from "jsonwebtoken";
import * as express from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}
