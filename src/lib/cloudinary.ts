import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type PageSection = 'home' | 'about' | 'gallery' | 'services' | 'blog' | 'projects';

/**
 * Upload an image to Cloudinary
 * @param file - Base64 encoded image or URL
 * @param section - Page section (home, about, gallery, services, blog)
 * @param imageName - Name for the image
 */
export async function uploadImage(
    file: string,
    section: PageSection,
    imageName: string
): Promise<{ url: string; publicId: string }> {
    try {
        // Sanitize image name
        const sanitizedName = imageName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_');

        const folder = section === 'gallery' ? 'ambient-frames/ambient-gallery' : `ambient-frames/${section}`;
        const publicId = `${folder}/${sanitizedName}_${Date.now()}`;

        const result = await cloudinary.uploader.upload(file, {
            public_id: publicId,
            overwrite: true,
            resource_type: 'image',
            transformation: [
                { quality: 'auto:best' },
                { fetch_format: 'auto' }
            ]
        });

        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 */
export async function deleteImage(publicId: string): Promise<boolean> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
}

/**
 * Get optimized image URL
 * @param publicId - The public ID of the image
 * @param options - Transformation options
 */
export function getImageUrl(
    publicId: string,
    options?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
    }
): string {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            {
                width: options?.width,
                height: options?.height,
                crop: options?.crop || 'fill',
                quality: options?.quality || 'auto:best',
                fetch_format: 'auto'
            }
        ]
    });
}

/**
 * Get all images from a specific folder
 * @param section - Page section
 */
export async function getImagesFromFolder(section: PageSection): Promise<Array<{
    publicId: string;
    url: string;
    width: number;
    height: number;
    createdAt: string;
}>> {
    try {
        const folder = section === 'gallery' ? 'ambient-frames/ambient-gallery' : `ambient-frames/${section}`;
        const result = await cloudinary.search
            .expression(`folder:${folder}`)
            .sort_by('created_at', 'desc')
            .max_results(100)
            .execute();

        return result.resources.map((resource: {
            public_id: string;
            secure_url: string;
            width: number;
            height: number;
            created_at: string;
        }) => ({
            publicId: resource.public_id,
            url: resource.secure_url,
            width: resource.width,
            height: resource.height,
            createdAt: resource.created_at
        }));
    } catch (error) {
        console.error('Cloudinary folder search error:', error);
        return [];
    }
}

export default cloudinary;
