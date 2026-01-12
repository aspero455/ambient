/**
 * Upload Script - Uploads all existing images to Cloudinary
 * 
 * This script uploads images from /public/img/ to Cloudinary
 * organized into separate folders for each page:
 * - ambient-frames/home/
 * - ambient-frames/about/
 * - ambient-frames/gallery/
 * - ambient-frames/services/
 * - ambient-frames/blog/
 * 
 * Run with: npx ts-node --project tsconfig.json scripts/upload-to-cloudinary.ts
 * Or: node scripts/upload-to-cloudinary.js
 */

import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dl4eaaoez',
    api_key: '597175981239586',
    api_secret: 'iP_VCnD5-q9oZcCoTfH1ExweXzk',
});

// Image mappings for each page
const imageConfig = {
    home: [
        { localPath: '/img/584919632_18301346926284138_3623525760133837999_n.jpeg', name: 'home_hero_1' },
        { localPath: '/img/567395566_18292643899284138_984878061390000747_n.jpeg', name: 'home_hero_2' },
        { localPath: '/img/566414945_18292643884284138_3751019525464458517_n.jpeg', name: 'home_gallery_1' },
        { localPath: '/img/526620207_18281937079284138_8438353020918415449_n..jpg', name: 'home_gallery_2' },
        { localPath: '/img/526617991_18281938183284138_1247856625555993611_n..jpg', name: 'home_gallery_3' },
    ],
    about: [
        { localPath: '/img/567395566_18292643899284138_984878061390000747_n.jpeg', name: 'about_hero' },
        { localPath: '/img/530361918_18283380247284138_133094580325100578_n..webp', name: 'about_story_1' },
        { localPath: '/img/531822595_18283640836284138_2008306935621772497_n..webp', name: 'about_story_2' },
        { localPath: '/img/524877796_18281941537284138_7194601866269685029_n..webp', name: 'about_service_1' },
        { localPath: '/img/528577300_18282637933284138_6024131309224852219_n..webp', name: 'about_service_2' },
        { localPath: '/img/528631979_18282710314284138_2035724994247197640_n..webp', name: 'about_service_3' },
        { localPath: '/img/529672310_18282710362284138_7894353990389373612_n..webp', name: 'about_service_4' },
    ],
    gallery: [
        { localPath: '/img/584919632_18301346926284138_3623525760133837999_n.jpeg', name: 'gallery_1' },
        { localPath: '/img/567395566_18292643899284138_984878061390000747_n.jpeg', name: 'gallery_2' },
        { localPath: '/img/566414945_18292643884284138_3751019525464458517_n.jpeg', name: 'gallery_3' },
        { localPath: '/img/526620207_18281937079284138_8438353020918415449_n..jpg', name: 'gallery_4' },
        { localPath: '/img/526617991_18281938183284138_1247856625555993611_n..jpg', name: 'gallery_5' },
        { localPath: '/img/528279540_18282602014284138_194004958280868693_n..webp', name: 'gallery_6' },
        { localPath: '/img/528631979_18282710314284138_2035724994247197640_n..webp', name: 'gallery_7' },
        { localPath: '/img/529672310_18282710362284138_7894353990389373612_n..webp', name: 'gallery_8' },
        { localPath: '/img/530361918_18283380247284138_133094580325100578_n..webp', name: 'gallery_9' },
        { localPath: '/img/531822595_18283640836284138_2008306935621772497_n..webp', name: 'gallery_10' },
        { localPath: '/img/532239093_18283639591284138_1240929492701407161_n..webp', name: 'gallery_11' },
        { localPath: '/img/532501606_18283429012284138_3710883859252304802_n..webp', name: 'gallery_12' },
    ],
    services: [
        { localPath: '/img/524877796_18281941537284138_7194601866269685029_n..webp', name: 'services_wedding' },
        { localPath: '/img/528577300_18282637933284138_6024131309224852219_n..webp', name: 'services_portrait' },
        { localPath: '/img/528631979_18282710314284138_2035724994247197640_n..webp', name: 'services_corporate' },
        { localPath: '/img/529672310_18282710362284138_7894353990389373612_n..webp', name: 'services_fashion' },
        { localPath: '/img/530361918_18283380247284138_133094580325100578_n..webp', name: 'services_family' },
        { localPath: '/img/531822595_18283640836284138_2008306935621772497_n..webp', name: 'services_maternity' },
    ],
    blog: [
        { localPath: '/img/524877796_18281941537284138_7194601866269685029_n..webp', name: 'blog_1' },
        { localPath: '/img/528577300_18282637933284138_6024131309224852219_n..webp', name: 'blog_2' },
        { localPath: '/img/528631979_18282710314284138_2035724994247197640_n..webp', name: 'blog_3' },
        { localPath: '/img/529672310_18282710362284138_7894353990389373612_n..webp', name: 'blog_4' },
        { localPath: '/img/530361918_18283380247284138_133094580325100578_n..webp', name: 'blog_5' },
        { localPath: '/img/531822595_18283640836284138_2008306935621772497_n..webp', name: 'blog_6' },
    ],
};

interface UploadResult {
    page: string;
    name: string;
    publicId: string;
    url: string;
    success: boolean;
    error?: string;
}

async function uploadImage(
    localPath: string,
    folder: string,
    imageName: string
): Promise<{ url: string; publicId: string }> {
    const publicImgPath = path.join(process.cwd(), 'public', localPath);

    if (!fs.existsSync(publicImgPath)) {
        throw new Error(`File not found: ${publicImgPath}`);
    }

    const result = await cloudinary.uploader.upload(publicImgPath, {
        public_id: `ambient-frames/${folder}/${imageName}`,
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
}

async function uploadAllImages() {
    console.log('🚀 Starting Cloudinary image upload...\n');
    console.log('Folders to be created:');
    console.log('  • ambient-frames/home/');
    console.log('  • ambient-frames/about/');
    console.log('  • ambient-frames/gallery/');
    console.log('  • ambient-frames/services/');
    console.log('  • ambient-frames/blog/\n');

    const results: UploadResult[] = [];
    const pages = Object.keys(imageConfig) as Array<keyof typeof imageConfig>;

    for (const page of pages) {
        console.log(`\n📁 Uploading ${page.toUpperCase()} images...`);
        const images = imageConfig[page];

        for (const image of images) {
            try {
                process.stdout.write(`   Uploading ${image.name}... `);
                const result = await uploadImage(image.localPath, page, image.name);
                console.log('✅');

                results.push({
                    page,
                    name: image.name,
                    publicId: result.publicId,
                    url: result.url,
                    success: true
                });
            } catch (error) {
                console.log('❌');
                results.push({
                    page,
                    name: image.name,
                    publicId: '',
                    url: '',
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
    }

    // Summary
    console.log('\n\n📊 UPLOAD SUMMARY');
    console.log('='.repeat(50));

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    if (failed.length > 0) {
        console.log('\nFailed uploads:');
        failed.forEach(f => console.log(`   - ${f.page}/${f.name}: ${f.error}`));
    }

    // Generate config file
    console.log('\n\n📝 Generating image URLs config...');

    const configOutput: Record<string, Record<string, { url: string; publicId: string }>> = {};

    for (const result of successful) {
        if (!configOutput[result.page]) {
            configOutput[result.page] = {};
        }
        configOutput[result.page][result.name] = {
            url: result.url,
            publicId: result.publicId
        };
    }

    // Save to JSON file
    const outputPath = path.join(process.cwd(), 'src', 'lib', 'cloudinaryImages.json');
    fs.writeFileSync(outputPath, JSON.stringify(configOutput, null, 2));
    console.log(`✅ Config saved to: ${outputPath}`);

    console.log('\n🎉 Upload complete!\n');
    console.log('You can now use these images in your admin panel.');
    console.log('Check your Cloudinary dashboard to see the organized folders:');
    console.log('https://console.cloudinary.com/console/\n');
}

// Run the upload
uploadAllImages().catch(console.error);
