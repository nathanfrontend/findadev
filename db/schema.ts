import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  boolean,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  privacy: boolean("privacy"),
});

export const userRelations = relations(users, ({ many }) => ({
  rooms: many(devRoom),
  followers: many(follows),
  following: many(follows),
}));

export const follows = pgTable(
  "follows",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .primaryKey(),
    targetUserId: text("targetUserId").notNull(),
  },
  (table) => ({
    user: index("usersFollowing_user_idx").on(table.userId),
    following: index("usersFollowing_following_idx").on(table.targetUserId),
  }),
);
export const followsRelations = relations(follows, ({ one }) => ({
  user: one(users, {
    fields: [follows.userId],
    references: [users.id],
    relationName: "followers",
  }),
  follower: one(users, {
    fields: [follows.targetUserId],
    references: [users.id],
    relationName: "following",
  }),
}));
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const devRoom = pgTable("room", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  tags: text("tags")
    .notNull()
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  githubRepo: text("githubRepo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const roomRelations = relations(devRoom, ({ one, many }) => ({
  owner: one(users, {
    fields: [devRoom.userId],
    references: [users.id],
  }),
}));

// export const group = pgTable("group", {
//   id: uuid("id")
//     .default(sql`gen_random_uuid()`)
//     .notNull()
//     .primaryKey(),
//   ownerId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   name: text("name").notNull(),
//   description: text("description"),
//   groupUsers: text("users").array().notNull(),

//   createdAt: timestamp("createdAt").defaultNow().notNull(),
//   updatedAt: timestamp("updatedAt").defaultNow().notNull(),
// });

// export const groupRelations = relations(group, ({ one, many }) => ({
//   owner: one(users, {
//     fields: [group.ownerId],
//     references: [users.id],
//   }),
// }));

export const devTags = pgTable("devTags", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),

  label: text("label").notNull(),
  value: text("value").notNull(),
  count: text("count").notNull(),
});
export type Room = { room: typeof devRoom.$inferSelect } & {
  user: typeof users.$inferSelect;
};
export type TAGS = typeof devTags.$inferSelect;
