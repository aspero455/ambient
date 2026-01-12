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
            return data.config?.services || {};
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
            body: JSON.stringify({ section: 'services', imageId, url, publicId })
        });
        return res.ok;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export default function AdminServicesPage() {
    const [images, setImages] = useState<ImageConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadImages = useCallback(async () => {
        setIsLoading(true);
        const serverConfig = await fetchImageConfig();
        const mergedImages = defaultImageConfig.services.map(img => ({
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
        formData.append('section', 'services');
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
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-display text-[28px] md:text-[36px] font-light text-white tracking-tight">Services Page Images</h1>
                        <p className="font-sans text-[13px] text-white/40">Manage service card images</p>
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
                    <div className="w-1 h-6 bg-emerald-500" />
                    <h2 className="font-display text-[20px] font-light text-white">Service Cards</h2>
                    <span className="font-sans text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-auto">{images.length} services</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <motion.div key={image.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                            <ImageUploader imageName={image.name} description={image.description} section="Services" currentImage={getImageUrl(image)} onUpload={(file) => handleUpload(image.id, file)} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 bg-gradient-to-r from-emerald-500/10 to-green-500/5 border border-emerald-500/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-sans text-[14px] font-bold text-emerald-400 mb-1">Service Images</h4>
                        <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                            These images are displayed on the service cards. Changes are saved permanently to Cloudinary.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
