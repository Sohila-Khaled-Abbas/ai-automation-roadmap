import { int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const learnerProgress = mysqlTable(
  "learnerProgress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    moduleId: varchar("moduleId", { length: 64 }).notNull(),
    completedAt: timestamp("completedAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("learnerProgress_user_module_unique").on(table.userId, table.moduleId)],
);

export const learningResources = mysqlTable("learningResources", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: varchar("moduleId", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  provider: varchar("provider", { length: 160 }).notNull(),
  resourceType: mysqlEnum("resourceType", ["course", "guide", "template", "reference", "video"]).notNull(),
  effort: varchar("effort", { length: 64 }).notNull(),
  source: varchar("source", { length: 160 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const learnerFiles = mysqlTable("learnerFiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  filename: varchar("filename", { length: 255 }).notNull(),
  contentType: varchar("contentType", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 768 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 1024 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const learnerSubmissions = mysqlTable("learnerSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  submissionType: mysqlEnum("submissionType", ["project", "resource"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  url: varchar("url", { length: 1024 }),
  moduleId: varchar("moduleId", { length: 64 }),
  status: mysqlEnum("status", ["pending", "reviewed", "accepted", "declined"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const roadmapProjects = mysqlTable(
  "roadmapProjects",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 96 }).notNull(),
    moduleId: varchar("moduleId", { length: 64 }).notNull(),
    route: varchar("route", { length: 64 }).notNull(),
    level: varchar("level", { length: 96 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    summary: text("summary").notNull(),
    recipeJson: text("recipeJson").notNull(),
    proof: text("proof").notNull(),
    templateLabel: varchar("templateLabel", { length: 255 }).notNull(),
    templateUrl: varchar("templateUrl", { length: 1024 }).notNull(),
    provider: varchar("provider", { length: 160 }).notNull(),
    source: varchar("source", { length: 160 }).notNull(),
    sortOrder: int("sortOrder").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("roadmapProjects_slug_unique").on(table.slug)],
);

export type LearnerProgress = typeof learnerProgress.$inferSelect;
export type LearningResource = typeof learningResources.$inferSelect;
export type LearnerFile = typeof learnerFiles.$inferSelect;
export type LearnerSubmission = typeof learnerSubmissions.$inferSelect;
export type RoadmapProject = typeof roadmapProjects.$inferSelect;
