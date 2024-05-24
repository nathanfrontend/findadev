import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  out: "./db/migrations",
  dbCredentials: {
    connectionString:
      process.env.NODE_ENV === "production"
        ? process.env.POSTGRES_URL!
        : process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
