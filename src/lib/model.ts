import { db } from '@/lib/db';
import { photos } from '@/db/schema';
import { desc } from 'drizzle-orm';

export interface ScannedPhoto {
    id: string;
    url: string;
    uploadedAt: string;
    faceId?: string;
    originalName?: string;
}

export const PhotoModel = {
    // Fetch all photos from Turso
    async getAll() {
        try {
            return await db.select().from(photos).orderBy(desc(photos.uploadedAt));
        } catch (e) {
            console.error("DB Error:", e);
            return [];
        }
    },

    // Add a new photo record to Turso
    async add(photo: ScannedPhoto) {
        try {
            await db.insert(photos).values({
                id: photo.id,
                url: photo.url,
                originalName: photo.originalName || '',
                faceId: photo.faceId || null,
                uploadedAt: photo.uploadedAt,
            });
            return photo;
        } catch (e) {
            console.error("DB Insert Error:", e);
            throw e;
        }
    },

    // Search faces (Mock implementation using DB data)
    // Future: Integrate with vector search
    async searchFaces(mockFaceData: any) {
        try {
            const allPhotos = await this.getAll();
            // Return first 5 for demo purposes
            return allPhotos.slice(0, 5);
        } catch (e) {
            return [];
        }
    }
};
