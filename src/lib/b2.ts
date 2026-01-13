
// @ts-ignore
const B2 = require('backblaze-b2');
import { S3Client } from '@aws-sdk/client-s3';

const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID || '',
    applicationKey: process.env.B2_APPLICATION_KEY || '',
});

let authorizationToken: string | null = null;
let apiUrl: string | null = null;
let downloadUrl: string | null = null;
let s3ApiUrl: string | null = null;
let cachedS3Client: S3Client | null = null;
let bucketId: string | null = null;
let bucketName: string | null = null;

export const authorizeB2 = async () => {
    if (authorizationToken) return { authorizationToken, apiUrl, downloadUrl, s3ApiUrl };

    try {
        const response = await b2.authorize();
        authorizationToken = response.data.authorizationToken;
        apiUrl = response.data.apiUrl;
        downloadUrl = response.data.downloadUrl;
        s3ApiUrl = response.data.s3ApiUrl; // e.g., https://s3.us-west-004.backblazeb2.com
        return response.data;
    } catch (error) {
        console.error('Error authorizing B2:', error);
        throw error;
    }
};

export const getS3Client = async (): Promise<S3Client> => {
    if (cachedS3Client) return cachedS3Client;

    await authorizeB2();
    if (!s3ApiUrl) throw new Error("Could not determine S3 API URL from B2 authorization");

    // Extract region from s3ApiUrl (e.g., https://s3.us-west-004.backblazeb2.com -> us-west-004)
    const regionMatch = s3ApiUrl.match(/s3\.([\w-]+)\.backblazeb2\.com/);
    const region = regionMatch ? regionMatch[1] : 'us-east-1'; // fallback

    cachedS3Client = new S3Client({
        region: region,
        endpoint: s3ApiUrl,
        credentials: {
            accessKeyId: process.env.B2_APPLICATION_KEY_ID || '',
            secretAccessKey: process.env.B2_APPLICATION_KEY || '',
        },
        forcePathStyle: true // Needed for custom endpoints sometimes, but B2 supports virtual-host too.
    });

    return cachedS3Client;
};

// Check connection and return a valid bucket name
export const checkConnection = async (): Promise<string | null> => {
    try {
        await authorizeB2();

        // Find a suitable bucket
        if (!bucketName) {
            const response = await b2.listBuckets();
            const buckets = response.data.buckets;
            if (buckets && buckets.length > 0) {
                // Find a bucket named 'ambient-frames' or similar, or just take the first one
                const preferred = buckets.find((b: any) => b.bucketName.includes('ambient') || b.bucketName.includes('photos'));
                const chosen = preferred || buckets[0];
                bucketName = chosen.bucketName;
                bucketId = chosen.bucketId;
            } else {
                // Try to create one?
                // await b2.createBucket({ bucketName: 'ambient-frames-storage', bucketType: 'allPublic' });
                return null;
            }
        }
        return bucketName;
    } catch (error) {
        console.error('Error checking B2 connection:', error);
        return null;
    }
};

export const listBuckets = async () => {
    await authorizeB2();
    const response = await b2.listBuckets();
    return response.data.buckets;
};
