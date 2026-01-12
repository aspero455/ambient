"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';

interface Project {
    id: string | number;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    size: "large" | "medium" | "small";
    story: string;
    process: string;
    details: {
        client: string;
        service: string;
        deliverables: string;
    };
}

const initialFormState: Project = {
    id: '',
    title: '',
    category: 'Wedding',
    location: '',
    year: new Date().getFullYear().toString(),
    image: '',
    size: 'medium',
    story: '',
    process: '',
    details: {
        client: '',
        service: '',
        deliverables: ''
    }
};

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project>(initialFormState);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Fetch projects
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProjects(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!currentProject.title || !currentProject.image) {
            setMessage({ text: 'Title and Image are required.', type: 'error' });
            return;
        }

        let updatedProjects = [...projects];
        let newProject = { ...currentProject };

        if (currentProject.id) {
            // Update
            updatedProjects = updatedProjects.map(p => p.id === currentProject.id ? newProject : p);
        } else {
            // Create
            newProject.id = crypto.randomUUID();
            updatedProjects.push(newProject);
        }

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects: updatedProjects })
            });

            if (res.ok) {
                setProjects(updatedProjects);
                setIsEditing(false);
                setMessage({ text: 'Project saved successfully!', type: 'success' });
                setCurrentProject(initialFormState);
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            setMessage({ text: 'Failed to save project.', type: 'error' });
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const updatedProjects = projects.filter(p => p.id !== id);
        try {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects: updatedProjects })
            });
            setProjects(updatedProjects);
            setMessage({ text: 'Project deleted.', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to delete project.', type: 'error' });
        }
    };

    const handleImageUploaded = (file: File) => {
        // This is tricky because ImageUploader does upload internally but we need the URL.
        // We will assume ImageUploader has onUpload completion that provides URL? 
        // Existing ImageUploader provides `file` only in callback. 
        // We must implement upload logic here if we use the generic uploader, 
        // OR rely on ImageUploader to define the URL?
        // Let's modify handleImageUpload to perform the upload and return URL.

        // Wait, standard ImageUploader in this codebase might just select file. 
        // Let's implement the upload call here.
        const formData = new FormData();
        formData.append('file', file);
        formData.append('section', 'projects');
        formData.append('imageName', currentProject.id ? currentProject.id.toString() : 'temp_' + Date.now());

        // Perform upload
        fetch('/api/admin/images', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                if (data.image?.url) {
                    setCurrentProject(prev => ({ ...prev, image: data.image.url }));
                    setMessage({ text: 'Image uploaded successfully!', type: 'success' });
                }
            })
            .catch(() => setMessage({ text: 'Image upload failed.', type: 'error' }));
    };

    if (isLoading) return <div className="text-white p-10">Loading projects...</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] p-6 lg:p-10 text-white">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-display text-[32px] font-light">Project Manager</h1>
                    <p className="text-white/40 text-[14px]">Add and edit portfolio projects</p>
                </div>
                <button
                    onClick={() => { setCurrentProject(initialFormState); setIsEditing(true); }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-sm font-sans text-[12px] uppercase tracking-widest font-bold transition-colors"
                >
                    + Add New Project
                </button>
            </div>

            {message && (
                <div onClick={() => setMessage(null)} className={`mb-6 p-4 rounded cursor-pointer ${message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map(project => (
                    <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group">
                        <div className="relative aspect-[3/4] bg-black/20">
                            {project.image ? (
                                <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/20">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="bg-blue-600 p-2 rounded hover:bg-blue-700">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(project.id)} className="bg-red-600 p-2 rounded hover:bg-red-700">
                                    Del
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-display text-[18px]">{project.title}</h3>
                            <p className="text-[12px] text-white/40 uppercase tracking-widest">{project.category}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
                    >
                        <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-lg shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-[20px] font-display">{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white">Close</button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="block text-[12px] uppercase tracking-widest text-white/40">Title</label>
                                        <input
                                            value={currentProject.title}
                                            onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-cyan-500 outline-none"
                                            placeholder="Project Title"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[12px] uppercase tracking-widest text-white/40">Category</label>
                                        <select
                                            value={currentProject.category}
                                            onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-cyan-500 outline-none"
                                        >
                                            {["Wedding", "Portrait", "Corporate", "Fashion", "Maternity"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[12px] uppercase tracking-widest text-white/40">Details</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input value={currentProject.location} onChange={e => setCurrentProject({ ...currentProject, location: e.target.value })} placeholder="Location" className="bg-white/5 border border-white/10 p-2 text-white" />
                                            <input value={currentProject.year} onChange={e => setCurrentProject({ ...currentProject, year: e.target.value })} placeholder="Year" className="bg-white/5 border border-white/10 p-2 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[12px] uppercase tracking-widest text-white/40">Size</label>
                                        <select value={currentProject.size} onChange={e => setCurrentProject({ ...currentProject, size: e.target.value as any })} className="w-full bg-white/5 border border-white/10 p-3 text-white">
                                            <option value="small">Small (1 col)</option>
                                            <option value="medium">Medium (2 col)</option>
                                            <option value="large">Large (Full)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-4 border-t border-white/10 pt-6">
                                    <label className="block text-[12px] uppercase tracking-widest text-white/40">Project Image</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        {currentProject.image && (
                                            <div className="relative aspect-[3/4] w-[150px] bg-black/50">
                                                <Image src={currentProject.image} alt="Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            {/* Reuse ImageUploader but capture upload event via our own handler wrapper logic */}
                                            {/* We simulate ImageUploader usage: */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) handleImageUploaded(e.target.files[0]);
                                                }}
                                                className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-cyan-500 file:text-white
                                                hover:file:bg-cyan-600"
                                            />
                                            <p className="text-[10px] text-white/30 mt-2">Upload updates image immediately.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-4 border-t border-white/10 pt-6">
                                    <label className="block text-[12px] uppercase tracking-widest text-white/40">Story (The Vision)</label>
                                    <textarea
                                        value={currentProject.story}
                                        onChange={e => setCurrentProject({ ...currentProject, story: e.target.value })}
                                        className="w-full h-24 bg-white/5 border border-white/10 p-3 text-white focus:border-cyan-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[12px] uppercase tracking-widest text-white/40">Process</label>
                                    <textarea
                                        value={currentProject.process}
                                        onChange={e => setCurrentProject({ ...currentProject, process: e.target.value })}
                                        className="w-full h-24 bg-white/5 border border-white/10 p-3 text-white focus:border-cyan-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase text-white/40">Client</label>
                                        <input value={currentProject.details.client} onChange={e => setCurrentProject({ ...currentProject, details: { ...currentProject.details, client: e.target.value } })} className="w-full bg-white/5 border border-white/10 p-2 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase text-white/40">Service</label>
                                        <input value={currentProject.details.service} onChange={e => setCurrentProject({ ...currentProject, details: { ...currentProject.details, service: e.target.value } })} className="w-full bg-white/5 border border-white/10 p-2 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase text-white/40">Deliverables</label>
                                        <input value={currentProject.details.deliverables} onChange={e => setCurrentProject({ ...currentProject, details: { ...currentProject.details, deliverables: e.target.value } })} className="w-full bg-white/5 border border-white/10 p-2 text-white" />
                                    </div>
                                </div>

                            </div>

                            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#151515]">
                                <button onClick={() => setIsEditing(false)} className="px-6 py-2 text-white/60 hover:text-white">Cancel</button>
                                <button onClick={handleSave} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold tracking-widest uppercase text-[12px]">Save Project</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
