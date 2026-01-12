"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageUploaderProps {
    onUpload: (file: File) => Promise<void>;
    currentImage?: string;
    imageName: string;
    section: string;
    description?: string;
    isLoading?: boolean;
}

export default function ImageUploader({
    onUpload,
    currentImage,
    imageName,
    section,
    description,
    isLoading = false
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Image size must be less than 10MB');
            return;
        }

        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        try {
            await onUpload(file);
            setUploadProgress(100);
            setTimeout(() => {
                setPreview(null);
                setUploadProgress(0);
            }, 1000);
        } catch (err) {
            setError('Failed to upload image. Please try again.');
            setPreview(null);
        } finally {
            clearInterval(progressInterval);
            setIsUploading(false);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
        },
        maxFiles: 1,
        disabled: isUploading || isLoading
    });

    const displayImage = preview || currentImage;

    return (
        <div className="bg-white/[0.02] border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-sans text-[14px] font-medium text-white">{imageName}</h3>
                        {description && (
                            <p className="font-sans text-[11px] text-white/40 mt-0.5">{description}</p>
                        )}
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-white/30 bg-white/5 px-2 py-1">
                        {section}
                    </span>
                </div>
            </div>

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`relative aspect-[4/3] cursor-pointer transition-all ${isDragActive ? 'bg-white/10' : 'bg-black/20'
                    } ${isUploading || isLoading ? 'pointer-events-none' : ''}`}
            >
                <input {...getInputProps()} />

                {/* Current/Preview Image */}
                {displayImage && (
                    <Image
                        src={displayImage}
                        alt={imageName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                )}

                {/* Overlay */}
                <div className={`absolute inset-0 transition-opacity ${isDragActive || !displayImage ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}>
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                        {isDragActive ? (
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-3 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="font-sans text-[13px] text-white">Drop image here</p>
                            </motion.div>
                        ) : (
                            <div className="text-center">
                                <div className="w-14 h-14 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="font-sans text-[13px] text-white mb-1">
                                    {displayImage ? 'Click or drag to replace' : 'Click or drag to upload'}
                                </p>
                                <p className="font-sans text-[10px] text-white/40">
                                    JPG, PNG, WebP up to 10MB
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Progress */}
                <AnimatePresence>
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
                        >
                            <div className="w-16 h-16 mb-4">
                                <svg className="w-full h-full animate-spin text-white/20" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </div>
                            <p className="font-sans text-[13px] text-white mb-2">Uploading...</p>
                            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-amber-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="font-sans text-[11px] text-white/40 mt-2">{uploadProgress}%</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success Overlay */}
                <AnimatePresence>
                    {uploadProgress === 100 && !isUploading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red-500/10 border-t border-red-500/20 px-4 py-3"
                    >
                        <p className="font-sans text-[12px] text-red-400 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
