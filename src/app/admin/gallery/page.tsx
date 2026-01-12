"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
    id: string;
    title: string;
    description?: string;
    category: string;
    image: string; // URL
    publicId?: string;
}

const initialFormState: GalleryImage = {
    id: '',
    title: '',
    description: '',
    category: 'wedding',
    image: '',
    publicId: ''
};

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentImage, setCurrentImage] = useState<GalleryImage>(initialFormState);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Fetch images
    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setImages(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!currentImage.title || !currentImage.image) {
            setMessage({ text: 'Title and Image are required.', type: 'error' });
            return;
        }

        let updatedImages = [...images];
        let newImage = { ...currentImage };

        if (!newImage.id) {
            newImage.id = 'gallery_' + Date.now();
            updatedImages.unshift(newImage); // Add to top
        } else {
            updatedImages = updatedImages.map(img => img.id === newImage.id ? newImage : img);
        }

        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: updatedImages })
            });

            if (res.ok) {
                setImages(updatedImages);
                setIsEditing(false);
                setMessage({ text: 'Gallery updated successfully!', type: 'success' });
                setCurrentImage(initialFormState);
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            setMessage({ text: 'Failed to save gallery.', type: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        const updatedImages = images.filter(img => img.id !== id);
        try {
            await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: updatedImages })
            });
            setImages(updatedImages);
            setMessage({ text: 'Image deleted.', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to delete image.', type: 'error' });
        }
    };

    const handleImageFileChange = async (file: File) => {
        // Upload to 'ambient-gallery' (via section='gallery')
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'gallery');
        // Use title as name if available, else temp name
        const name = currentImage.title ? currentImage.title.replace(/\s+/g, '_').toLowerCase() : 'gallery_' + Date.now();
        formData.append('imageName', name);

        try {
            setMessage({ text: 'Uploading image...', type: 'success' }); // Info state
            const res = await fetch('/api/admin/images', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success && data.image) {
                setCurrentImage(prev => ({
                    ...prev,
                    image: data.image.url,
                    publicId: data.image.publicId
                }));
                setMessage({ text: 'Image uploaded! Click Save to finish.', type: 'success' });
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (e) {
            console.error(e);
            setMessage({ text: 'Upload failed.', type: 'error' });
        }
    };

    if (isLoading) return <div className="text-white p-10">Loading gallery...</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] p-6 lg:p-10 text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-display text-[32px] font-light">Gallery Manager</h1>
                    <p className="text-white/40 text-[14px]">{images.length} images in portfolio</p>
                </div>
                <button
                    onClick={() => { setCurrentImage(initialFormState); setIsEditing(true); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-sm font-sans text-[12px] uppercase tracking-widest font-bold transition-colors"
                >
                    + Add New Image
                </button>
            </div>

            {message && (
                <div onClick={() => setMessage(null)} className={`mb-6 p-4 rounded cursor-pointer ${message.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {images.map(img => (
                    <motion.div key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group">
                        <div className="relative aspect-[3/4] bg-black/50">
                            {img.image ? (
                                <Image src={img.image} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 start" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/20">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => { setCurrentImage(img); setIsEditing(true); }} className="bg-blue-600 p-2 rounded hover:bg-blue-700 text-xs uppercase font-bold">Edit</button>
                                <button onClick={() => handleDelete(img.id)} className="bg-red-600 p-2 rounded hover:bg-red-700 text-xs uppercase font-bold">Del</button>
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-display text-[16px] truncate">{img.title}</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{img.category}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <div className="bg-[#1A1A1A] w-full max-w-2xl rounded-lg border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-[20px] font-display">{currentImage.id ? 'Edit Image' : 'New Gallery Image'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white">Close</button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Title</label>
                                            <input
                                                value={currentImage.title} onChange={e => setCurrentImage({ ...currentImage, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-amber-500 outline-none"
                                                placeholder="e.g. Summer Wedding"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Category</label>
                                            <select
                                                value={currentImage.category} onChange={e => setCurrentImage({ ...currentImage, category: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-amber-500 outline-none"
                                            >
                                                {['wedding', 'portrait', 'events', 'fashion', 'family', 'maternity', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Image</label>
                                        <div className="bg-white/5 border border-white/10 p-4 text-center rounded relative min-h-[150px] flex items-center justify-center flex-col gap-2">
                                            {currentImage.image ? (
                                                <>
                                                    <div className="relative w-full h-[150px] mb-2">
                                                        <Image src={currentImage.image} alt="Preview" fill className="object-contain" />
                                                    </div>
                                                    <p className="text-[10px] text-green-400">Image Selected</p>
                                                </>
                                            ) : (
                                                <p className="text-white/30 text-sm">No Image</p>
                                            )}
                                            <input
                                                type="file" accept="image/*"
                                                onChange={e => e.target.files?.[0] && handleImageFileChange(e.target.files[0])}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <button className="text-[10px] bg-amber-600 px-3 py-1 rounded text-white pointer-events-none">
                                                {currentImage.image ? 'Change Image' : 'Click to Upload'}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-white/20 mt-2 text-center">Files saved to 'ambient-gallery'</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-[#151515]">
                                <button onClick={() => setIsEditing(false)} className="px-5 py-2 text-white/50 text-xs uppercase font-bold hover:text-white">Cancel</button>
                                <button onClick={handleSave} className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs uppercase font-bold tracking-widest">Save Changes</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
