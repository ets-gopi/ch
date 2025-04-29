import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, SignOptions, VerifyErrors } from 'jsonwebtoken';
import createError from 'http-errors';
import JwtEnvVars from '../config/envConfig';
import { ErrorConstants } from '@common/constants/src';

export class JwtService {
  private secretKey: Secret;
  private envVars: JwtEnvVars;
  constructor() {
    this.envVars = new JwtEnvVars();
    this.secretKey = this.envVars.get('JWT_SECRET');
  }
  // Assign the token to the logging user.
  public signAccessToken = (userId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const payload = { id: userId };
      const options: SignOptions = {
        algorithm: 'HS256',
        issuer: 'chatnodebackend.com'
      };

      jwt.sign(payload, this.secretKey, options, (err, token) => {
        if (err || !token) {
          reject(
            createError(500, {
              message: `Token Generation Failed.`,
              errorCode: ErrorConstants.ERROR_SERVER_ERROR
            })
          );
        } else {
          resolve(token);
        }
      });
    });
  };

  public verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.cookies['accesstoken'];
      if (!token) {
        throw createError(401, {
          message: 'Access token is missing.',
          errorCode: ErrorConstants.ERROR_UNAUTHORIZED_ACCESS
        });
      }
      jwt.verify(token, this.secretKey, (err: VerifyErrors | null, payload?: string | jwt.JwtPayload) => {
        if (err || !payload) {
          return next(
            createError(401, {
              message: 'Invalid or Expired Token.',
              errorCode: ErrorConstants.ERROR_INVALID_TOKEN
            })
          );
        }
        req.payload = payload;
        next();
      });
    } catch (error) {
      next(error);
    }
  };
}
