import axios from 'axios';
import { Request, Response } from 'express';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'http://localhost:8081';

export const proxySignup = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    //console.error('error', error);
    res.status(error.response.status).json(error.response.data);
  }
};

export const proxyLogin = async (req: Request, res: Response) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, req.body);
  res.status(response.status).json(response.data);
};
