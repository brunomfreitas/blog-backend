// src/http/middlewares/require-auth.ts
import { verifyToken } from '@/lib/auth/jwt';
import { NextFunction, Request, Response } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = verifyToken(token);
    (req as any).user = payload; // { sub, pid, login }
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
