import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  return next();
}

export function authorizeJWT(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | NextFunction | void {
  try {
    const token = req.headers['authorization'] as string;

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: 'Usuário não autorizado'
    });
  }

}