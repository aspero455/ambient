
import { NextResponse } from 'next/server';
import { getS3Client, checkConnection } from '@/lib/b2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { db } from '@/lib/db';
import { photos } from '@/db/schema';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const eventId = formData.get('eventId') as string;

        if (!file || !eventId) {
            return NextResponse.json({ error: 'Missing file or eventId' }, { status: 400 });
        }

        // 1. Ensure B2 Connection & Get Bucket
        const bucketName = await checkConnection();
        if (!bucketName) {
            return NextResponse.json({ error: 'Failed to connect to storage' }, { status: 500 });
        }

        // 2. Upload to B2
        const buffer = Buffer.from(await file.arrayBuffer());
        // Use a clean key structure: events/{eventId}/{timestamp}_{filename}
        const key = `events/${eventId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

        const s3 = await getS3Client();

        await s3.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        }));

        const url = `https://${bucketName}.s3.us-west-004.backblazeb2.com/${key}`; // Hardcoded region for now, ideal to get from B2 auth response if variable

        // 3. Save to DB
        const newPhoto = {
            id: nanoid(),
            eventId,
            url,
            storageKey: key,
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
            // embedding: null // We will implement face indexing separately
        };

        await db.insert(photos).values(newPhoto);

        return NextResponse.json({ success: true, photo: newPhoto });

    } catch (e: any) {
        console.error("Upload error:", e);
        return NextResponse.json({ error: 'Upload failed: ' + e.message }, { status: 500 });
    }
}
