import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import createError from "http-errors";
import { AuthEnvVarsType } from "@common/interfaces/src";
class AuthEnvVars {
  private envFile: string;
  private envVarsObj: AuthEnvVarsType;
  constructor() {
    this.envFile =
      process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod";
    this.loadEnvFile();
    this.envVarsObj = this.validateEnvFile();
  }
  private loadEnvFile(): void {
    dotenv.config({
      path: path.resolve(__dirname, `../${this.envFile}`),
    });
  }
  private validateEnvFile(): AuthEnvVarsType {
    const envVarsSchema = Joi.object()
      .keys({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      })
      .unknown();
    const validateObj = envVarsSchema
      .prefs({ errors: { label: "key" } })
      .validate(process.env);
    if (validateObj.error) {
      throw createError(
        500,
        `Config Validation Error:${validateObj.error.message}`
      );
    }

    return {
      ...validateObj.value,
    } as AuthEnvVarsType;
  }
  public get<T extends keyof AuthEnvVarsType>(key: T): AuthEnvVarsType[T] {
    return this.envVarsObj[key];
  }
}

export default AuthEnvVars;
