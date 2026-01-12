
import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// CREDENTIALS - In production, use process.env!
const B2_KEY_ID = "d101ed96e34f";
const B2_APP_KEY = "005c525e74b7ec95ad5772a9bfc2899851123f1744";
// We need the endpoint. Usually it's s3.us-west-00X.backblazeb2.com.
// We will try to auto-detect or default to a common one, but really we need it.
// For now, we'll try to list buckets to verify connection, but we can't without endpoint.
// User didn't provide endpoint. 
// Standard B2 S3 endpoint is usually specific to the region.
// frequent is s3.us-west-004.backblazeb2.com
const B2_ENDPOINT = "https://s3.us-west-004.backblazeb2.com"; // Defaulting to 004, likely correct or needs update.

export const s3 = new S3Client({
    endpoint: B2_ENDPOINT,
    region: "us-west-004", // This matches the endpoint
    credentials: {
        accessKeyId: B2_KEY_ID,
        secretAccessKey: B2_APP_KEY,
    },
});

export const B2_BUCKET_NAME = "ambient-frames-photos"; // Placeholder, we will update after listing if wrong.

export async function checkConnection() {
    try {
        const data = await s3.send(new ListBucketsCommand({}));
        console.log("Connected to B2! Buckets:", data.Buckets?.map(b => b.Name));
        return data.Buckets?.[0]?.Name || B2_BUCKET_NAME;
    } catch (err) {
        console.error("B2 Connection Error:", err);
        return null;
    }
}
