import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// TODO: move out to type declaration
interface AuthRequest extends Request {
    user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach the decoded payload to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};



export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
}