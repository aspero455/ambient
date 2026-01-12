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
            return data.config?.blog || {};
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
            body: JSON.stringify({ section: 'blog', imageId, url, publicId })
        });
        return res.ok;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export default function AdminBlogPage() {
    const [images, setImages] = useState<ImageConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadImages = useCallback(async () => {
        setIsLoading(true);
        const serverConfig = await fetchImageConfig();
        const mergedImages = defaultImageConfig.blog.map(img => ({
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
        formData.append('section', 'blog');
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
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-display text-[28px] md:text-[36px] font-light text-white tracking-tight">Blog Page Images</h1>
                        <p className="font-sans text-[13px] text-white/40">Manage blog post featured images</p>
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

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-rose-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Blog Post Images</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">{images.length} posts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                            <ImageUploader imageName={image.name} description={image.description} section="Blog" currentImage={getImageUrl(image)} onUpload={(file) => handleUpload(image.id, file)} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 bg-gradient-to-r from-rose-500/10 to-red-500/5 border border-rose-500/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-sans text-[14px] font-bold text-rose-400 mb-1">Blog Post Images</h4>
                        <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                            These images are displayed as featured images on your blog posts. Changes are saved permanently to Cloudinary.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
