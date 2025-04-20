import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  res.json({ id: req.params.id, name: "Test User" });
};
