import * as jwt from 'jsonwebtoken';

export function createToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
