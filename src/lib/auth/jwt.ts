// src/lib/auth/jwt.ts
import { env } from '@/env';
import jwt from 'jsonwebtoken';

const JWT_SECRET = env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '1d';

export type JwtPayload = {
  sub: number | undefined;          // userId
  pid: number | undefined;          // personId
  login: string;
};

export function signToken(payload: JwtPayload) {
	// return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
	return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
