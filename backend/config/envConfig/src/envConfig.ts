import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import createError from 'http-errors';
import { ServerEnvConfig } from '@shared/interfaces/src';

export class EnvManager {
  private envVarsObj: ServerEnvConfig;
  constructor() {
    this.loadEnvFile();
    this.envVarsObj = this.validateEnvFile();
  }
  private loadEnvFile(): void {
    const env = process.env.NODE_ENV || 'development';
    const envFile = `../../.env.${env}`;
    const envPath = path.resolve(process.cwd(), envFile);

    dotenv.config({
      path: envPath
    });
  }
  private validateEnvFile(): ServerEnvConfig {
    const envVarsSchema = Joi.object()
      .keys({
        AUTH_SERVICE_PORT: Joi.number().required(),
        USER_SERVICE_PORT: Joi.number().required(),
        MONGO_URL: Joi.string().required().description('MongoDB URL'),
        AUTH_SERVICE_DB_NAME: Joi.string().required().description('Auth service database name'),
        USER_SERVICE_DB_NAME: Joi.string().required().description('User service database name'),
        JWT_SECRET: Joi.string().required().description('JWT Secret')
      })
      .unknown();
    const { error, value } = envVarsSchema.validate(process.env, { abortEarly: false, allowUnknown: true, errors: { label: 'key' } });

    if (error) {
      const formattedErrors = error.details.map((e) => `• ${e.message}`).join('\n');
      throw createError(500, `Invalid environment configuration:\n${formattedErrors}`);
    }

    return value as ServerEnvConfig;
  }
  public get<T extends keyof ServerEnvConfig>(key: T): ServerEnvConfig[T] {
    return this.envVarsObj[key];
  }
}
