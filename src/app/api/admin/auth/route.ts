import { NextRequest, NextResponse } from 'next/server';
import { createSession, getSession, destroySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { admins } from '@/db/schema';
import { eq } from 'drizzle-orm';

// POST - Login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validate credentials against DB
        let userRecord;
        try {
            const results = await db.select().from(admins).where(eq(admins.username, username)).limit(1);
            userRecord = results[0];
        } catch (e) {
            console.error("DB Auth Error:", e);
            return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
        }

        if (!userRecord || userRecord.password !== password) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create Stateless Session
        await createSession(username);

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: { username }
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET - Check session
export async function GET() {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json({
            authenticated: true,
            user: { username: session.username },
            expiresAt: session.expiresAt
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { authenticated: false },
            { status: 500 }
        );
    }
}

// DELETE - Logout
export async function DELETE() {
    try {
        await destroySession();
        return NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

