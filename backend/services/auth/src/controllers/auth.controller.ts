import { NextFunction, Request, Response } from "express";
export const signup = (req: Request, res: Response) => {
  res.json({ message: "User signed up" });
};

export const login = (req: Request, res: Response) => {
  // Login logic here (check password, return JWT)
  res.json({ token: "jwt-token-example" });
};
