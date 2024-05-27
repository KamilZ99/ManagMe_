import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const tokenSecret = process.env.TOKEN_SECRET as string;

interface TokenPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(403);

  try {
    const decoded = jwt.verify(token, tokenSecret) as TokenPayload;
    const user = await User.findById(decoded.id);
    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
