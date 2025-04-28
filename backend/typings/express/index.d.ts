import { ResponseMessage } from '@common/types/src';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    payload?: string | JwtPayload;
  }
  interface Locals {
    requestId: number;
    responseMessage: ResponseMessage;
  }
}

export {};
