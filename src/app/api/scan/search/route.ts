
import { NextResponse } from 'next/server';
import { PhotoModel } from '@/lib/model';

// Mock Face Search
export async function POST(req: Request) {
    try {
        // In a real app, you'd receive the face image here
        // const { image } = await req.json();

        // Simulate "Processing" time
        await new Promise(r => setTimeout(r, 2000));

        // Get results from model
        const results = await PhotoModel.searchFaces({});

        return NextResponse.json({
            success: true,
            found: results.length > 0,
            photos: results
        });

    } catch (e) {
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
