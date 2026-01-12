
import { createHmac } from 'node:crypto';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'ambient-frames-secret-key-change-this';

// 1. Helpers for stateless session (JSON + Signature)
function signData(data: any): string {
    const json = JSON.stringify(data);
    const b64 = Buffer.from(json).toString('base64url');
    const signature = createHmac('sha256', SECRET_KEY).update(b64).digest('base64url');
    return `${b64}.${signature}`; // JWT-like format
}

function verifyData(token: string): any | null {
    if (!token) return null;
    const [b64, signature] = token.split('.');
    if (!b64 || !signature) return null;

    const expectedSignature = createHmac('sha256', SECRET_KEY).update(b64).digest('base64url');
    if (signature !== expectedSignature) return null;

    try {
        const json = Buffer.from(b64, 'base64url').toString('utf-8');
        return JSON.parse(json);
    } catch {
        return null;
    }
}

// 2. Auth Actions
export async function createSession(username: string) {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const sessionToken = signData({ username, expiresAt });

    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;

    const data = verifyData(token);
    if (!data) return null;

    if (data.expiresAt < Date.now()) {
        return null; // Expired
    }

    return data;
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}
