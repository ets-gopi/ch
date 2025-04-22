// defines the interface for the Environmental Variable .
export interface EnvVarsType {
  PORT: number;
  NODE_ENV: string;
}

export interface AuthEnvVarsType {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
}

export interface UserEnvVarsType {
  PORT: number;
  NODE_ENV: string;
}
