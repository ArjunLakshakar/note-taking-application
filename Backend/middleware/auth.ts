import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
