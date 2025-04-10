import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization']
  if(!authHeader) {
    return void res.status(403).json({ message: "No Authorization Header" });
  }
  const token = (authHeader! as string).split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = { username: decoded.username };
    next();
    return;
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
