import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; email: string };
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
    throw new Error("JWT belum di konfigurasi");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SIKRIT) as JwtPayload & { [key: string]: any };
    const { id, email, ...rest } = decoded;
    if (!id || !email) {
      res.status(401).json({ error: "Invalid Token" });
      return;
    }
    req.user = { id, email, ...rest };
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export default authMiddleware;