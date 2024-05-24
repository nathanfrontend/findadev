import * as schema from "./schema";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { sql as sqlProd } from "@vercel/postgres";
import { sql as sqlDev } from "drizzle-orm";
import {
  drizzle as drizzleProd,
  VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | VercelPgDatabase<typeof schema>;
}
let db: PostgresJsDatabase<typeof schema> | VercelPgDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzleProd(sqlProd, { schema }) as VercelPgDatabase<typeof schema>;
} else {
  db = drizzleDev(postgres(process.env.DATABASE_URL!), {
    schema,
  }) as PostgresJsDatabase<typeof schema>;
}

export { db };
