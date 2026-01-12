import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as fs from 'fs';
import * as path from 'path';

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

const CONFIG_PATH = path.join(process.cwd(), 'src', 'lib', 'cloudinaryImages.json');

// GET - Get current image configuration
export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
        const config = JSON.parse(configData);

        return NextResponse.json({
            success: true,
            config
        });
    } catch (error) {
        console.error('Read config error:', error);
        return NextResponse.json(
            { error: 'Failed to read configuration' },
            { status: 500 }
        );
    }
}

// POST - Update image configuration after upload
export async function POST(request: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { section, imageId, url, publicId } = body;

        if (!section || !imageId || !url || !publicId) {
            return NextResponse.json(
                { error: 'Missing required fields: section, imageId, url, publicId' },
                { status: 400 }
            );
        }

        // Read current config
        let config: Record<string, Record<string, { url: string; publicId: string }>> = {};

        try {
            const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
            config = JSON.parse(configData);
        } catch {
            // If file doesn't exist, start with empty config
            config = {};
        }

        // Ensure section exists
        if (!config[section]) {
            config[section] = {};
        }

        // Update the image
        config[section][imageId] = { url, publicId };

        // Write back to file
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Configuration updated',
            updated: { section, imageId, url, publicId }
        });
    } catch (error) {
        console.error('Update config error:', error);
        return NextResponse.json(
            { error: 'Failed to update configuration' },
            { status: 500 }
        );
    }
}
