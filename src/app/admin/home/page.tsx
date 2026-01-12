"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';
import { defaultImageConfig, ImageConfig } from '@/lib/imageConfig';

// Fetch current config from server
async function fetchImageConfig(): Promise<Record<string, { url: string; publicId: string }>> {
    try {
        const res = await fetch('/api/admin/images/sync');
        if (res.ok) {
            const data = await res.json();
            return data.config?.home || {};
        }
    } catch (error) {
        console.error('Failed to fetch config:', error);
    }
    return {};
}

// Save updated config to server
async function saveImageConfig(imageId: string, url: string, publicId: string): Promise<boolean> {
    try {
        const res = await fetch('/api/admin/images/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                section: 'home',
                imageId,
                url,
                publicId
            })
        });
        return res.ok;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export default function AdminHomePage() {
    const [images, setImages] = useState<ImageConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Load images with server-side config
    const loadImages = useCallback(async () => {
        setIsLoading(true);
        const serverConfig = await fetchImageConfig();

        // Merge server config with default config
        const mergedImages = defaultImageConfig.home.map(img => ({
            ...img,
            cloudinaryUrl: serverConfig[img.id]?.url || img.cloudinaryUrl,
            cloudinaryPublicId: serverConfig[img.id]?.publicId || img.cloudinaryPublicId
        }));

        setImages(mergedImages);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleUpload = async (imageId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'home');
        formData.append('imageName', imageId);

        // Find current image to get old public ID if exists
        const currentImage = images.find(img => img.id === imageId);
        if (currentImage?.cloudinaryPublicId) {
            formData.append('oldPublicId', currentImage.cloudinaryPublicId);
        }

        const method = currentImage?.cloudinaryUrl ? 'PUT' : 'POST';
        const res = await fetch('/api/admin/images', { method, body: formData });

        if (!res.ok) {
            throw new Error('Upload failed');
        }

        const data = await res.json();

        // Save to persistent storage
        await saveImageConfig(imageId, data.image.url, data.image.publicId);

        // Update local state
        setImages(prev => prev.map(img =>
            img.id === imageId
                ? { ...img, cloudinaryUrl: data.image.url, cloudinaryPublicId: data.image.publicId }
                : img
        ));

        setSuccessMessage(`${currentImage?.name || 'Image'} updated successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // Get the current image URL (prioritize cloudinaryUrl)
    const getImageUrl = (image: ImageConfig): string => {
        return image.cloudinaryUrl || image.defaultUrl;
    };

    // Group images by category
    const heroImages = images.filter(img => img.category === 'hero');
    const galleryImages = images.filter(img => img.category === 'gallery');
    const otherImages = images.filter(img => !['hero', 'gallery'].includes(img.category || ''));

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] p-6 md:p-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-display text-[28px] md:text-[36px] font-light text-white tracking-tight">
                            Home Page Images
                        </h1>
                        <p className="font-sans text-[13px] text-white/40">
                            Manage images displayed on the homepage
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Success Message */}
            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 flex items-center gap-3"
                >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="font-sans text-[14px] text-emerald-400">{successMessage}</p>
                </motion.div>
            )}

            {/* Hero Section Images */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-blue-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Hero Section</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">
                        {heroImages.length} images
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            <ImageUploader
                                imageName={image.name}
                                description={image.description}
                                section="Home"
                                currentImage={getImageUrl(image)}
                                onUpload={(file) => handleUpload(image.id, file)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Gallery Showcase Images */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-amber-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Gallery Showcase</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">
                        {galleryImages.length} images
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            <ImageUploader
                                imageName={image.name}
                                description={image.description}
                                section="Home"
                                currentImage={getImageUrl(image)}
                                onUpload={(file) => handleUpload(image.id, file)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Other Images */}
            {otherImages.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 bg-purple-500" />
                        <h2 className="font-display text-[20px] font-light text-white">Other Sections</h2>
                        <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">
                            {otherImages.length} images
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                            >
                                <ImageUploader
                                    imageName={image.name}
                                    description={image.description}
                                    section="Home"
                                    currentImage={getImageUrl(image)}
                                    onUpload={(file) => handleUpload(image.id, file)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Help Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 bg-white/[0.02] border border-white/10 p-6"
            >
                <h3 className="font-sans text-[14px] font-bold text-white mb-3">How it works</h3>
                <ul className="space-y-2">
                    <li className="font-sans text-[13px] text-white/50 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        Click on any image card or drag a new image to upload/replace
                    </li>
                    <li className="font-sans text-[13px] text-white/50 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        Images are automatically uploaded to Cloudinary and saved permanently
                    </li>
                    <li className="font-sans text-[13px] text-white/50 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        When you replace an image, the old one is automatically deleted from storage
                    </li>
                    <li className="font-sans text-[13px] text-white/50 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        Changes persist even after refresh - your uploads are saved!
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
