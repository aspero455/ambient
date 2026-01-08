"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Our Story / About Page
 * Redesigned with dynamic animations and compact layouts.
 */

// Background Animation Component
const BackgroundAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -80, 40, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 15 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: `${300 + i * 50}px`,
                        height: `${300 + i * 50}px`,
                        left: `${(i * 20) % 100}%`,
                        top: `${(i * 15) % 100}%`,
                        backgroundColor: i % 2 === 0 ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.02)',
                    }}
                />
            ))}
        </div>
    );
};

// Gallery images
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

// Services
const services = [
    { number: "01", title: "Wedding Photography", description: "Timeless imagery capturing every precious moment of your special day.", image: portfolioImages[0] },
    { number: "02", title: "Portrait Sessions", description: "Refined portraiture revealing character and emotion.", image: portfolioImages[1] },
    { number: "03", title: "Corporate Events", description: "Professional coverage of business events and milestones.", image: portfolioImages[2] },
    { number: "04", title: "Fashion & Editorial", description: "High-fashion photography with creative direction.", image: portfolioImages[3] }
];

// Journey milestones
const milestones = [
    { year: "2018", title: "The Beginning", description: "Founded in Mumbai with a passion for capturing life's precious moments.", stat: "First Camera" },
    { year: "2019", title: "First Milestone", description: "Covered our first major wedding and crossed 100+ events.", stat: "100+ Events" },
    { year: "2020", title: "Studio Launch", description: "Opened our flagship studio with state-of-the-art equipment.", stat: "New Studio" },
    { year: "2021", title: "Recognition", description: "Received 5 prestigious industry awards for excellence.", stat: "5 Awards" },
    { year: "2022", title: "Team Growth", description: "Expanded to a team of 10+ talented photographers.", stat: "10+ Team" },
    { year: "2023", title: "Global Reach", description: "Started covering destination weddings internationally.", stat: "Global" },
    { year: "2024", title: "Premium Tier", description: "Launched luxury experiences for discerning clients.", stat: "Premium" },
    { year: "2025", title: "The Future", description: "Continuing our journey of excellence and innovation.", stat: "500+ Clients" },
];

// Philosophy values
const philosophyValues = [
    { number: "01", title: "Authenticity", description: "We capture real moments, real emotions, real stories." },
    { number: "02", title: "Excellence", description: "Every frame reflects our commitment to perfection." },
    { number: "03", title: "Connection", description: "We build relationships that last beyond the shoot." },
    { number: "04", title: "Innovation", description: "Constantly evolving our craft with new techniques." }
];

// Awards
const awards = [
    "Best Wedding Photographer 2023",
    "Excellence in Portrait Photography",
    "Creative Vision Award",
    "Customer Choice Award",
    "Innovation in Photography"
];

export default function AboutPage() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeService, setActiveService] = useState(0);
    const [activeJourney, setActiveJourney] = useState(0);
    const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

    const heroRef = useRef<HTMLElement>(null);
    const introRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const journeyRef = useRef<HTMLElement>(null);
    const philosophyRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLElement>(null);
    const awardsRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const sections = [
            { ref: heroRef, id: 'hero' },
            { ref: introRef, id: 'intro' },
            { ref: servicesRef, id: 'services' },
            { ref: journeyRef, id: 'journey' },
            { ref: philosophyRef, id: 'philosophy' },
            { ref: galleryRef, id: 'gallery' },
            { ref: awardsRef, id: 'awards' },
            { ref: ctaRef, id: 'cta' },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-section');
                        if (id) setLoadedSections((prev) => new Set([...prev, id]));
                    }
                });
            },
            { threshold: 0.15 }
        );

        sections.forEach(({ ref, id }) => {
            if (ref.current) {
                ref.current.setAttribute('data-section', id);
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    const isVisible = (id: string) => loadedSections.has(id);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="overflow-hidden">
                {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: HERO - Elegant Split Layout
        ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[85vh] bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5] overflow-hidden"
                >
                    {/* ═══════════════════════════════════════════════════════════════
                        BACKGROUND LAYERS: GRID & GRADIENTS
                    ═══════════════════════════════════════════════════════════════ */}
                    {/* 1. Base Grid Layer with Parallax */}
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

                    {/* 2. Right Side Golden Glow Overlay */}
                    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden hidden lg:block">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at 70% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 100%)',
                                filter: 'blur(80px)',
                            }}
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* 3. Glowing Bulb Animations (Orbs) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Golden Glowing Bulb - Right Top */}
                        <motion.div
                            className="absolute w-[400px] h-[400px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(251, 191, 36, 0.05) 40%, transparent 70%)',
                                boxShadow: '0 0 100px 40px rgba(251, 191, 36, 0.08)',
                            }}
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -40, 60, 0],
                                scale: [1, 1.2, 0.8, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '10%', right: '5%' }}
                        />

                        {/* Additional Golden Glowing Bulb - Right Center */}
                        <motion.div
                            className="absolute w-[350px] h-[350px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.04) 40%, transparent 70%)',
                                boxShadow: '0 0 120px 40px rgba(251, 191, 36, 0.06)',
                            }}
                            animate={{
                                x: [0, -40, 60, 0],
                                y: [0, 80, -30, 0],
                                scale: [1, 0.9, 1.1, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            initial={{ top: '45%', right: '2%' }}
                        />

                        {/* Traditional Black Orb - Left Center */}
                        <motion.div
                            className="absolute w-32 h-32 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 40%, transparent 70%)',
                                boxShadow: '0 0 60px 20px rgba(0,0,0,0.1)',
                            }}
                            animate={{
                                x: [0, 100, 50, -50, 0],
                                y: [0, -80, 40, 100, 0],
                                scale: [1, 1.2, 0.9, 1.1, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            initial={{ top: '40%', left: '10%' }}
                        />

                        {/* Small Amber Pulse Bulb - Right Bottom */}
                        <motion.div
                            className="absolute w-24 h-24 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(146, 64, 14, 0.2) 0%, rgba(217, 119, 6, 0.1) 40%, transparent 70%)',
                                boxShadow: '0 0 40px 15px rgba(217, 119, 6, 0.05)',
                            }}
                            animate={{
                                opacity: [0.2, 0.6, 0.2],
                                scale: [0.8, 1.1, 0.8],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            initial={{ bottom: '20%', right: '15%' }}
                        />

                        {/* Orb 3 - Small, quick pulsing */}
                        <motion.div
                            className="absolute w-16 h-16 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 50%, transparent 70%)',
                                boxShadow: '0 0 30px 10px rgba(0,0,0,0.06)',
                            }}
                            animate={{
                                x: [0, 50, -30, 70, 0],
                                y: [0, -50, 30, -60, 0],
                                scale: [1, 1.4, 0.8, 1.2, 1],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            initial={{ top: '30%', left: '60%' }}
                        />
                    </div>

                    {/* 4. Large Floating Camera Icon (Animated Icon) */}
                    <motion.div
                        className="absolute z-0 opacity-[0.07] pointer-events-none text-black"
                        initial={{ x: "85%", y: "20%", rotate: 15 }}
                        animate={{
                            x: ["85%", "75%", "90%", "85%"],
                            y: ["20%", "40%", "15%", "20%"],
                            rotate: [15, -10, 20, 15],
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                    </motion.div>

                    {/* Parallax Circles */}
                    <div
                        className="absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full border border-black/5 hidden lg:block"
                        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                    />
                    <div
                        className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] rounded-full border border-black/5 hidden lg:block"
                        style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
                    />

                    {/* Floating Decorative Elements - Cursor Following */}
                    <div
                        className="absolute top-[15%] right-[15%] w-4 h-4 bg-black/10 hidden lg:block"
                        style={{
                            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px) rotate(45deg)`,
                            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    />
                    <div
                        className="absolute bottom-[25%] left-[10%] w-6 h-6 border border-black/10 hidden lg:block"
                        style={{
                            transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px) rotate(45deg)`,
                            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    />
                    <div
                        className="absolute top-[40%] left-[8%] w-3 h-3 bg-black/5 rounded-full hidden lg:block"
                        style={{
                            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                            transition: 'transform 0.4s ease-out',
                        }}
                    />
                    <div
                        className="absolute top-[60%] right-[25%] w-8 h-8 border border-black/10 rounded-full hidden lg:block"
                        style={{ animation: 'float 8s ease-in-out infinite' }}
                    />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] pt-[60px] pb-[80px] md:pt-[100px] md:pb-[120px] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[70vh]">
                            {/* Left Content */}
                            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                                {/* Eyebrow Badge */}
                                <div
                                    className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                                    style={{
                                        opacity: isVisible('hero') ? 1 : 0,
                                        transform: isVisible('hero') ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                    }}
                                >
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                        Since 2018
                                    </span>
                                </div>

                                {/* Animated Headline */}
                                <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-8">
                                    {["Our", "Story"].map((word, index) => (
                                        <span
                                            key={word}
                                            className="inline-block overflow-hidden mr-4 last:mr-0"
                                        >
                                            <span
                                                className="inline-block"
                                                style={{
                                                    fontSize: 'clamp(48px, 10vw, 120px)',
                                                    opacity: isVisible('hero') ? 1 : 0,
                                                    transform: isVisible('hero') ? 'translateY(0) rotate(0)' : 'translateY(100%) rotate(3deg)',
                                                    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`,
                                                }}
                                            >
                                                {word}
                                            </span>
                                        </span>
                                    ))}
                                </h1>

                                {/* Description */}
                                <p
                                    className="font-sans text-[18px] md:text-[20px] leading-[1.7] text-[#4A4A4A] max-w-[520px] mb-10"
                                    style={{
                                        opacity: isVisible('hero') ? 1 : 0,
                                        transform: isVisible('hero') ? 'translateY(0)' : 'translateY(30px)',
                                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
                                    }}
                                >
                                    Where every photograph tells a story, and every story deserves to be told{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 font-semibold text-black">beautifully</span>
                                        <span
                                            className="absolute bottom-1 left-0 w-full h-[6px] bg-black/10"
                                            style={{
                                                transform: isVisible('hero') ? 'scaleX(1)' : 'scaleX(0)',
                                                transformOrigin: 'left',
                                                transition: 'transform 0.6s ease 0.8s',
                                            }}
                                        />
                                    </span>
                                    .
                                </p>

                                {/* Stats Row */}
                                <div
                                    className="flex items-center gap-8 md:gap-12"
                                    style={{
                                        opacity: isVisible('hero') ? 1 : 0,
                                        transform: isVisible('hero') ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
                                    }}
                                >
                                    {[
                                        { number: "500+", label: "Clients" },
                                        { number: "2K+", label: "Events" },
                                        { number: "7+", label: "Years" }
                                    ].map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <p className="font-display text-[32px] md:text-[42px] font-light text-black leading-none">
                                                {stat.number}
                                            </p>
                                            <p className="font-sans text-[10px] uppercase tracking-wider text-black/40 mt-1">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div
                                    className="flex flex-col sm:flex-row gap-4 mt-12"
                                    style={{
                                        opacity: isVisible('hero') ? 1 : 0,
                                        transform: isVisible('hero') ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
                                    }}
                                >
                                    <Link
                                        href="/contact"
                                        className="group relative bg-black text-white px-8 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden"
                                    >
                                        <span className="relative z-10">Get in Touch</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="group flex items-center gap-3 px-6 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black border-2 border-black/20 hover:border-black transition-colors"
                                    >
                                        <span>View Work</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="lg:col-span-6 relative">
                                <div
                                    className="relative"
                                    style={{
                                        opacity: isVisible('hero') ? 1 : 0,
                                        transform: isVisible('hero') ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.95)',
                                        transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                                    }}
                                >
                                    {/* Main Image */}
                                    <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:ml-auto">
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10 pointer-events-none" />
                                        <Image
                                            src={portfolioImages[10]}
                                            alt="Our story - Ambient Frames"
                                            fill
                                            priority
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />

                                        {/* Floating Info Card */}
                                        <div
                                            className="absolute -left-8 top-[20%] bg-white p-5 shadow-2xl z-20 hidden lg:block"
                                            style={{
                                                animation: 'float 6s ease-in-out infinite',
                                                animationDelay: '0.5s',
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-sans font-bold text-[12px] uppercase tracking-wider text-black">Award Winning</p>
                                                    <p className="font-sans text-[11px] text-[#999]">10+ Years Experience</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Year Badge */}
                                        <div
                                            className="absolute -right-4 bottom-[25%] bg-black text-white p-6 shadow-2xl z-20 hidden lg:block"
                                            style={{
                                                animation: 'float 6s ease-in-out infinite',
                                                animationDelay: '2s',
                                            }}
                                        >
                                            <p className="font-display text-[36px] font-light leading-none">2018</p>
                                            <p className="font-sans text-[10px] uppercase tracking-wider text-white/60 mt-1">Founded</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                        style={{
                            opacity: isVisible('hero') ? 1 : 0,
                            transition: 'opacity 1s ease 1.2s',
                        }}
                    >
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40">Scroll to explore</span>
                        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-black/30 rounded-full animate-bounce" />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 2: THE ART OF STORYTELLING - Redesigned
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={introRef}
                    className="py-16 md:py-24 bg-white relative overflow-hidden"
                >
                    <BackgroundAnimation />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Imagery Overlap */}
                            <div className="relative order-2 lg:order-1 h-[400px] md:h-[500px]">
                                <motion.div
                                    className="absolute top-0 left-0 w-3/4 aspect-[3/4] z-10 shadow-2xl overflow-hidden"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Image src={portfolioImages[4]} alt="Storytelling" fill className="object-cover" />
                                </motion.div>
                                <motion.div
                                    className="absolute bottom-0 right-0 w-2/3 aspect-[4/5] z-20 shadow-2xl overflow-hidden border-8 border-white"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <Image src={portfolioImages[5]} alt="Storytelling" fill className="object-cover" />
                                </motion.div>
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-black/5 rounded-full blur-3xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>

                            {/* Right: Content */}
                            <div className="order-1 lg:order-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">
                                        The Art of Storytelling
                                    </span>
                                    <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-[1.1] mb-6">
                                        We capture moments <br />
                                        <span className="italic text-black/30 text-[0.8em]">that resonate forever</span>
                                    </h2>
                                    <p className="font-sans text-[17px] text-black/60 leading-relaxed mb-8">
                                        At Ambient Frames, we believe every frame is a narrative waiting to be told.
                                        Our philosophy is rooted in authenticity—capturing the raw,
                                        unfiltered emotions that make your story uniquely yours.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: "Founded", val: "2018" },
                                            { label: "Captures", val: "1M+" },
                                            { label: "Happy Souls", val: "500+" },
                                            { label: "Awards", val: "12" },
                                        ].map((stat, i) => (
                                            <div key={i} className="border-l border-black/10 pl-4 py-1">
                                                <p className="font-display text-[24px] font-light text-black">{stat.val}</p>
                                                <p className="font-sans text-[10px] uppercase tracking-wider text-black/40">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 2.5: MISSION & VISION - NEW
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-16 md:py-20 bg-black text-white relative overflow-hidden">
                    <AnimatedCameraBackground />
                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <motion.div
                                className="md:col-span-2"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h3 className="font-display text-[32px] md:text-[42px] font-light mb-6">Our Mission</h3>
                                <p className="font-sans text-[18px] md:text-[20px] text-white/70 leading-relaxed italic">
                                    "To elevate the visual narrative of human connection through technical
                                    precision and artistic soul, ensuring that every memory we frame
                                    becomes a timeless legacy."
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col justify-end"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 mb-2">Our Vision</h4>
                                        <p className="font-sans text-[14px] text-white/60">Becoming the global standard for cinematic editorial photography.</p>
                                    </div>
                                    <div className="h-[1px] bg-white/10 w-full" />
                                    <div>
                                        <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 mb-2">Our Value</h4>
                                        <p className="font-sans text-[14px] text-white/60">Integrity, Creativity, and Unwavering Commitment to Quality.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 2.7: THE CREATIVE PROCESS - Redesigned with Better Visibility
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-[#F5F5F5] to-white relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-[20%] right-[10%] w-64 h-64 border border-black/5 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute bottom-[10%] left-[5%] w-40 h-40 border border-black/5"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">
                                How We Work
                            </span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-tight mb-4">
                                The <span className="italic text-black/40">Process</span>
                            </h2>
                            <motion.div
                                className="w-20 h-[2px] bg-black/20 mx-auto"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>

                        {/* Process Steps Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {[
                                { step: "01", title: "Discovery", desc: "We dive deep into your vision and story.", icon: "🎯" },
                                { step: "02", title: "Curation", desc: "Setting the scene with moodboards and planning.", icon: "🎨" },
                                { step: "03", title: "Execution", desc: "The magic happens behind the lens.", icon: "📸" },
                                { step: "04", title: "Delivery", desc: "Artfully edited frames delivered to you.", icon: "✨" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="group relative p-8 bg-white border border-black/10 hover:border-black/30 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    {/* Background Gradient on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Step Number - Now Visible! */}
                                    <div className="relative mb-6">
                                        <span className="font-display text-[72px] md:text-[80px] font-light text-black/20 group-hover:text-black/40 transition-all duration-500 leading-none block group-hover:scale-110 transform origin-left">
                                            {item.step}
                                        </span>
                                        {/* Icon Overlay */}
                                        <span className="absolute top-2 right-0 text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                            {item.icon}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-sans font-bold text-[18px] md:text-[20px] text-black mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                        {item.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="font-sans text-[14px] text-black/60 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                                        {item.desc}
                                    </p>

                                    {/* Bottom Accent Bar */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-black/50"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.4 }}
                                        style={{ originX: 0 }}
                                    />

                                    {/* Arrow Indicator */}
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <svg className="w-5 h-5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: SERVICES - Premium Showcase Design
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={servicesRef} className="py-0 bg-white relative overflow-hidden">
                    {/* Section Header */}
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] pt-16 md:pt-24 pb-12">
                        <div
                            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                            style={{
                                opacity: isVisible('services') ? 1 : 0,
                                transform: isVisible('services') ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        >
                            <div>
                                <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-black/40 mb-4 block">What We Offer</span>
                                <h2 className="font-display text-[36px] md:text-[56px] font-light text-black leading-[1.1]">
                                    Our <span className="italic">Services</span>
                                </h2>
                            </div>
                            <p className="font-sans text-[15px] text-black/50 max-w-[400px] leading-relaxed">
                                From intimate portraits to grand celebrations, we bring artistry and passion to every frame we capture.
                            </p>
                        </div>
                    </div>

                    {/* Full-Width Services Showcase */}
                    <div className="relative">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="group relative border-t border-black/10 last:border-b cursor-pointer"
                                onClick={() => setActiveService(activeService === index ? -1 : index)}
                                style={{
                                    opacity: isVisible('services') ? 1 : 0,
                                    transform: isVisible('services') ? 'translateX(0)' : 'translateX(-60px)',
                                    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`,
                                }}
                            >
                                {/* Main Row */}
                                <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                                    <div className="flex items-center justify-between py-8 md:py-10">
                                        {/* Left: Number + Title */}
                                        <div className="flex items-center gap-8 md:gap-16">
                                            <span className="font-display text-[48px] md:text-[72px] font-light text-black/20 leading-none">
                                                {service.number}
                                            </span>
                                            <div>
                                                <h3 className="font-display text-[24px] md:text-[36px] font-light text-black">
                                                    {service.title}
                                                </h3>
                                                <p className="font-sans text-[13px] text-black/40 mt-1 hidden md:block max-w-[300px]">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right: Icon + Arrow */}
                                        <div className="flex items-center gap-6">
                                            {/* Service Icon */}
                                            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hidden md:flex">
                                                {index === 0 && (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                )}
                                                {index === 1 && (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                )}
                                                {index === 2 && (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                )}
                                                {index === 3 && (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Expand Arrow */}
                                            <div className={`w-10 h-10 rounded-full border border-black/20 flex items-center justify-center transition-all duration-500 ${activeService === index ? 'bg-black border-black rotate-180' : ''}`}>
                                                <svg className={`w-4 h-4 transition-colors duration-300 ${activeService === index ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expandable Content */}
                                <div
                                    className="overflow-hidden transition-all duration-700 ease-out"
                                    style={{
                                        maxHeight: activeService === index ? '600px' : '0px',
                                        opacity: activeService === index ? 1 : 0,
                                    }}
                                >
                                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] pb-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                                            {/* Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                    style={{
                                                        transform: activeService === index ? 'scale(1)' : 'scale(1.1)',
                                                        transition: 'transform 1s ease-out',
                                                    }}
                                                />
                                                {/* Overlay with Ken Burns */}
                                                <div className="absolute inset-0 bg-black/10" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col justify-center">
                                                <p className="font-sans text-[16px] md:text-[18px] text-black/60 leading-relaxed mb-8">
                                                    {service.description} Our approach combines technical excellence with creative vision,
                                                    ensuring every shot tells your unique story with authenticity and elegance.
                                                </p>

                                                {/* Features List */}
                                                <div className="space-y-4 mb-8">
                                                    {['Professional Equipment', 'Expert Editing', 'Fast Delivery', 'Unlimited Revisions'].map((feature, i) => (
                                                        <div
                                                            key={feature}
                                                            className="flex items-center gap-4"
                                                            style={{
                                                                opacity: activeService === index ? 1 : 0,
                                                                transform: activeService === index ? 'translateX(0)' : 'translateX(-20px)',
                                                                transition: `all 0.5s ease ${0.2 + i * 0.1}s`,
                                                            }}
                                                        >
                                                            <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </span>
                                                            <span className="font-sans text-[14px] text-black">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* CTA Button */}
                                                <Link
                                                    href="/contact"
                                                    className="inline-flex items-center gap-4 group/btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span className="font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black group-hover/btn:text-black/60 transition-colors">
                                                        Book This Service
                                                    </span>
                                                    <span className="w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>

                    {/* Bottom Stats Bar */}
                    <div className="bg-black py-12 md:py-16">
                        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                            <div
                                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
                                style={{
                                    opacity: isVisible('services') ? 1 : 0,
                                    transition: 'opacity 1s ease 0.6s',
                                }}
                            >
                                {[
                                    { number: "500+", label: "Weddings Covered" },
                                    { number: "1000+", label: "Portrait Sessions" },
                                    { number: "200+", label: "Corporate Events" },
                                    { number: "50+", label: "Fashion Shoots" },
                                ].map((stat, i) => (
                                    <div key={stat.label} className="text-center">
                                        <p className="font-display text-[36px] md:text-[48px] font-light text-white leading-none">{stat.number}</p>
                                        <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 mt-2">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: JOURNEY - Horizontal Timeline Design
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={journeyRef} className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
                    <AnimatedCameraBackground />
                    {/* Animated Background */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)',
                        }}
                    />

                    {/* Floating Year Markers */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <span
                            className="absolute top-[10%] left-[5%] font-display text-[200px] md:text-[300px] font-light text-white/[0.02] leading-none select-none"
                            style={{ animation: 'float 10s ease-in-out infinite' }}
                        >
                            2018
                        </span>
                        <span
                            className="absolute bottom-[5%] right-[5%] font-display text-[150px] md:text-[250px] font-light text-white/[0.02] leading-none select-none"
                            style={{ animation: 'float 12s ease-in-out infinite reverse' }}
                        >
                            2025
                        </span>
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] relative z-10">
                        {/* Section Header */}
                        <div
                            className="text-center mb-20"
                            style={{
                                opacity: isVisible('journey') ? 1 : 0,
                                transform: isVisible('journey') ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/40 mb-6 block">Through The Years</span>
                            <h2 className="font-display text-[36px] md:text-[56px] font-light text-white leading-[1.1]">
                                Our <span className="italic text-white/50">Journey</span>
                            </h2>
                        </div>

                        {/* Timeline Progress Bar */}
                        <div
                            className="relative mb-16 hidden md:block"
                            style={{
                                opacity: isVisible('journey') ? 1 : 0,
                                transition: 'opacity 1s ease 0.3s',
                            }}
                        >
                            <div className="h-[2px] bg-white/10 relative">
                                {/* Progress Fill */}
                                <div
                                    className="absolute left-0 top-0 h-full bg-white/40 transition-all duration-700"
                                    style={{ width: `${((activeJourney + 1) / milestones.length) * 100}%` }}
                                />
                                {/* Year Markers */}
                                {milestones.map((milestone, index) => (
                                    <button
                                        key={milestone.year}
                                        onClick={() => setActiveJourney(index)}
                                        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${activeJourney >= index
                                            ? 'bg-white border-white scale-100'
                                            : 'bg-transparent border-white/30 scale-75 hover:scale-100 hover:border-white/60'
                                            }`}
                                        style={{ left: `${(index / (milestones.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-sans text-[12px] tracking-wider transition-colors ${activeJourney === index ? 'text-white' : 'text-white/30'
                                            }`}>
                                            {milestone.year}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Timeline Cards */}
                        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={milestone.year}
                                    onClick={() => setActiveJourney(index)}
                                    className={`group cursor-pointer relative transition-all duration-500 ${activeJourney === index ? 'md:scale-105 z-10' : 'md:scale-100 md:opacity-60 hover:opacity-100'
                                        }`}
                                    style={{
                                        opacity: isVisible('journey') ? 1 : 0,
                                        transform: isVisible('journey') ? 'translateY(0)' : 'translateY(60px)',
                                        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`,
                                    }}
                                >
                                    <div className={`p-8 border transition-all duration-500 h-full ${activeJourney === index
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent border-white/10 hover:border-white/30'
                                        }`}>
                                        {/* Year Badge */}
                                        <div className={`inline-flex items-center gap-2 mb-6 ${activeJourney === index ? 'text-black' : 'text-white'
                                            }`}>
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${activeJourney === index ? 'bg-black text-white' : 'bg-white/10'
                                                }`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-display text-[32px] font-light">
                                                {milestone.year}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <h3 className={`font-sans text-[18px] font-semibold mb-3 transition-colors ${activeJourney === index ? 'text-black' : 'text-white'
                                            }`}>
                                            {milestone.title}
                                        </h3>

                                        <p className={`font-sans text-[14px] leading-relaxed mb-4 ${activeJourney === index ? 'text-black/70' : 'text-white/50'
                                            }`}>
                                            {milestone.description}
                                        </p>

                                        {/* Stat Badge */}
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase ${activeJourney === index ? 'bg-black/10 text-black' : 'bg-white/5 text-white/40'
                                            }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            {milestone.stat}
                                        </div>

                                        {/* Arrow Indicator */}
                                        <div className={`absolute bottom-4 right-4 transition-all duration-300 ${activeJourney === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                            }`}>
                                            <svg className={`w-5 h-5 ${activeJourney === index ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div
                            className="flex justify-center gap-4 mt-12"
                            style={{
                                opacity: isVisible('journey') ? 1 : 0,
                                transition: 'opacity 1s ease 0.8s',
                            }}
                        >
                            <button
                                onClick={() => setActiveJourney(Math.max(0, activeJourney - 1))}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${activeJourney === 0
                                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                                    }`}
                                disabled={activeJourney === 0}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setActiveJourney(Math.min(milestones.length - 1, activeJourney + 1))}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${activeJourney === milestones.length - 1
                                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                                    }`}
                                disabled={activeJourney === milestones.length - 1}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
            SECTION 5: PHILOSOPHY
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={philosophyRef} className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            <div
                                style={{
                                    opacity: isVisible('philosophy') ? 1 : 0,
                                    transform: isVisible('philosophy') ? 'translateX(0)' : 'translateX(-60px)',
                                    transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            >
                                <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-black/40 mb-8 block">Our Philosophy</span>
                                <blockquote className="font-display text-[26px] md:text-[34px] lg:text-[40px] font-light text-black leading-[1.3] mb-10">
                                    <span
                                        className="inline-block"
                                        style={{
                                            clipPath: isVisible('philosophy') ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                                            transition: 'clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                                        }}
                                    >
                                        &ldquo;Photography is the art of frozen time... the ability to store
                                    </span>
                                    <span className="relative inline-block mx-2">
                                        <span className="text-black/20 relative z-10"> emotion </span>
                                        <span
                                            className="absolute bottom-1 left-0 h-3 bg-black/5 z-0"
                                            style={{
                                                width: isVisible('philosophy') ? '100%' : '0%',
                                                transition: 'width 1s ease 1s',
                                            }}
                                        />
                                    </span>
                                    <span
                                        className="inline-block"
                                        style={{
                                            clipPath: isVisible('philosophy') ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                                            transition: 'clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
                                        }}
                                    >
                                        and feelings within a frame.&rdquo;
                                    </span>
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="h-[1px] bg-black/20"
                                        style={{
                                            width: isVisible('philosophy') ? '48px' : '0px',
                                            transition: 'width 0.8s ease 0.8s',
                                        }}
                                    />
                                    <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-black/40">Our Guiding Principle</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {philosophyValues.map((value, index) => (
                                    <div
                                        key={value.title}
                                        className="group p-6 -m-6 hover:bg-black/[0.02] transition-all duration-500 cursor-pointer relative"
                                        style={{
                                            opacity: isVisible('philosophy') ? 1 : 0,
                                            transform: isVisible('philosophy') ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                                            transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.15}s`,
                                        }}
                                    >
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.03)' }} />

                                        <span className="font-display text-[48px] font-light text-black/5 group-hover:text-black/15 transition-all duration-500 group-hover:scale-110 inline-block transform">{value.number}</span>
                                        <h4 className="font-sans text-[18px] font-semibold text-black mb-2 -mt-3 group-hover:translate-x-1 transition-transform duration-300">{value.title}</h4>
                                        <p className="font-sans text-[14px] text-black/50 leading-relaxed group-hover:text-black/70 transition-colors duration-300">{value.description}</p>

                                        {/* Bottom line reveal */}
                                        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-black/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
            SECTION 6: GALLERY
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={galleryRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1600px]">
                        <div
                            className="text-center mb-16"
                            style={{
                                opacity: isVisible('gallery') ? 1 : 0,
                                transform: isVisible('gallery') ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-black/40 mb-6 block">Our Portfolio</span>
                            <h2 className="font-display text-[36px] md:text-[56px] font-light text-black leading-[1.1]">Selected Works</h2>
                        </div>

                        <div className="grid grid-cols-12 gap-4 md:gap-6">
                            {/* Large Image with Ken Burns */}
                            <div className="col-span-12 md:col-span-8 relative aspect-[16/10] overflow-hidden group cursor-pointer"
                                style={{ opacity: isVisible('gallery') ? 1 : 0, transform: isVisible('gallery') ? 'scale(1) perspective(1000px)' : 'scale(0.9)', transition: 'all 1s ease 0.1s' }}>
                                <Image src={portfolioImages[6]} alt="Gallery" fill className="object-cover transition-transform duration-[8s] ease-out" style={{ animation: 'kenburns 20s ease-in-out infinite' }} />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                    </span>
                                </div>
                            </div>
                            {/* Tall Image with Tilt Effect */}
                            <div className="col-span-6 md:col-span-4 row-span-2 relative aspect-[3/4] md:aspect-auto overflow-hidden group cursor-pointer"
                                style={{ opacity: isVisible('gallery') ? 1 : 0, transform: isVisible('gallery') ? 'scale(1)' : 'scale(0.9)', transition: 'all 1s ease 0.2s' }}>
                                <Image src={portfolioImages[7]} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="font-sans text-white text-sm font-medium">Portrait Session</p>
                                </div>
                            </div>
                            {/* Small Images with Hover Zoom */}
                            {[8, 11].map((idx, i) => (
                                <div key={idx} className="col-span-6 md:col-span-4 relative aspect-[4/3] overflow-hidden group cursor-pointer"
                                    style={{ opacity: isVisible('gallery') ? 1 : 0, transform: isVisible('gallery') ? 'scale(1)' : 'scale(0.9)', transition: `all 1s ease ${0.3 + i * 0.1}s` }}>
                                    <Image src={portfolioImages[idx]} alt="Gallery" fill className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-14" style={{ opacity: isVisible('gallery') ? 1 : 0, transition: 'opacity 1s ease 0.6s' }}>
                            <Link href="/gallery" className="inline-flex items-center gap-4 group">
                                <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-black group-hover:text-black/60 transition-colors">View Full Gallery</span>
                                <span className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
            SECTION 7: AWARDS
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={awardsRef} className="py-16 md:py-24 bg-black relative overflow-hidden">
                    <AnimatedCameraBackground />
                    {/* Animated Background Texture */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '50px 50px',
                            animation: 'slide-in-up 30s linear infinite',
                        }}
                    />

                    < div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10" >
                        <div className="text-center mb-16" style={{ opacity: isVisible('awards') ? 1 : 0, transform: isVisible('awards') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease' }}>
                            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/40 mb-6 block">Recognition</span>
                            <h2 className="font-display text-[36px] md:text-[56px] font-light text-white leading-[1.1]">Awards & Honors</h2>
                        </div>

                        <div className="space-y-0">
                            {awards.map((award, index) => (
                                <div
                                    key={award}
                                    className="group border-b border-white/10 py-8 flex items-center justify-between hover:bg-white/5 px-8 -mx-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
                                    style={{ opacity: isVisible('awards') ? 1 : 0, transform: isVisible('awards') ? 'translateX(0)' : 'translateX(-60px)', transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s` }}
                                >
                                    {/* Reveal Line Animation */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white/30 group-hover:w-full transition-all duration-700" />

                                    <div className="flex items-center gap-8">
                                        <span className="font-display text-[48px] font-light text-white/10 group-hover:text-white/30 transition-all duration-500 group-hover:scale-110 transform">0{index + 1}</span>
                                        <h3 className="font-display text-[20px] md:text-[28px] font-light text-white group-hover:translate-x-2 transition-all duration-500">{award}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <span className="font-sans text-[11px] tracking-wider uppercase text-white/40">View</span>
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
            SECTION 8: CTA - With Animated Gradient
        ═══════════════════════════════════════════════════════════════ */}
                <section ref={ctaRef} className="py-16 md:py-24 relative overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            background: 'linear-gradient(-45deg, #000000, #333333, #666666, #999999)',
                            backgroundSize: '400% 400%',
                            animation: 'gradient-shift 15s ease infinite',
                        }}
                    />

                    {/* Rotating Decorative Elements */}
                    <div
                        className="absolute top-20 left-20 w-32 h-32 border border-black/5 hidden lg:block"
                        style={{ animation: 'rotate-slow 20s linear infinite' }}
                    />
                    <div
                        className="absolute bottom-20 right-20 w-24 h-24 border border-black/5 hidden lg:block"
                        style={{ animation: 'rotate-slow 15s linear infinite reverse' }}
                    />
                    <div
                        className="absolute top-1/2 right-1/4 w-4 h-4 bg-black/5 hidden lg:block"
                        style={{ animation: 'float 6s ease-in-out infinite' }}
                    />

                    <div className="container mx-auto px-6 md:px-10 max-w-[900px] relative z-10">
                        <div className="text-center" style={{ opacity: isVisible('cta') ? 1 : 0, transform: isVisible('cta') ? 'translateY(0)' : 'translateY(60px)', transition: 'all 1.2s ease' }}>
                            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-black/40 mb-8 block">Let&apos;s Create Together</span>
                            <h2 className="font-display text-[32px] md:text-[48px] lg:text-[60px] font-light text-black leading-[1.1] mb-8">
                                Ready to tell your<span className="block text-black/20">story?</span>
                            </h2>
                            <p className="font-sans text-[16px] text-black/50 leading-relaxed mb-10 max-w-[500px] mx-auto">
                                Every great photograph begins with a conversation. Let&apos;s discuss your vision.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link href="/contact" className="group relative bg-black text-white px-10 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    <span className="relative z-10">Book a Session</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                </Link>
                                <Link href="/gallery" className="group flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-black hover:text-black/60 transition-colors font-sans font-bold">
                                    <span>View Portfolio</span>
                                    <span className="w-9 h-9 rounded-full border border-current flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all group-hover:rotate-45 duration-300">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </span>
                                </Link>
                            </div>

                            <div className="mt-16 pt-10 border-t border-black/10">
                                <div className="flex flex-wrap items-center justify-center gap-10 text-[13px] text-black/40 font-sans">
                                    <a href="tel:+918356953173" className="flex items-center gap-2 hover:text-black transition-colors group">
                                        <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </span>
                                        +91 83569 53173
                                    </a>
                                    <a href="mailto:hello@ambientframes.com" className="flex items-center gap-2 hover:text-black transition-colors group">
                                        <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </span>
                                        hello@ambientframes.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
