import { defineConfig } from "drizzle-kit";
import "@/db/envConfig";
export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  out: "./db/migrations",
  dbCredentials: {
    connectionString:
      process.env.NODE_ENV === "production" ? process.env.POSTGRES_URL! : "",
  },
  verbose: true,
  strict: true,
});
