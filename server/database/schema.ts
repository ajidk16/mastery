import { pgTable, serial, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['user', 'admin']);
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced']);

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Vocabulary Table
export const vocabulary = pgTable('vocabulary', {
  id: serial('id').primaryKey(),
  word: text('word').notNull().unique(),
  definition: text('definition').notNull(),
  contextSentence: text('context_sentence'),
  difficulty: difficultyEnum('difficulty').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Progress Table
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  wordId: integer('word_id').references(() => vocabulary.id).notNull(),
  status: text('status', { enum: ['learning', 'mastered'] }).default('learning').notNull(),
  lastReviewedAt: timestamp('last_reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
}));

export const vocabularyRelations = relations(vocabulary, ({ many }) => ({
  progress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  word: one(vocabulary, {
    fields: [userProgress.wordId],
    references: [vocabulary.id],
  }),
}));
