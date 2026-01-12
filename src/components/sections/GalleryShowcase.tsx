"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GalleryShowcase (Home Portfolio) Component
 * 
 * Shows a curated highlight of projects.
 * Features:
 * - Glowing atmospheric background.
 * - Interactive modal preview (synced with Projects Page).
 */

interface Project {
    id: string | number;
    title: string;
    category: string;
    image: string;
    location?: string;
    year?: string;
    story?: string;
    process?: string;
    details?: {
        client: string;
        service: string;
        deliverables: string;
    };
}

const GalleryShowcase: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch projects from API
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data.slice(0, 3));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    // Even if loading, show structure. If empty, show nothing.
    if (!isLoading && !projects.length) return null;

    return (
        <section className="relative bg-white py-24 md:py-32 overflow-hidden" id="portfolio">
            {/* ═══════════════════════════════════════════════════════════════
                 Background Animations (Black Glow)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.2, 1],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -right-[15%] w-[800px] h-[800px] bg-gradient-radial from-black/5 to-transparent blur-[120px] rounded-full hidden md:block"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-black/5 blur-[100px] rounded-full hidden md:block"
                />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-[1440px] relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-[600px]"
                    >
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/40 mb-4 block">
                            Our Portfolio
                        </span>
                        <h2 className="font-display text-[48px] md:text-[64px] font-light text-black leading-[1] tracking-[-0.03em]">
                            Stories we've <span className="text-black/40">captured.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block mb-4"
                    >
                        <Link
                            href="/projects"
                            className="text-[12px] font-sans font-bold uppercase tracking-[0.1em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-all"
                        >
                            View All Projects
                        </Link>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => {
                        if (!project) return null;
                        const imageSrc = project.image || '/img/placeholder.jpg';

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="flex flex-col gap-6 group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image Container (Now clickable trigger for modal) */}
                                <div className="block relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl">
                                    <Image
                                        src={imageSrc}
                                        alt={project.title || 'Project Image'}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                    />
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                    {/* Icon */}
                                    <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md transform translate-y-2 group-hover:translate-y-0">
                                        <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="font-display text-[28px] font-light text-black leading-tight group-hover:text-black/60 transition-colors">
                                        {project.title}
                                    </h3>
                                    {project.location && (
                                        <p className="font-sans text-[12px] text-black/60 mt-1">{project.location}</p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 md:hidden text-center">
                    <Link href="/projects">
                        <button className="bg-black text-white px-8 py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] w-full">
                            View Full Portfolio
                        </button>
                    </Link>
                </div>

            </div>

            {/* ═══════════════════════════════════════════════════════════════
                 PREVIEW MODAL (Duplicated from Projects Page)
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-black/5"
                        >
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col lg:flex-row w-full h-full">

                            {/* LEFT: IMAGE */}
                            <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-full bg-black">
                                <motion.div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent" />
                                <Image
                                    src={selectedProject.image || '/img/placeholder.jpg'}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* RIGHT: CONTENT */}
                            <div className="w-full lg:w-[45%] h-[60vh] lg:h-full overflow-y-auto bg-white custom-scrollbar">
                                <div className="p-8 md:p-16 pt-20">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="w-2 h-2 bg-black rounded-full" />
                                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-black/50">
                                                Project Glance
                                            </span>
                                        </div>

                                        <h2 className="font-display text-[48px] md:text-[64px] leading-[1] text-black mb-6">
                                            {selectedProject.title}
                                        </h2>

                                        {selectedProject.details && (
                                            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 border-b border-black/10 pb-8">
                                                <div>
                                                    <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Client</span>
                                                    <span className="font-sans text-[14px]">{selectedProject.details.client}</span>
                                                </div>
                                                <div>
                                                    <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Service</span>
                                                    <span className="font-sans text-[14px]">{selectedProject.details.service}</span>
                                                </div>
                                                {selectedProject.year && (
                                                    <div>
                                                        <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Year</span>
                                                        <span className="font-sans text-[14px]">{selectedProject.year}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-8"
                                    >
                                        {selectedProject.story && (
                                            <section>
                                                <h3 className="font-sans text-[12px] uppercase font-bold tracking-widest text-black mb-4">The Vision</h3>
                                                <p className="font-serif text-[18px] leading-relaxed text-black/80">{selectedProject.story}</p>
                                            </section>
                                        )}

                                        {selectedProject.process && (
                                            <section>
                                                <h3 className="font-sans text-[12px] uppercase font-bold tracking-widest text-black mb-4">Our Process</h3>
                                                <p className="font-sans text-[15px] leading-loose text-black/60">{selectedProject.process}</p>
                                            </section>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-16 pt-8 border-t border-black/10"
                                    >
                                        <Link
                                            href="/contact"
                                            className="group flex items-center justify-between w-full p-6 bg-black text-white hover:bg-black/90 transition-colors rounded-sm"
                                        >
                                            <span className="font-sans text-[12px] uppercase tracking-[0.2em] font-bold">Inquire Now</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>

                                    <div className="mt-8 text-center">
                                        <Link href={`/projects`} className="font-sans text-[10px] underline text-black/40 hover:text-black">
                                            View Full Project Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GalleryShowcase;
