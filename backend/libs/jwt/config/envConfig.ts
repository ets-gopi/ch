import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import createError from 'http-errors';
import { JwtEnvVarsType } from '@common/interfaces/src';
class JwtEnvVars {
  private envFile: string;
  private envVarsObj: JwtEnvVarsType;
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
  private validateEnvFile(): JwtEnvVarsType {
    const envVarsSchema = Joi.object().keys({ JWT_SECRET: Joi.string().required() }).unknown();
    const validateObj = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
    if (validateObj.error) {
      throw createError(500, `Config Validation Error:${validateObj.error.message}`);
    }

    return {
      ...validateObj.value
    } as JwtEnvVarsType;
  }
  public get<T extends keyof JwtEnvVarsType>(key: T): JwtEnvVarsType[T] {
    return this.envVarsObj[key];
  }
}

export default JwtEnvVars;
