import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { bookings } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// GET - Fetch all bookings (Admin Only)
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
        return NextResponse.json(allBookings, {
            headers: { 'Cache-Control': 'no-store, max-age=0' }
        });
    } catch (e) {
        console.error("DB Fetch Error:", e);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

// POST - Create new booking (Public)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newBooking = {
            id: nanoid(),
            name: body.name || 'Unknown',
            email: body.email,
            phone: body.phone,
            eventType: body.eventType,
            message: body.message,
            status: 'unread' as const,
            createdAt: new Date().toISOString(),
        };

        await db.insert(bookings).values(newBooking);

        return NextResponse.json({ success: true, booking: newBooking });
    } catch (e) {
        console.error("DB Insert Error:", e);
        return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }
}

// PATCH - Update status (Admin Only)
export async function PATCH(req: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();

        await db.update(bookings)
            .set({ status })
            .where(eq(bookings.id, id));

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
