
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "./src/lib/db";
import { admins } from "./src/db/schema";

async function main() {
    try {
        console.log("Testing DB connection...");
        const result = await db.select().from(admins).limit(1);
        console.log("Connection successful!", result);
    } catch (e) {
        console.error("Connection failed:", e);
    }
}

main();
