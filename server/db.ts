import { and, asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { learnerFiles, learnerProgress, learnerSubmissions, learningResources, roadmapProjects, InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getLearnerProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(learnerProgress).where(eq(learnerProgress.userId, userId));
}

export async function setLearnerProgress(userId: number, moduleId: string, completed: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  if (!completed) {
    await db.delete(learnerProgress).where(and(eq(learnerProgress.userId, userId), eq(learnerProgress.moduleId, moduleId)));
    return { moduleId, completed: false };
  }

  await db.insert(learnerProgress).values({ userId, moduleId }).onDuplicateKeyUpdate({ set: { completedAt: new Date() } });
  return { moduleId, completed: true };
}

export async function getLearningResources(moduleId?: string) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(learningResources);
  const rows = moduleId ? await query.where(eq(learningResources.moduleId, moduleId)) : await query;
  return rows.sort((first, second) => first.moduleId.localeCompare(second.moduleId) || first.id - second.id);
}

export async function getRoadmapProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roadmapProjects).orderBy(asc(roadmapProjects.sortOrder));
}

export async function listLearnerFiles(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(learnerFiles).where(eq(learnerFiles.userId, userId)).orderBy(desc(learnerFiles.createdAt));
}

export async function createLearnerFile(input: typeof learnerFiles.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(learnerFiles).values(input);
  const [file] = await db.select().from(learnerFiles).where(eq(learnerFiles.fileKey, input.fileKey)).orderBy(desc(learnerFiles.id)).limit(1);
  return file;
}

export async function createLearnerSubmission(input: typeof learnerSubmissions.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(learnerSubmissions).values(input);
  const [submission] = await db.select().from(learnerSubmissions).where(eq(learnerSubmissions.userId, input.userId)).orderBy(desc(learnerSubmissions.id)).limit(1);
  return submission;
}
