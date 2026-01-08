"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Blog Page - "The Journal"
 * 
 * A high-end, editorial blog page that matches the Ambient Frames aesthetic.
 * Features:
 * - Parallax Hero (Services style)
 * - Category filtering
 * - Staggered card reveals
 * - Elegant typography
 */

const blogPosts = [
    {
        id: 1,
        title: "The Art of Natural Light in Portraiture",
        excerpt: "Discover how to harness the sun's softest hours to create hauntingly beautiful portraits that breathe life into every frame.",
        category: "Tutorial",
        date: "Jan 12, 2024",
        readTime: "6 min read",
        image: "/img/524877796_18281941537284138_7194601866269685029_n..webp",
        featured: true
    },
    {
        id: 2,
        title: "Capturing the Unseen: Wedding Moments",
        excerpt: "Beyond the posed shots lie the true essence of a wedding. We explore the candid split-seconds that define a lifetime of love.",
        category: "Inside Look",
        date: "Jan 08, 2024",
        readTime: "8 min read",
        image: "/img/528577300_18282637933284138_6024131309224852219_n..webp",
        featured: false
    },
    {
        id: 3,
        title: "Gear Talk: Why We Still Choose Leica",
        excerpt: "Technical specifications are just part of the story. Explore why the Leica aesthetic remains the gold standard for our studio.",
        category: "Equipment",
        date: "Jan 05, 2024",
        readTime: "10 min read",
        image: "/img/528631979_18282710314284138_2035724994247197640_n..webp",
        featured: false
    },
    {
        id: 4,
        title: "The Mumbai Color Palette: A Visual Guide",
        excerpt: "How the vibrant yet cinematic colors of Mumbai influence our post-processing and visual storytelling approach.",
        category: "Perspective",
        date: "Dec 28, 2023",
        readTime: "5 min read",
        image: "/img/529672310_18282710362284138_7894353990389373612_n..webp",
        featured: false
    },
    {
        id: 5,
        title: "Directing Models for Emotional Authenticity",
        excerpt: "Moving beyond technical perfection to capture raw, honest human emotions in high-fashion and commercial shoots.",
        category: "Tutorial",
        date: "Dec 20, 2023",
        readTime: "12 min read",
        image: "/img/530361918_18283380247284138_133094580325100578_n..webp",
        featured: false
    },
    {
        id: 6,
        title: "Black & White: The Soul of Cinematography",
        excerpt: "Removing color often reveals the deepest truths. Why monochrome photography continues to dominate modern luxury branding.",
        category: "Analysis",
        date: "Dec 15, 2023",
        readTime: "7 min read",
        image: "/img/531822595_18283640836284138_2008306935621772497_n..webp",
        featured: false
    }
];

const categories = ["All Stories", "Tutorial", "Inside Look", "Equipment", "Perspective", "Analysis"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All Stories");
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    const filteredPosts = activeCategory === "All Stories"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="flex-grow">
                {/* ═══════════════════════════════════════════════════════════════
                    HERO: SERVICES STYLE
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[70vh] bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5] overflow-hidden flex items-center"
                >
                    {/* Background Grid */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                            transform: `translateY(${scrollY * 0.1}px)`,
                        }}
                    />

                    {/* Glowing Orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute w-60 h-60 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 40%, transparent 70%)',
                                boxShadow: '0 0 100px 40px rgba(0,0,0,0.05)',
                            }}
                            animate={{
                                x: [0, 150, 80, -80, 0],
                                y: [0, -120, 60, 150, 0],
                                scale: [1, 1.2, 0.9, 1.1, 1],
                            }}
                            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '10%', left: '10%' }}
                        />
                    </div>

                    {/* Camera Icons Background */}
                    <AnimatedCameraBackground opacity={0.1} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10 pt-20">
                        <div className="max-w-[900px]">
                            {/* Eyebrow */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/60">
                                    The Journal
                                </span>
                            </motion.div>

                            {/* Main Headline */}
                            <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-10">
                                {["Stories,", "Insights", "&", "Perspectives"].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        className="inline-block mr-4 last:mr-0"
                                        initial={{ opacity: 0, y: 80 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        style={{ fontSize: 'clamp(42px, 8vw, 90px)' }}
                                    >
                                        {word === "&" ? <span className="italic text-black/20 font-light">{word}</span> : word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                className="font-sans text-[18px] md:text-[20px] leading-[1.7] text-black/60 max-w-[550px]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                Exploring the intersection of technical excellence and authentic human storytelling in contemporary photography.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    FILTER BAR
                ═══════════════════════════════════════════════════════════════ */}
                <section className="sticky top-[60px] md:top-[80px] z-30 bg-white border-b border-black/5">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`font-sans text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all relative py-2 ${activeCategory === cat ? 'text-black' : 'text-black/30 hover:text-black'
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    BLOG GRID
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-sm">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-black/40 text-[11px] font-medium uppercase tracking-wider">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-black/20 rounded-full" />
                                                <span>{post.readTime}</span>
                                            </div>

                                            <h3 className="font-display text-[24px] md:text-[28px] text-black leading-tight group-hover:text-black/60 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="font-sans text-[15px] text-black/50 leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="pt-2">
                                                <span className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-black group-hover:gap-5 transition-all">
                                                    Read Story
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    NEWSLETTER: THE JOURNAL BRIEF
                ═══════════════════════════════════════════════════════════════ */}
                <section className="bg-black py-24 md:py-40 overflow-hidden relative">
                    <AnimatedCameraBackground opacity={0.15} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10 text-center">
                        <div className="max-w-[700px] mx-auto">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8 block"
                            >
                                Stay Inspired
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display font-light text-[40px] md:text-[64px] text-white leading-tight mb-10 tracking-tight"
                            >
                                Join our monthly <br />
                                <span className="italic text-white/30">Visual Journal</span>
                            </motion.h2>

                            <p className="font-sans text-[16px] text-white/50 mb-12 max-w-[450px] mx-auto leading-relaxed">
                                Curated insights on clinical photography, cinematic storytelling, and studio updates delivered once a month.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-white font-sans text-[14px] outline-none focus:border-white/30 transition-colors"
                                />
                                <button className="bg-white text-black px-8 py-4 font-sans font-bold text-[11px] uppercase tracking-widest hover:bg-white/90 transition-all">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
