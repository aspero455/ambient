"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Gallery Page - The Collective Exhibit
 * 
 * Features a minimalist 2-column layout as requested,
 * with premium parallax effects and archival-style typography.
 */

const galleryImages = [
    {
        src: "/img/524877796_18281941537284138_7194601866269685029_n..webp",
        title: "Ethereal Morning",
        category: "Bridal",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/img/528577300_18282637933284138_6024131309224852219_n..webp",
        title: "Urban Echoes",
        category: "Portrait",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/img/528631979_18282710314284138_2035724994247197640_n..webp",
        title: "The Golden Union",
        category: "Wedding",
        aspect: "aspect-square"
    },
    {
        src: "/img/529672310_18282710362284138_7894353990389373612_n..webp",
        title: "Velvet Shadows",
        category: "Editorial",
        aspect: "aspect-square"
    },
    {
        src: "/img/530361918_18283380247284138_133094580325100578_n..webp",
        title: "Ancestral Light",
        category: "Cultural",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/img/531822595_18283640836284138_2008306935621772497_n..webp",
        title: "Silent Symmetry",
        category: "Architecture",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/img/532508474_18283639534284138_7821912398438107581_n..webp",
        title: "Midnight Soul",
        category: "Black & White",
        aspect: "aspect-square"
    },
    {
        src: "/img/566414945_18292643884284138_3751019525464458517_n.jpeg",
        title: "Bloom & Dust",
        category: "Fashion",
        aspect: "aspect-square"
    },
    {
        src: "/img/567395566_18292643899284138_984878061390000747_n.jpeg",
        title: "The Voyager",
        category: "Candid",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/img/584919632_18301346926284138_3623525760133837999_n.jpeg",
        title: "Infinite Gaze",
        category: "Macro",
        aspect: "aspect-[4/5]"
    }
];

export default function GalleryPage() {
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="overflow-hidden">
                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 1: HERO - The Collective Exhibition
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[70vh] bg-white overflow-hidden flex items-center justify-center pt-20"
                >
                    {/* Background Layers */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* 1. Grid */}
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, black 1px, transparent 1px),
                                    linear-gradient(to bottom, black 1px, transparent 1px)
                                `,
                                backgroundSize: '80px 80px',
                                transform: `translateY(${scrollY * 0.15}px)`,
                            }}
                        />

                        {/* 2. Soft Orbs */}
                        <motion.div
                            className="absolute top-1/4 right-[5%] w-[500px] h-[500px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
                                filter: 'blur(60px)',
                            }}
                            animate={{
                                y: [0, -40, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
                                filter: 'blur(50px)',
                            }}
                            animate={{
                                y: [0, 50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />

                        {/* 3. Golden Highlight Orb */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
                                filter: 'blur(100px)',
                            }}
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Animated Camera Background */}
                    <AnimatedCameraBackground opacity={0.1} />

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-black/40 mb-6"
                        >
                            Visual Archives
                        </motion.span>
                        <h1 className="font-display font-light leading-[0.9] tracking-[-0.04em] text-black mb-8">
                            {["The", "Collective", "Exhibit"].map((word, index) => (
                                <motion.span
                                    key={word}
                                    className="inline-block mr-4 last:mr-0"
                                    initial={{ opacity: 0, y: 80 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.15 }}
                                    style={{ fontSize: 'clamp(56px, 12vw, 140px)' }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="font-sans text-[18px] text-black/60 max-w-[600px] mx-auto leading-relaxed"
                        >
                            A curated selection of our most profound works. Each frame is a testament to the art of stillness and the power of light.
                        </motion.p>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
                    >
                        <span className="font-sans text-[10px] uppercase tracking-widest text-black/30">Explore Gallery</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-black/40 to-transparent" />
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 2: THE GRID - 2 Columns Layout
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-40 bg-white">
                    <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-48">
                            {galleryImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`group relative ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                                >
                                    {/* Image Container */}
                                    <div className={`relative overflow-hidden bg-[#F5F5F5] ${image.aspect} shadow-2xl`}>
                                        <Image
                                            src={image.src}
                                            alt={image.title}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                                        {/* Floating Tag */}
                                        <div className="absolute top-8 left-8">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-black font-sans text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                                                {image.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Caption */}
                                    <div className="mt-8 flex justify-between items-start">
                                        <div>
                                            <h3 className="font-display text-[24px] md:text-[32px] font-light text-black transition-colors group-hover:text-black/60 capitalize">
                                                {image.title}
                                            </h3>
                                            <div className="w-12 h-[1px] bg-black/20 mt-3 transition-all duration-700 group-hover:w-full" />
                                        </div>
                                        <div className="text-right">
                                            <span className="font-sans text-[12px] text-black/40 tabular-nums">
                                                № {String(index + 1).padStart(3, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Archival Details Hover */}
                                    <div className="absolute -bottom-12 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden lg:block">
                                        <p className="font-sans text-[10px] text-black/30 uppercase tracking-[0.2em] italic">
                                            Phase I • Ambient Frames Studio
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 3: CLOSING - Archival Statement
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-40 bg-[#FAFAFA] border-t border-black/5">
                    <div className="container mx-auto px-6 text-center max-w-[800px]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center gap-12"
                        >
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center p-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </div>
                            <h2 className="font-display text-[42px] font-light text-black leading-tight italic">
                                "The best thing about a picture is that it never changes, even when the people in it do."
                            </h2>
                            <p className="font-sans text-[12px] uppercase tracking-[0.4em] text-black/40">
                                — Andy Warhol
                            </p>
                            <div className="w-[1px] h-20 bg-black/10 mt-12" />
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
