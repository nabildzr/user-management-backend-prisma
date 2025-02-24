import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!process.env.JWT_SIKRIT) {
    throw new Error("JWT belum dikonfigurasi");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SIKRIT);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export default authMiddleware;
