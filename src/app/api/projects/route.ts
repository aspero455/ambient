import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataPath = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return NextResponse.json(JSON.parse(data), {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (e) {
        // If file doesn't exist, return empty array
        return NextResponse.json([], {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { projects } = body;

        if (!Array.isArray(projects)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Failed to save projects:", e);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
