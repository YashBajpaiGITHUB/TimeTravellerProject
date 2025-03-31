import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlistSubscribers = pgTable("waitlist_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const historicalSearches = pgTable("historical_searches", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  type: text("type").notNull().default('text'),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  imageData: text("image_data"),
});

export const historicalData = pgTable("historical_data", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  timeline: jsonb("timeline").notNull().$type<{ year: number, description: string }[]>(),
  images: jsonb("images").$type<string[]>(),
  searchId: integer("search_id").references(() => historicalSearches.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSubscriberSchema = createInsertSchema(waitlistSubscribers).pick({
  email: true,
});

export const insertHistoricalSearchSchema = createInsertSchema(historicalSearches).pick({
  query: true,
  type: true,
  userId: true,
  latitude: true,
  longitude: true,
  imageData: true,
});

export const insertHistoricalDataSchema = createInsertSchema(historicalData).pick({
  title: true,
  summary: true,
  timeline: true,
  images: true,
  searchId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWaitlistSubscriber = z.infer<typeof insertWaitlistSubscriberSchema>;
export type WaitlistSubscriber = typeof waitlistSubscribers.$inferSelect;

export type InsertHistoricalSearch = z.infer<typeof insertHistoricalSearchSchema>;
export type HistoricalSearch = typeof historicalSearches.$inferSelect;

export type InsertHistoricalData = z.infer<typeof insertHistoricalDataSchema>;
export type HistoricalData = typeof historicalData.$inferSelect;
