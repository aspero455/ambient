
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET() {
    try {
        // Should add auth check here in real app
        const allEvents = await db.select().from(events).orderBy(desc(events.createdAt));
        return NextResponse.json({ events: allEvents });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, date, location } = body;

        const newEvent = {
            id: nanoid(),
            name,
            date,
            location,
            slug: name.toLowerCase().replace(/ /g, '-') + '-' + nanoid(4),
            createdAt: new Date().toISOString()
        };

        await db.insert(events).values(newEvent);

        return NextResponse.json({ success: true, event: newEvent });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
