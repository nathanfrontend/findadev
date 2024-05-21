import * as schema from "./schema";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
// declare global {
//   // eslint-disable-next-line no-var -- only var works here
//   var db: PostgresJsDatabase<typeof schema> | undefined;
// }
// let db: PostgresJsDatabase<typeof schema>;

// if (process.env.NODE_ENV === "production") {
//   db = drizzle(postgres(process.env.POSTGRES_URL!), { schema });
// } else {
//   if (!global.db) {
//     global.db = drizzle(postgres(process.env.POSTGRES_URL!), { schema });
//   }

//   db = global.db;
// }

const db = drizzle(sql, { schema });
export { db };
