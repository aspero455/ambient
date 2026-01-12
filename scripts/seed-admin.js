
const { createClient } = require("@libsql/client");
const { nanoid } = require("nanoid");

// Load env vars
require("dotenv").config({ path: ".env.local" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
const adminUser = process.env.ADMIN_USERNAME || "ambientadmin";
const adminPass = process.env.ADMIN_PASSWORD || "damsas@2015";

if (!url || !authToken) {
    console.error("Missing DB credentials in .env.local");
    process.exit(1);
}

const client = createClient({ url, authToken });

async function seed() {
    console.log(`Seeding Admin: ${adminUser}`);

    try {
        // Check if exists
        const rs = await client.execute({
            sql: "SELECT * FROM admins WHERE username = ?",
            args: [adminUser]
        });

        if (rs.rows.length > 0) {
            console.log("Admin already exists. Updating password...");
            await client.execute({
                sql: "UPDATE admins SET password = ? WHERE username = ?",
                args: [adminPass, adminUser]
            });
        } else {
            console.log("Creating new admin...");
            await client.execute({
                sql: "INSERT INTO admins (id, username, password, created_at) VALUES (?, ?, ?, ?)",
                args: [nanoid(), adminUser, adminPass, new Date().toISOString()]
            });
        }
        console.log("Success!");
    } catch (e) {
        console.error("Error seeding admin:", e);
    }
}

seed();
