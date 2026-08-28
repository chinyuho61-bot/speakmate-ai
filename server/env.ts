import "dotenv/config";

export const ENV = {
  port: parseInt(process.env.PORT || "8787", 10),
  jwtSecret: process.env.JWT_SECRET || "dev-only-insecure-secret-change-me",
  dbPath: process.env.DB_PATH || "./data/speakmate.sqlite",
  nodeEnv: process.env.NODE_ENV || "development",
};
