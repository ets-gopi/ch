import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import createError from 'http-errors';
import { MulterEnvVarsType } from '@common/interfaces/src';
export class MulterEnvVars {
  private envFile: string;
  private envVarsObj: MulterEnvVarsType;
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
  private validateEnvFile(): MulterEnvVarsType {
    const envVarsSchema = Joi.object()
      .keys({
        MAX_FILE_SIZE: Joi.string().required().description('MAX FILE SIZE'),
        UPLOAD_DIR: Joi.string().required().description('directory for images Files')
      })
      .unknown();
    const validateObj = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
    if (validateObj.error) {
      throw createError(500, `Config Validation Error:${validateObj.error.message}`);
    }

    return {
      ...validateObj.value
    } as MulterEnvVarsType;
  }
  public get<T extends keyof MulterEnvVarsType>(key: T): MulterEnvVarsType[T] {
    return this.envVarsObj[key];
  }
}
