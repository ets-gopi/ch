import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import createError from 'http-errors';
import { LoggerEnvVarsType } from '@common/interfaces/src';
class LoggerEnvVars {
  private envFile: string;
  private envVarsObj: LoggerEnvVarsType;
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
  private validateEnvFile(): LoggerEnvVarsType {
    const envVarsSchema = Joi.object()
      .keys({
        MAX_FILE_SIZE: Joi.string().required().description('MAX FILE SIZE'),
        MAX_FILES_ROTATION: Joi.string().required().description('Max Age for Log Files'),
        LOG_LEVEL: Joi.string().required().description('add the log level')
      })
      .unknown();
    const validateObj = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
    if (validateObj.error) {
      throw createError(500, `Config Validation Error:${validateObj.error.message}`);
    }

    return {
      ...validateObj.value
    } as LoggerEnvVarsType;
  }
  public get<T extends keyof LoggerEnvVarsType>(key: T): LoggerEnvVarsType[T] {
    return this.envVarsObj[key];
  }
}

export default LoggerEnvVars;
