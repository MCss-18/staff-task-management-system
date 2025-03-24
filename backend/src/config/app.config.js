import { getEnv } from "../common/utils/get-env.js";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  FRONTEND_URL: getEnv("FRONTEND_URL", "localhost"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  DB: {
    DB_HOST: getEnv("DB_HOST"),
    DB_DATABASE: getEnv("DB_DATABASE"),
    DB_USER: getEnv("DB_USER"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    DB_PORT: getEnv("DB_PORT"),
  },
  JWT: {
    SECRET: getEnv("JWT_PRIVATE_KEY"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m")
  },
  SMTP_HOST: getEnv("SMTP_HOST"),
  SMTP_PORT: getEnv("SMTP_PORT"),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASS: getEnv("SMTP_PASS"),
  SMTP_SECURE: getEnv("SMTP_SECURE")
});

export const config = appConfig();