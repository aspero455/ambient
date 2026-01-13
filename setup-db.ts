
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from '@libsql/client';

async function main() {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !authToken) {
        console.error("Missing credentials");
        return;
    }

    console.log("Connecting to", url);
    const client = createClient({ url, authToken });

    try {
        await client.execute(`
            CREATE TABLE IF NOT EXISTS events (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                date TEXT NOT NULL,
                location TEXT,
                cover_image TEXT,
                created_at TEXT NOT NULL
            );
        `);
        console.log("Created events table");

        await client.execute(`
            CREATE TABLE IF NOT EXISTS photos (
                id TEXT PRIMARY KEY,
                event_id TEXT REFERENCES events(id),
                url TEXT NOT NULL,
                storage_key TEXT NOT NULL,
                original_name TEXT,
                embedding TEXT,
                width INTEGER,
                height INTEGER,
                uploaded_at TEXT NOT NULL
            );
        `);
        console.log("Created photos table");

        // Ensure admins table exists (from previous schema)
        await client.execute(`
            CREATE TABLE IF NOT EXISTS admins (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
        `);
        console.log("Created admins table");

    } catch (e) {
        console.error("Error creating tables:", e);
    }
}

main();
