import { NextResponse } from 'next/server';
import { getS3Client, checkConnection } from '@/lib/b2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { PhotoModel } from '@/lib/model';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const name = formData.get('name') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 1. Ensure B2 Connection & Get Bucket
        const bucketName = await checkConnection();
        if (!bucketName) {
            return NextResponse.json({ error: 'Failed to connect to storage' }, { status: 500 });
        }

        // 2. Upload to B2
        const buffer = Buffer.from(await file.arrayBuffer());
        const key = `scans/${Date.now()}_${file.name}`;

        const s3 = await getS3Client();

        await s3.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        }));

        const url = `https://${bucketName}.s3.us-west-004.backblazeb2.com/${key}`; // Construct public URL (assuming public bucket)

        // 3. Save to "Model"
        const newPhoto = await PhotoModel.add({
            id: Date.now().toString(),
            url,
            uploadedAt: new Date().toISOString(),
            originalName: name
        });

        return NextResponse.json({ success: true, photo: newPhoto });

    } catch (e) {
        console.error("Upload error:", e);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
