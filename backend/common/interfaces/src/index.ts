// defines the interface for the Environmental Variable .
export interface EnvVarsType {
  PORT: number;
  NODE_ENV: string;
  AUTH_SERVICE_BASE_URL: string;
}

export interface AuthEnvVarsType {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  MONGO_URI: string;
  DB_NAME: string;
}

export interface UserEnvVarsType {
  PORT: number;
  NODE_ENV: string;
}

export interface LoggerEnvVarsType {
  LOG_LEVEL: string;
  MAX_FILE_SIZE: string;
  MAX_FILES_ROTATION: string;
}
