
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@libsql/client");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("URL:", url);
// Don't log full token for security, but check length
console.log("Token Length:", authToken ? authToken.length : 0);

const client = createClient({
    url,
    authToken,
});

async function test() {
    try {
        const rs = await client.execute("SELECT 1");
        console.log("Connected!", rs);
    } catch (e) {
        console.error("Connection failed:", e);
    }
}

test();
