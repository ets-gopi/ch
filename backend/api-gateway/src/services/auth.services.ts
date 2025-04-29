import axios, { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
import EnvVars from '../../config/envConfig';

export class AuthServices {
  private envVarsObj: EnvVars;
  private axiosInstance: AxiosInstance;
  constructor() {
    this.envVarsObj = new EnvVars();
    this.axiosInstance = this.createAxiosInstance();
  }
  private createAxiosInstance() {
    return axios.create({
      baseURL: this.envVarsObj.get('AUTH_SERVICE_BASE_URL')
    });
  }

  public proxyRegister = async (req: Request, res: Response) => {
    try {
      const response = await this.axiosInstance.post('/register', req.body);
      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(error.response.status).json(error.response.data);
    }
  };
  public proxyLogin = async (req: Request, res: Response) => {
    try {
      const response = await this.axiosInstance.post(`/login`, req.body);
      res.status(response.status).json(response.data);
    } catch (error: any) {
      res.status(error.response.status).json(error.response.data);
    }
  };
}
