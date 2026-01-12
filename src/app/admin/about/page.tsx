"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';
import { defaultImageConfig, ImageConfig } from '@/lib/imageConfig';

async function fetchImageConfig(): Promise<Record<string, { url: string; publicId: string }>> {
    try {
        const res = await fetch('/api/admin/images/sync');
        if (res.ok) {
            const data = await res.json();
            return data.config?.about || {};
        }
    } catch (error) {
        console.error('Failed to fetch config:', error);
    }
    return {};
}

async function saveImageConfig(imageId: string, url: string, publicId: string): Promise<boolean> {
    try {
        const res = await fetch('/api/admin/images/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ section: 'about', imageId, url, publicId })
        });
        return res.ok;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export default function AdminAboutPage() {
    const [images, setImages] = useState<ImageConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadImages = useCallback(async () => {
        setIsLoading(true);
        const serverConfig = await fetchImageConfig();
        const mergedImages = defaultImageConfig.about.map(img => ({
            ...img,
            cloudinaryUrl: serverConfig[img.id]?.url || img.cloudinaryUrl,
            cloudinaryPublicId: serverConfig[img.id]?.publicId || img.cloudinaryPublicId
        }));
        setImages(mergedImages);
        setIsLoading(false);
    }, []);

    useEffect(() => { loadImages(); }, [loadImages]);

    const handleUpload = async (imageId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'about');
        formData.append('imageName', imageId);

        const currentImage = images.find(img => img.id === imageId);
        if (currentImage?.cloudinaryPublicId) {
            formData.append('oldPublicId', currentImage.cloudinaryPublicId);
        }

        const method = currentImage?.cloudinaryUrl ? 'PUT' : 'POST';
        const res = await fetch('/api/admin/images', { method, body: formData });
        if (!res.ok) throw new Error('Upload failed');

        const data = await res.json();
        await saveImageConfig(imageId, data.image.url, data.image.publicId);

        setImages(prev => prev.map(img =>
            img.id === imageId
                ? { ...img, cloudinaryUrl: data.image.url, cloudinaryPublicId: data.image.publicId }
                : img
        ));

        setSuccessMessage(`${currentImage?.name || 'Image'} updated successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const getImageUrl = (image: ImageConfig): string => image.cloudinaryUrl || image.defaultUrl;

    const heroImages = images.filter(img => img.category === 'hero');
    const storyImages = images.filter(img => img.category === 'story');
    const servicesImages = images.filter(img => img.category === 'services');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] p-6 md:p-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-display text-[28px] md:text-[36px] font-light text-white tracking-tight">About Page Images</h1>
                        <p className="font-sans text-[13px] text-white/40">Manage images displayed on the about page</p>
                    </div>
                </div>
            </motion.div>

            {successMessage && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="font-sans text-[14px] text-emerald-400">{successMessage}</p>
                </motion.div>
            )}

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-purple-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Hero Section</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">{heroImages.length} images</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroImages.map((image, index) => (
                        <motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                            <ImageUploader imageName={image.name} description={image.description} section="About" currentImage={getImageUrl(image)} onUpload={(file) => handleUpload(image.id, file)} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-pink-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Story Section</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">{storyImages.length} images</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storyImages.map((image, index) => (
                        <motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05 }}>
                            <ImageUploader imageName={image.name} description={image.description} section="About" currentImage={getImageUrl(image)} onUpload={(file) => handleUpload(image.id, file)} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-indigo-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Services Preview</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">{servicesImages.length} images</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {servicesImages.map((image, index) => (
                        <motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.05 }}>
                            <ImageUploader imageName={image.name} description={image.description} section="About" currentImage={getImageUrl(image)} onUpload={(file) => handleUpload(image.id, file)} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
