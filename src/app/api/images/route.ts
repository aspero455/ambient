import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'src', 'lib', 'cloudinaryImages.json');

// GET - Fetch images for a specific section (public endpoint for main pages)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');

        // Read current config
        let config: Record<string, Record<string, { url: string; publicId: string }>> = {};

        try {
            const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
            config = JSON.parse(configData);
        } catch {
            // If file doesn't exist, return empty config
            return NextResponse.json({ success: true, images: {} });
        }

        // If section specified, return only that section
        if (section) {
            return NextResponse.json({
                success: true,
                images: config[section] || {}
            });
        }

        // Return all sections
        return NextResponse.json({
            success: true,
            images: config
        });
    } catch (error) {
        console.error('Fetch images error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch images' },
            { status: 500 }
        );
    }
}
