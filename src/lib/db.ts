
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '@/db/schema';

// Best practice: use environment variables
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
    // During build time on Vercel, if env vars are missing, we want to warn but maybe not crash immediately at import time,
    // behaving effectively as a "build-time" no-op or throw a clearer error.
    throw new Error("TURSO_DATABASE_URL is not defined. Please add it to your Vercel Environment Variables.");
}

const client = createClient({
    url,
    authToken: authToken || '',
});

export const db = drizzle(client, { schema });
