export interface ServerEnvConfig {
  AUTH_SERVICE_PORT: number;
  USER_SERVICE_PORT: number;
  MONGO_URL: string;
  AUTH_SERVICE_DB_NAME: string;
  USER_SERVICE_DB_NAME: string;
  JWT_SECRET: string;
}
