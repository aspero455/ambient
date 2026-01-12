/**
 * Image Configuration Store with Cloudinary URLs
 * 
 * This file contains all manageable images across the website.
 * Images are now stored on Cloudinary in organized folders:
 * - ambient-frames/home/
 * - ambient-frames/about/
 * - ambient-frames/gallery/
 * - ambient-frames/services/
 * - ambient-frames/blog/
 */

// Import the uploaded Cloudinary URLs
import cloudinaryImages from './cloudinaryImages.json';

export interface ImageConfig {
    id: string;
    name: string;
    description: string;
    defaultUrl: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    section: 'home' | 'about' | 'gallery' | 'services' | 'blog';
    category?: string;
}

// Helper to get Cloudinary image data
const getCloudinaryData = (section: string, id: string) => {
    const sectionData = cloudinaryImages[section as keyof typeof cloudinaryImages];
    if (sectionData && sectionData[id as keyof typeof sectionData]) {
        return sectionData[id as keyof typeof sectionData];
    }
    return { url: '', publicId: '' };
};

// Image configurations with Cloudinary URLs
export const defaultImageConfig: Record<string, ImageConfig[]> = {
    home: [
        {
            id: 'home_hero_1',
            name: 'Hero Image 1',
            description: 'Main hero section background image',
            defaultUrl: '/img/584919632_18301346926284138_3623525760133837999_n.jpeg',
            cloudinaryUrl: getCloudinaryData('home', 'home_hero_1').url,
            cloudinaryPublicId: getCloudinaryData('home', 'home_hero_1').publicId,
            section: 'home',
            category: 'hero'
        },
        {
            id: 'home_hero_2',
            name: 'Hero Image 2',
            description: 'Secondary hero image',
            defaultUrl: '/img/567395566_18292643899284138_984878061390000747_n.jpeg',
            cloudinaryUrl: getCloudinaryData('home', 'home_hero_2').url,
            cloudinaryPublicId: getCloudinaryData('home', 'home_hero_2').publicId,
            section: 'home',
            category: 'hero'
        },
        {
            id: 'home_gallery_1',
            name: 'Gallery Showcase 1',
            description: 'First gallery preview image',
            defaultUrl: '/img/566414945_18292643884284138_3751019525464458517_n.jpeg',
            cloudinaryUrl: getCloudinaryData('home', 'home_gallery_1').url,
            cloudinaryPublicId: getCloudinaryData('home', 'home_gallery_1').publicId,
            section: 'home',
            category: 'gallery'
        },
        {
            id: 'home_gallery_2',
            name: 'Gallery Showcase 2',
            description: 'Second gallery preview image',
            defaultUrl: '/img/526620207_18281937079284138_8438353020918415449_n..jpg',
            cloudinaryUrl: getCloudinaryData('home', 'home_gallery_2').url,
            cloudinaryPublicId: getCloudinaryData('home', 'home_gallery_2').publicId,
            section: 'home',
            category: 'gallery'
        },
        {
            id: 'home_gallery_3',
            name: 'Gallery Showcase 3',
            description: 'Third gallery preview image',
            defaultUrl: '/img/526617991_18281938183284138_1247856625555993611_n..jpg',
            cloudinaryUrl: getCloudinaryData('home', 'home_gallery_3').url,
            cloudinaryPublicId: getCloudinaryData('home', 'home_gallery_3').publicId,
            section: 'home',
            category: 'gallery'
        }
    ],
    about: [
        {
            id: 'about_hero',
            name: 'About Hero Image',
            description: 'Main hero image on about page',
            defaultUrl: '/img/567395566_18292643899284138_984878061390000747_n.jpeg',
            cloudinaryUrl: getCloudinaryData('about', 'about_hero').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_hero').publicId,
            section: 'about',
            category: 'hero'
        },
        {
            id: 'about_story_1',
            name: 'Story Image 1',
            description: 'First storytelling section image',
            defaultUrl: '/img/530361918_18283380247284138_133094580325100578_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_story_1').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_story_1').publicId,
            section: 'about',
            category: 'story'
        },
        {
            id: 'about_story_2',
            name: 'Story Image 2',
            description: 'Second storytelling section image',
            defaultUrl: '/img/531822595_18283640836284138_2008306935621772497_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_story_2').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_story_2').publicId,
            section: 'about',
            category: 'story'
        },
        {
            id: 'about_service_1',
            name: 'Service Preview 1',
            description: 'Wedding photography preview',
            defaultUrl: '/img/524877796_18281941537284138_7194601866269685029_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_service_1').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_service_1').publicId,
            section: 'about',
            category: 'services'
        },
        {
            id: 'about_service_2',
            name: 'Service Preview 2',
            description: 'Portrait sessions preview',
            defaultUrl: '/img/528577300_18282637933284138_6024131309224852219_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_service_2').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_service_2').publicId,
            section: 'about',
            category: 'services'
        },
        {
            id: 'about_service_3',
            name: 'Service Preview 3',
            description: 'Corporate events preview',
            defaultUrl: '/img/528631979_18282710314284138_2035724994247197640_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_service_3').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_service_3').publicId,
            section: 'about',
            category: 'services'
        },
        {
            id: 'about_service_4',
            name: 'Service Preview 4',
            description: 'Fashion & editorial preview',
            defaultUrl: '/img/529672310_18282710362284138_7894353990389373612_n..webp',
            cloudinaryUrl: getCloudinaryData('about', 'about_service_4').url,
            cloudinaryPublicId: getCloudinaryData('about', 'about_service_4').publicId,
            section: 'about',
            category: 'services'
        }
    ],
    gallery: [
        {
            id: 'gallery_1',
            name: 'Gallery Image 1',
            description: 'Grand Wedding Celebration',
            defaultUrl: '/img/584919632_18301346926284138_3623525760133837999_n.jpeg',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_1').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_1').publicId,
            section: 'gallery',
            category: 'wedding'
        },
        {
            id: 'gallery_2',
            name: 'Gallery Image 2',
            description: 'Fashion Editorial',
            defaultUrl: '/img/567395566_18292643899284138_984878061390000747_n.jpeg',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_2').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_2').publicId,
            section: 'gallery',
            category: 'fashion'
        },
        {
            id: 'gallery_3',
            name: 'Gallery Image 3',
            description: 'Corporate Gala Night',
            defaultUrl: '/img/566414945_18292643884284138_3751019525464458517_n.jpeg',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_3').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_3').publicId,
            section: 'gallery',
            category: 'events'
        },
        {
            id: 'gallery_4',
            name: 'Gallery Image 4',
            description: 'Candid Portrait',
            defaultUrl: '/img/526620207_18281937079284138_8438353020918415449_n..jpg',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_4').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_4').publicId,
            section: 'gallery',
            category: 'portrait'
        },
        {
            id: 'gallery_5',
            name: 'Gallery Image 5',
            description: 'Bridal Elegance',
            defaultUrl: '/img/526617991_18281938183284138_1247856625555993611_n..jpg',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_5').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_5').publicId,
            section: 'gallery',
            category: 'wedding'
        },
        {
            id: 'gallery_6',
            name: 'Gallery Image 6',
            description: 'Product Launch',
            defaultUrl: '/img/528279540_18282602014284138_194004958280868693_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_6').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_6').publicId,
            section: 'gallery',
            category: 'events'
        },
        {
            id: 'gallery_7',
            name: 'Gallery Image 7',
            description: 'Fashion Week',
            defaultUrl: '/img/528631979_18282710314284138_2035724994247197640_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_7').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_7').publicId,
            section: 'gallery',
            category: 'fashion'
        },
        {
            id: 'gallery_8',
            name: 'Gallery Image 8',
            description: 'Family Portrait',
            defaultUrl: '/img/529672310_18282710362284138_7894353990389373612_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_8').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_8').publicId,
            section: 'gallery',
            category: 'portrait'
        },
        {
            id: 'gallery_9',
            name: 'Gallery Image 9',
            description: 'Wedding Reception',
            defaultUrl: '/img/530361918_18283380247284138_133094580325100578_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_9').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_9').publicId,
            section: 'gallery',
            category: 'wedding'
        },
        {
            id: 'gallery_10',
            name: 'Gallery Image 10',
            description: 'Creative Portrait',
            defaultUrl: '/img/531822595_18283640836284138_2008306935621772497_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_10').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_10').publicId,
            section: 'gallery',
            category: 'portrait'
        },
        {
            id: 'gallery_11',
            name: 'Gallery Image 11',
            description: 'Elegant Fashion',
            defaultUrl: '/img/532239093_18283639591284138_1240929492701407161_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_11').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_11').publicId,
            section: 'gallery',
            category: 'fashion'
        },
        {
            id: 'gallery_12',
            name: 'Gallery Image 12',
            description: 'Traditional Ceremony',
            defaultUrl: '/img/532501606_18283429012284138_3710883859252304802_n..webp',
            cloudinaryUrl: getCloudinaryData('gallery', 'gallery_12').url,
            cloudinaryPublicId: getCloudinaryData('gallery', 'gallery_12').publicId,
            section: 'gallery',
            category: 'wedding'
        }
    ],
    services: [
        {
            id: 'services_wedding',
            name: 'Wedding Photography',
            description: 'Wedding service card image',
            defaultUrl: '/img/524877796_18281941537284138_7194601866269685029_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_wedding').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_wedding').publicId,
            section: 'services',
            category: 'wedding'
        },
        {
            id: 'services_portrait',
            name: 'Portrait Sessions',
            description: 'Portrait service card image',
            defaultUrl: '/img/528577300_18282637933284138_6024131309224852219_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_portrait').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_portrait').publicId,
            section: 'services',
            category: 'portrait'
        },
        {
            id: 'services_corporate',
            name: 'Corporate Events',
            description: 'Corporate service card image',
            defaultUrl: '/img/528631979_18282710314284138_2035724994247197640_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_corporate').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_corporate').publicId,
            section: 'services',
            category: 'corporate'
        },
        {
            id: 'services_fashion',
            name: 'Fashion & Editorial',
            description: 'Fashion service card image',
            defaultUrl: '/img/529672310_18282710362284138_7894353990389373612_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_fashion').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_fashion').publicId,
            section: 'services',
            category: 'fashion'
        },
        {
            id: 'services_family',
            name: 'Family Portraits',
            description: 'Family service card image',
            defaultUrl: '/img/530361918_18283380247284138_133094580325100578_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_family').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_family').publicId,
            section: 'services',
            category: 'family'
        },
        {
            id: 'services_maternity',
            name: 'Maternity & Newborn',
            description: 'Maternity service card image',
            defaultUrl: '/img/531822595_18283640836284138_2008306935621772497_n..webp',
            cloudinaryUrl: getCloudinaryData('services', 'services_maternity').url,
            cloudinaryPublicId: getCloudinaryData('services', 'services_maternity').publicId,
            section: 'services',
            category: 'maternity'
        }
    ],
    blog: [
        {
            id: 'blog_1',
            name: 'Blog Post 1',
            description: 'The Art of Natural Light',
            defaultUrl: '/img/524877796_18281941537284138_7194601866269685029_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_1').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_1').publicId,
            section: 'blog',
            category: 'tutorial'
        },
        {
            id: 'blog_2',
            name: 'Blog Post 2',
            description: 'Capturing the Unseen',
            defaultUrl: '/img/528577300_18282637933284138_6024131309224852219_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_2').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_2').publicId,
            section: 'blog',
            category: 'insider'
        },
        {
            id: 'blog_3',
            name: 'Blog Post 3',
            description: 'Gear Talk: Leica',
            defaultUrl: '/img/528631979_18282710314284138_2035724994247197640_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_3').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_3').publicId,
            section: 'blog',
            category: 'equipment'
        },
        {
            id: 'blog_4',
            name: 'Blog Post 4',
            description: 'Mumbai Color Palette',
            defaultUrl: '/img/529672310_18282710362284138_7894353990389373612_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_4').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_4').publicId,
            section: 'blog',
            category: 'perspective'
        },
        {
            id: 'blog_5',
            name: 'Blog Post 5',
            description: 'Directing Models',
            defaultUrl: '/img/530361918_18283380247284138_133094580325100578_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_5').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_5').publicId,
            section: 'blog',
            category: 'tutorial'
        },
        {
            id: 'blog_6',
            name: 'Blog Post 6',
            description: 'Black & White Photography',
            defaultUrl: '/img/531822595_18283640836284138_2008306935621772497_n..webp',
            cloudinaryUrl: getCloudinaryData('blog', 'blog_6').url,
            cloudinaryPublicId: getCloudinaryData('blog', 'blog_6').publicId,
            section: 'blog',
            category: 'analysis'
        }
    ]
};

/**
 * Get image URL from config - returns Cloudinary URL if available, otherwise default
 */
export function getImageFromConfig(config: ImageConfig): string {
    return config.cloudinaryUrl || config.defaultUrl;
}

/**
 * Get all images for a section
 */
export function getImagesForSection(section: 'home' | 'about' | 'gallery' | 'services' | 'blog'): ImageConfig[] {
    return defaultImageConfig[section] || [];
}

/**
 * Get a specific image by ID
 */
export function getImageById(section: 'home' | 'about' | 'gallery' | 'services' | 'blog', id: string): ImageConfig | undefined {
    return defaultImageConfig[section]?.find(img => img.id === id);
}
