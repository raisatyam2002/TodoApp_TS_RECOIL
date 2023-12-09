import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();
// const SECRET: string = process.env.SECRET;
const SECRET: string = process.env.SECRET || "";

// This should be in an environment variable in a real application

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, payload) => {
      if (err || !payload || typeof payload === "string" || !payload.id) {
        return res.sendStatus(403);
      }
      req.headers["userId"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
