import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import createError from 'http-errors';
import { EnvVarsType } from '@common/interfaces/src';
class EnvVars {
  private envFile: string;
  private envVarsObj: EnvVarsType;
  constructor() {
    this.envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod';
    this.loadEnvFile();
    this.envVarsObj = this.validateEnvFile();
  }
  private loadEnvFile(): void {
    dotenv.config({
      path: path.resolve(__dirname, `../${this.envFile}`)
    });
  }
  private validateEnvFile(): EnvVarsType {
    const envVarsSchema = Joi.object()
      .keys({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        AUTH_SERVICE_BASE_URL: Joi.string().required()
      })
      .unknown();
    const validateObj = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
    if (validateObj.error) {
      throw createError(500, `Config Validation Error:${validateObj.error.message}`);
    }

    return {
      ...validateObj.value
    } as EnvVarsType;
  }
  public get<T extends keyof EnvVarsType>(key: T): EnvVarsType[T] {
    return this.envVarsObj[key];
  }
}

export default EnvVars;
