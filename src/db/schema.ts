
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

export const photos = sqliteTable('photos', {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
    originalName: text('original_name'),
    faceId: text('face_id'),
    uploadedAt: text('uploaded_at').notNull(),
});

export const admins = sqliteTable('admins', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(), // Storing as plain text as requested for now, but should be hashed in prod
    createdAt: text('created_at').notNull(),
});
