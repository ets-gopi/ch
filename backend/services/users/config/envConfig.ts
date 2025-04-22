import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import createError from "http-errors";
import { UserEnvVarsType } from "@common/interfaces/src";
class EnvVars {
  private envFile: string;
  private envVarsObj: UserEnvVarsType;
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
  private validateEnvFile(): UserEnvVarsType {
    const envVarsSchema = Joi.object()
      .keys({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
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
    } as UserEnvVarsType;
  }
  public get<T extends keyof UserEnvVarsType>(key: T): UserEnvVarsType[T] {
    return this.envVarsObj[key];
  }
}

export default EnvVars;
