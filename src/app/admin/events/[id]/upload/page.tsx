"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UploadPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});
    const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFiles = async () => {
        setUploading(true);

        // Sequential upload to avoid overwhelming network/browser
        // Or parallel with limit. Let's do batches of 3.
        const BATCH_SIZE = 3;

        for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const batch = files.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(file => uploadSingleFile(file)));
        }

        setUploading(false);
        // Maybe redirect or show success
        alert("All uploads complete!");
        router.push('/admin/events');
    };

    const uploadSingleFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('eventId', eventId);

        try {
            // Fake progress interval
            const interval = setInterval(() => {
                setProgress(prev => ({
                    ...prev,
                    [file.name]: Math.min((prev[file.name] || 0) + 10, 90)
                }));
            }, 200);

            const res = await fetch('/api/admin/photos/upload', {
                method: 'POST',
                body: formData
            });

            clearInterval(interval);

            if (res.ok) {
                setProgress(prev => ({ ...prev, [file.name]: 100 }));
                setCompleted(prev => ({ ...prev, [file.name]: true }));
            } else {
                // Mark error
                console.error("Failed to upload", file.name);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="text-white/40 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="font-display text-3xl text-white">Upload Photos</h1>
            </div>

            <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-8 mb-8">
                <div
                    className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <p className="font-display text-xl text-white mb-2">Drop photos here or click to browse</p>
                    <p className="font-sans text-white/40 text-sm">Support for JPG, PNG (Max 50MB per file)</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold">{files.length} Photos Selected</h3>
                        {!uploading && (
                            <button
                                onClick={uploadFiles}
                                className="bg-white text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-white/90"
                            >
                                Start Upload
                            </button>
                        )}
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-lg">
                                <div className="w-12 h-12 bg-white/5 rounded overflow-hidden">
                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm truncate">{file.name}</p>
                                    <p className="text-white/40 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>

                                <div className="w-32">
                                    {uploading && (
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${completed[file.name] ? 'bg-emerald-500' : 'bg-white'}`}
                                                style={{ width: `${progress[file.name] || 0}%` }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {completed[file.name] ? (
                                    <span className="text-emerald-500">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                ) : (
                                    !uploading && (
                                        <button onClick={() => removeFile(i)} className="text-white/20 hover:text-red-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
