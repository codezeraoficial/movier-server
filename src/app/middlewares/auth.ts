import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {promisify} from "util";

import auth from '../../config/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(' ');

  try {

    const decoded = jwt.verify(token, auth.secret, (err, decoded) =>{
      return decoded;   
    });    
    
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });    
  }
};
