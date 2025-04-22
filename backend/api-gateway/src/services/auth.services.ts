import axios from "axios";
import { Request, Response } from "express";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "http://localhost:8081";

export const proxySignup = async (req: Request, res: Response) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, req.body);
  res.status(response.status).json(response.data);
};

export const proxyLogin = async (req: Request, res: Response) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, req.body);
  res.status(response.status).json(response.data);
};
