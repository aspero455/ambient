
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const bookings = sqliteTable('bookings', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    eventType: text('event_type'),
    message: text('message'),
    status: text('status').default('unread'), // unread | read | contacted
    createdAt: text('created_at').notNull(),
});

export const events = sqliteTable('events', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    date: text('date').notNull(),
    location: text('location'),
    coverImage: text('cover_image'),
    createdAt: text('created_at').notNull(),
});

export const photos = sqliteTable('photos', {
    id: text('id').primaryKey(),
    eventId: text('event_id').references(() => events.id),
    url: text('url').notNull(),
    storageKey: text('storage_key').notNull(), // For deletion from B2
    originalName: text('original_name'),
    embedding: text('embedding'), // JSON string of face descriptors detected in the photo
    width: integer('width'),
    height: integer('height'),
    uploadedAt: text('uploaded_at').notNull(),
});

export const admins = sqliteTable('admins', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(), // Storing as plain text as requested for now, but should be hashed in prod
    createdAt: text('created_at').notNull(),
});
