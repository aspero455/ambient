
const { createClient } = require("@libsql/client");

const url = "libsql://ambient-frames-asperoo.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjgxNzIwNjAsImlkIjoiOWFjYTg1OWEtZmRjOS00ZDRjLTkzZjMtYzA3MjZkZTkyMGZjIiwicmlkIjoiMWZkZTg3NmEtZTUxNS00MDE2LTgyZDgtZjhkYjZhMjVjMmUxIn0.7wOSUL6hxeguigtoz4JQC-3xrh9-Tdebjva3DfMyEcn72xNvDLBWQ7HJY_fYwWnB_94gN2L5B6To5vcmdu_OBw";

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
