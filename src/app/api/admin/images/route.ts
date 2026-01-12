import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uploadImage, deleteImage, getImagesFromFolder, PageSection } from '@/lib/cloudinary';

// Simple session verification
async function isAuthenticated(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('admin_session')?.value;
        return !!sessionToken;
    } catch {
        return false;
    }
}

// GET - Fetch images from a section
export async function GET(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section') as PageSection;

        if (!section || !['home', 'about', 'gallery', 'services', 'blog', 'projects'].includes(section)) {
            return NextResponse.json(
                { error: 'Invalid section' },
                { status: 400 }
            );
        }

        const images = await getImagesFromFolder(section);

        return NextResponse.json({
            success: true,
            images,
            section
        });
    } catch (error) {
        console.error('Get images error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch images' },
            { status: 500 }
        );
    }
}

// POST - Upload new image
export async function POST(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const section = formData.get('section') as PageSection;
        const imageName = formData.get('imageName') as string;

        if (!file || !section || !imageName) {
            return NextResponse.json(
                { error: 'Missing required fields: file, section, imageName' },
                { status: 400 }
            );
        }

        if (!['home', 'about', 'gallery', 'services', 'blog', 'projects'].includes(section)) {
            return NextResponse.json(
                { error: 'Invalid section' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await uploadImage(base64, section, imageName);

        return NextResponse.json({
            success: true,
            image: {
                url: result.url,
                publicId: result.publicId,
                section,
                name: imageName
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}

// PUT - Replace existing image (delete old, upload new)
export async function PUT(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const section = formData.get('section') as PageSection;
        const imageName = formData.get('imageName') as string;
        const oldPublicId = formData.get('oldPublicId') as string;

        if (!file || !section || !imageName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Delete old image if exists
        if (oldPublicId) {
            try {
                await deleteImage(oldPublicId);
            } catch (err) {
                console.warn('Failed to delete old image:', err);
                // Continue with upload even if delete fails
            }
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload new image
        const result = await uploadImage(base64, section, imageName);

        return NextResponse.json({
            success: true,
            image: {
                url: result.url,
                publicId: result.publicId,
                section,
                name: imageName
            },
            deletedOldImage: !!oldPublicId
        });
    } catch (error) {
        console.error('Replace error:', error);
        return NextResponse.json(
            { error: 'Failed to replace image' },
            { status: 500 }
        );
    }
}

// DELETE - Delete image
export async function DELETE(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const publicId = searchParams.get('publicId');

        if (!publicId) {
            return NextResponse.json(
                { error: 'Missing publicId' },
                { status: 400 }
            );
        }

        const success = await deleteImage(publicId);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to delete image' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Image deleted successfully',
            publicId
        });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete image' },
            { status: 500 }
        );
    }
}
