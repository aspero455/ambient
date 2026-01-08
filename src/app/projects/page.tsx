"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Projects Page - Modern Redesign
 * A stunning portfolio showcase with creative layouts and smooth animations
 */

// Portfolio images
const portfolioImages = [
    "/img/524877796_18281941537284138_7194601866269685029_n..webp",
    "/img/528577300_18282637933284138_6024131309224852219_n..webp",
    "/img/528631979_18282710314284138_2035724994247197640_n..webp",
    "/img/529672310_18282710362284138_7894353990389373612_n..webp",
    "/img/530361918_18283380247284138_133094580325100578_n..webp",
    "/img/531822595_18283640836284138_2008306935621772497_n..webp",
    "/img/532239093_18283639591284138_1240929492701407161_n..webp",
    "/img/532501606_18283429012284138_3710883859252304802_n..webp",
    "/img/532508474_18283639534284138_7821912398438107581_n..webp",
    "/img/566414945_18292643884284138_3751019525464458517_n.jpeg",
    "/img/567395566_18292643899284138_984878061390000747_n.jpeg",
    "/img/584919632_18301346926284138_3623525760133837999_n.jpeg",
];

// Featured projects for hero
const featuredProjects = [
    {
        id: 1,
        title: "The Royal Wedding",
        category: "Wedding",
        year: "2024",
        image: portfolioImages[0],
    },
    {
        id: 2,
        title: "Fashion Forward",
        category: "Editorial",
        year: "2024",
        image: portfolioImages[5],
    },
    {
        id: 3,
        title: "New Beginnings",
        category: "Maternity",
        year: "2024",
        image: portfolioImages[10],
    },
];

// All projects
const projects = [
    { id: 1, title: "The Royal Wedding", category: "Wedding", location: "Mumbai", image: portfolioImages[0], size: "large" },
    { id: 2, title: "Corporate Summit", category: "Corporate", location: "Bangalore", image: portfolioImages[3], size: "small" },
    { id: 3, title: "Fashion Forward", category: "Fashion", location: "Delhi", image: portfolioImages[5], size: "medium" },
    { id: 4, title: "Family Legacy", category: "Portrait", location: "Pune", image: portfolioImages[8], size: "small" },
    { id: 5, title: "New Beginnings", category: "Maternity", location: "Goa", image: portfolioImages[10], size: "large" },
    { id: 6, title: "Luxury Launch", category: "Corporate", location: "Mumbai", image: portfolioImages[1], size: "medium" },
    { id: 7, title: "Intimate Celebration", category: "Wedding", location: "Maldives", image: portfolioImages[2], size: "small" },
    { id: 8, title: "CEO Portraits", category: "Portrait", location: "Hyderabad", image: portfolioImages[4], size: "medium" },
    { id: 9, title: "Monsoon Magic", category: "Fashion", location: "Kerala", image: portfolioImages[6], size: "large" },
    { id: 10, title: "Baby Steps", category: "Maternity", location: "Mumbai", image: portfolioImages[11], size: "small" },
    { id: 11, title: "Heritage Wedding", category: "Wedding", location: "Chennai", image: portfolioImages[7], size: "medium" },
    { id: 12, title: "Startup Culture", category: "Corporate", location: "Bangalore", image: portfolioImages[9], size: "small" },
];

// Categories
const categories = ["All", "Wedding", "Portrait", "Corporate", "Fashion", "Maternity"];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Track cursor for custom effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="overflow-hidden">
                {/* ═══════════════════════════════════════════════════════════════
                    HERO - Immersive Fullscreen Showcase
                ═══════════════════════════════════════════════════════════════ */}
                {/* ═══════════════════════════════════════════════════════════════
                    HERO - Immersive Fullscreen Showcase
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[90vh] bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5] overflow-hidden flex items-center justify-center"
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
                            className="absolute w-[600px] h-[600px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
                            }}
                            animate={{
                                x: [0, 100, -50, 80, 0],
                                y: [0, -80, 60, -40, 0],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '10%', left: '20%' }}
                        />
                        <motion.div
                            className="absolute w-40 h-40 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 40%, transparent 70%)',
                                boxShadow: '0 0 80px 30px rgba(0,0,0,0.08)',
                            }}
                            animate={{
                                x: [0, 120, 60, -60, 0],
                                y: [0, -100, 50, 120, 0],
                                scale: [1, 1.3, 0.8, 1.1, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '20%', left: '5%' }}
                        />
                        <motion.div
                            className="absolute w-24 h-24 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, transparent 70%)',
                                boxShadow: '0 0 50px 20px rgba(0,0,0,0.06)',
                            }}
                            animate={{
                                x: [0, -80, 100, -50, 0],
                                y: [0, 80, -60, 100, 0],
                                scale: [1, 0.7, 1.4, 0.9, 1],
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '60%', right: '10%' }}
                        />
                        <motion.div
                            className="absolute w-16 h-16 rounded-full hidden md:block"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                                boxShadow: '0 0 35px 12px rgba(0,0,0,0.08)',
                            }}
                            animate={{
                                x: [0, 60, -40, 80, 0],
                                y: [0, -60, 40, -80, 0],
                                scale: [1, 1.5, 0.6, 1.2, 1],
                                opacity: [0.8, 1, 0.5, 1, 0.8],
                            }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '40%', left: '50%' }}
                        />
                        <motion.div
                            className="absolute w-64 h-64 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 70%)',
                                boxShadow: '0 0 60px 20px rgba(239, 68, 68, 0.08)',
                            }}
                            animate={{
                                x: [0, -100, 50, -50, 0],
                                y: [0, 150, 50, -100, 0],
                                scale: [1, 1.2, 0.9, 1.1, 1],
                            }}
                            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '30%', right: '25%' }}
                        />
                    </div>

                    {/* Animated Camera Background */}
                    <AnimatedCameraBackground opacity={0.1} />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center px-6 z-10 pt-20">
                        {/* Eyebrow */}
                        <motion.div
                            className="flex items-center gap-3 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="w-12 h-[1px] bg-black/20" />
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/60">
                                Portfolio
                            </span>
                            <span className="w-12 h-[1px] bg-black/20" />
                        </motion.div>

                        {/* Main Title */}
                        <div className="overflow-hidden mb-8 text-center relative max-w-4xl">
                            <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black">
                                {["Our", "Work"].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        className="inline-block mx-4"
                                        initial={{ opacity: 0, y: 80 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                                        style={{ fontSize: 'clamp(60px, 12vw, 140px)' }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            {/* Floating Category Tags - Visual Fillers */}
                            <motion.div
                                className="absolute -top-12 -left-8 md:left-0 hidden md:flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full border border-black/5 rotate-[-6deg]"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                            >
                                <span className="w-2 h-2 rounded-full bg-orange-400" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Weddings</span>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -right-4 md:right-10 hidden md:flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full border border-black/5 rotate-[6deg]"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Editorials</span>
                            </motion.div>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            className="font-sans text-[16px] md:text-[20px] text-black/60 text-center max-w-[600px] mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            A curated selection of moments we've had the privilege to capture, showcasing artistry and emotion in every frame.
                        </motion.p>

                        {/* Interactive Elements Row */}
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                            {/* Stats */}
                            <motion.div
                                className="flex items-center gap-8 md:gap-16 px-8 py-6 bg-white rounded-2xl shadow-sm border border-black/5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                {[
                                    { number: "200+", label: "Projects" },
                                    { number: "7", label: "Years" },
                                    { number: "15", label: "Awards" },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center group cursor-default">
                                        <p className="font-display text-[28px] md:text-[36px] font-light text-black group-hover:scale-110 transition-transform duration-300">{stat.number}</p>
                                        <p className="font-sans text-[9px] uppercase tracking-wider text-black/40">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Latest Project Preview */}
                            <motion.div
                                className="hidden lg:flex items-center gap-4 pl-6 border-l border-black/10"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 }}
                            >
                                <div className="text-right">
                                    <span className="block font-sans text-[9px] uppercase tracking-wider text-black/40 mb-1">Latest Upload</span>
                                    <span className="block font-display text-lg">The Royal Wedding</span>
                                </div>
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white shadow-md rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <Image src={portfolioImages[0]} alt="Latest" fill className="object-cover" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Trusted By Marquee */}
                        <motion.div
                            className="absolute bottom-24 left-0 right-0 overflow-hidden opacity-30 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 1.5 }}
                        >
                            <div className="flex justify-center gap-12 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
                                <span>Vogue India</span>
                                <span>•</span>
                                <span>Harper's Bazaar</span>
                                <span>•</span>
                                <span>Elle Magazine</span>
                                <span>•</span>
                                <span>Architectural Digest</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Left Decorative Image Card */}
                    <motion.div
                        className="absolute left-[5%] top-[30%] hidden xl:block z-0"
                        initial={{ opacity: 0, x: -50, rotate: -10 }}
                        animate={{ opacity: 1, x: 0, rotate: -6 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="relative w-[200px] h-[260px] bg-white p-2 shadow-2xl rounded-sm transform hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                            <div className="relative w-full h-full overflow-hidden bg-gray-100">
                                <Image src={portfolioImages[5]} alt="Deco 1" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-8 left-0 font-handwriting text-black/60 rotate-6 transform translate-y-2 font-display italic">Editorial '24</div>
                        </div>
                    </motion.div>

                    {/* Right Decorative Image Card */}
                    <motion.div
                        className="absolute right-[5%] bottom-[30%] hidden xl:block z-0"
                        initial={{ opacity: 0, x: 50, rotate: 10 }}
                        animate={{ opacity: 1, x: 0, rotate: 6 }}
                        transition={{ delay: 1.2, duration: 1 }}
                    >
                        <div className="relative w-[180px] h-[240px] bg-white p-2 shadow-2xl rounded-sm transform hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                            <div className="relative w-full h-full overflow-hidden bg-gray-100">
                                <Image src={portfolioImages[2]} alt="Deco 2" fill className="object-cover" />
                            </div>
                            <div className="absolute -top-8 right-0 font-handwriting text-black/60 -rotate-3 transform -translate-y-2 font-display italic">Portraits</div>
                        </div>
                    </motion.div>

                    {/* Scroll Prompt */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-2"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="font-sans text-[10px] uppercase tracking-widest text-black/40">Scroll</span>
                            <svg className="w-5 h-5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    FEATURED HORIZONTAL SCROLL
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-12">
                        <motion.div
                            className="flex items-end justify-between"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div>
                                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4 block">Highlights</span>
                                <h2 className="font-display text-[36px] md:text-[48px] font-light text-black">
                                    Featured <span className="italic text-black/40">Projects</span>
                                </h2>
                            </div>
                            <Link
                                href="#all-projects"
                                className="hidden md:flex items-center gap-2 font-sans text-[12px] uppercase tracking-wider text-black/60 hover:text-black transition-colors"
                            >
                                View All
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="overflow-x-auto hide-scrollbar">
                        <div className="flex gap-6 px-6 md:px-10 pb-8" style={{ width: 'max-content' }}>
                            {featuredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[3/4] md:aspect-[4/3] overflow-hidden cursor-pointer group"
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: index * 0.15 }}
                                    onClick={() => setSelectedProject(projects.find(p => p.id === project.id) || null)}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span className="font-sans text-[11px] uppercase tracking-wider text-white/60 mb-2 block">
                                                {project.category} · {project.year}
                                            </span>
                                            <h3 className="font-display text-[28px] md:text-[40px] font-light text-white leading-tight mb-4">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <span className="font-sans text-[11px] uppercase tracking-wider text-white">View Project</span>
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Project Number */}
                                    <div className="absolute top-8 right-8 md:top-12 md:right-12">
                                        <span className="font-display text-[60px] md:text-[80px] font-light text-white/10 leading-none">
                                            0{index + 1}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    FILTER BAR
                ═══════════════════════════════════════════════════════════════ */}
                <section id="all-projects" className="py-8 bg-[#FAFAFA] border-y border-black/5 sticky top-0 z-40">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        className={`relative px-5 py-2.5 font-sans text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors ${activeFilter === cat ? 'text-white' : 'text-black/60 hover:text-black'
                                            }`}
                                        onClick={() => setActiveFilter(cat)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {activeFilter === cat && (
                                            <motion.div
                                                className="absolute inset-0 bg-black rounded-sm"
                                                layoutId="activeFilter"
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{cat}</span>
                                    </motion.button>
                                ))}
                            </div>
                            <span className="font-sans text-[11px] text-black/40 hidden md:block">
                                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    BENTO GRID GALLERY
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-12 md:py-20 bg-[#FAFAFA]">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFilter}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {filteredProjects.map((project, index) => {
                                    // Dynamic grid spans for bento layout
                                    const isLarge = project.size === "large";
                                    const isMedium = project.size === "medium";

                                    return (
                                        <motion.div
                                            key={project.id}
                                            className={`relative overflow-hidden cursor-pointer group bg-black ${isLarge ? 'col-span-2 row-span-2' :
                                                isMedium ? 'col-span-2 md:col-span-1 row-span-1 md:row-span-2' :
                                                    'col-span-1 row-span-1'
                                                }`}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6, delay: index * 0.05 }}
                                            onMouseEnter={() => setHoveredProject(project.id)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                            onClick={() => setSelectedProject(project)}
                                            whileHover={{ scale: 0.98 }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                                <span className="font-sans text-[10px] uppercase tracking-wider text-white/60 mb-1">
                                                    {project.category}
                                                </span>
                                                <h3 className={`font-display font-light text-white leading-tight ${isLarge ? 'text-[24px] md:text-[32px]' : 'text-[16px] md:text-[20px]'
                                                    }`}>
                                                    {project.title}
                                                </h3>
                                                <p className="font-sans text-[11px] text-white/50 mt-1">{project.location}</p>
                                            </div>

                                            {/* Corner Accent */}
                                            <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/60" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    MARQUEE SECTION
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-16 bg-black overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: [0, -1920] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span className="font-display text-[80px] md:text-[120px] font-light text-white/20">Wedding</span>
                                <span className="w-4 h-4 bg-white/30 rotate-45" />
                                <span className="font-display text-[80px] md:text-[120px] font-light text-white/20">Portrait</span>
                                <span className="w-4 h-4 bg-white/30 rotate-45" />
                                <span className="font-display text-[80px] md:text-[120px] font-light text-white/20">Fashion</span>
                                <span className="w-4 h-4 bg-white/30 rotate-45" />
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    CTA SECTION
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-24 md:py-40 bg-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                            backgroundSize: '40px 40px',
                        }} />
                    </div>

                    <AnimatedCameraBackground opacity={0.1} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[900px] relative z-10">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-3 mb-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="w-12 h-[1px] bg-black/20" />
                                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/40">Let's Create</span>
                                <span className="w-12 h-[1px] bg-black/20" />
                            </motion.div>

                            <h2 className="font-display text-[40px] md:text-[60px] lg:text-[80px] font-light text-black leading-[1] mb-8">
                                Have a project<br />
                                <span className="italic text-black/40">in mind?</span>
                            </h2>

                            <p className="font-sans text-[16px] text-black/50 max-w-[450px] mx-auto mb-12 leading-relaxed">
                                We'd love to hear about your vision. Let's create something extraordinary together.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="group relative bg-black text-white px-12 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden"
                                >
                                    <span className="relative z-10">Start a Project</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555]"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </Link>
                                <Link
                                    href="/services"
                                    className="flex items-center gap-3 px-6 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors"
                                >
                                    <span>View Services</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* ═══════════════════════════════════════════════════════════════
                LIGHTBOX MODAL
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/95 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="relative w-full max-w-[1100px] bg-white pointer-events-auto overflow-hidden"
                                initial={{ scale: 0.8, y: 100 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                {/* Close Button */}
                                <button
                                    className="absolute top-4 right-4 z-20 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="grid grid-cols-1 lg:grid-cols-5">
                                    {/* Image */}
                                    <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[70vh]">
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-white">
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <span className="font-sans text-[10px] uppercase tracking-wider text-black/40 mb-3 block">
                                                {selectedProject.category}
                                            </span>
                                            <h2 className="font-display text-[32px] md:text-[42px] font-light text-black leading-tight mb-4">
                                                {selectedProject.title}
                                            </h2>
                                            <p className="font-sans text-[14px] text-black/50 leading-relaxed mb-8">
                                                A beautifully captured moment showcasing the essence of {selectedProject.category.toLowerCase()} photography with our signature artistic approach.
                                            </p>

                                            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-black/10">
                                                <div>
                                                    <span className="font-sans text-[10px] uppercase tracking-wider text-black/40 block mb-1">Location</span>
                                                    <span className="font-sans text-[14px] text-black">{selectedProject.location}</span>
                                                </div>
                                                <div>
                                                    <span className="font-sans text-[10px] uppercase tracking-wider text-black/40 block mb-1">Category</span>
                                                    <span className="font-sans text-[14px] text-black">{selectedProject.category}</span>
                                                </div>
                                            </div>

                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-black/80 transition-colors"
                                            >
                                                <span>Book Similar Session</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />

            {/* Custom Styles */}
            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
