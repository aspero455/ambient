"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Enhanced Hero Section
 * 
 * Features dramatic text reveal animations, particle effects,
 * parallax scrolling, and interactive mouse-following elements.
 * Photography business focused.
 */

const HeroEnhanced: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Words for animated reveal
    const headlineWords = ["Capture", "Your", "Perfect", "Moments"];

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen overflow-hidden bg-[#F8F9FA]"
        >
            {/* ═══════════════════════════════════════════════════════════════
                ANIMATED BACKGROUND
            ═══════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* 1. Soft Amber Glow (Warmth) */}
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-orange-100/40 blur-[100px] mix-blend-multiply"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 2. Cool Blue Mist (Professionalism) */}
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-100/40 blur-[120px] mix-blend-multiply"
                    animate={{
                        x: [0, -60, 0],
                        y: [0, -80, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* 3. Subtle Purple Haze (Creativity) */}
                <motion.div
                    className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-purple-100/30 blur-[90px] mix-blend-multiply"
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -60, 40, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Interactive cursor glow */}
                <motion.div
                    className="absolute w-[400px] h-[400px] bg-white/60 blur-[80px] rounded-full mix-blend-overlay opacity-50"
                    animate={{
                        x: isLoaded && typeof window !== 'undefined' ? mousePosition.x * window.innerWidth - 200 : 0,
                        y: isLoaded && typeof window !== 'undefined' ? mousePosition.y * window.innerHeight - 200 : 0,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />

                {/* Floating Camera Icon */}
                <motion.div
                    className="absolute z-0 opacity-10 pointer-events-none text-black"
                    initial={{ x: "10%", y: "10%", rotate: -15 }}
                    animate={{
                        x: ["10%", "80%", "40%", "10%"],
                        y: ["10%", "60%", "20%", "10%"],
                        rotate: [-15, 15, -5, -15],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{
                        duration: 45,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.4, 0.7, 1]
                    }}
                >
                    <svg
                        width="180"
                        height="180"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                    >
                        <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                </motion.div>
            </div>

            {/* Refined Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}
            />

            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
                <div className="absolute top-8 left-8 w-16 h-[1px] bg-black/20" />
                <div className="absolute top-8 left-8 w-[1px] h-16 bg-black/20" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute top-8 right-8 w-16 h-[1px] bg-black/20" />
                <div className="absolute top-8 right-8 w-[1px] h-16 bg-black/20" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-8 left-8 w-16 h-[1px] bg-black/20" />
                <div className="absolute bottom-8 left-8 w-[1px] h-16 bg-black/20" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-8 right-8 w-16 h-[1px] bg-black/20" />
                <div className="absolute bottom-8 right-8 w-[1px] h-16 bg-black/20" />
            </div>

            {/* Floating Decorative Shapes */}
            <div
                className="absolute top-[15%] left-[5%] w-4 h-4 bg-black/10 rotate-45 animate-float hidden lg:block"
                style={{ animationDelay: '0s' }}
            />
            <div
                className="absolute top-[45%] right-[8%] w-6 h-6 border border-black/10 rotate-45 animate-float-delay hidden lg:block"
                style={{ animationDelay: '1s' }}
            />
            <div
                className="absolute bottom-[25%] left-[12%] w-3 h-3 bg-black/5 rounded-full animate-float hidden lg:block"
                style={{ animationDelay: '2s' }}
            />
            <div
                className="absolute top-[60%] right-[15%] w-8 h-8 border border-black/10 rounded-full animate-float-delay hidden lg:block"
            />

            {/* Instagram Icon Link - Top Right */}
            <motion.a
                href="https://www.instagram.com/ambientframes.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-8 right-8 z-50 group hidden md:flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 border border-black/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute inset-[1px] rounded-full bg-white group-hover:bg-transparent transition-colors duration-300" />
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 text-black group-hover:text-white transition-colors duration-300"
                >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </motion.a>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] pt-[40px] pb-[100px] md:pt-[60px] md:pb-[160px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[70vh]">
                    {/* Left Content */}
                    <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                        {/* Eyebrow Badge */}
                        <div
                            className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                            style={{
                                opacity: isLoaded ? 1 : 0,
                                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        >
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                Professional Photography
                            </span>
                        </div>

                        {/* Animated Headline */}
                        <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-8">
                            {headlineWords.map((word, index) => (
                                <span
                                    key={word}
                                    className="inline-block overflow-hidden mr-4 last:mr-0"
                                >
                                    <span
                                        className="inline-block"
                                        style={{
                                            fontSize: 'clamp(48px, 10vw, 120px)',
                                            opacity: isLoaded ? 1 : 0,
                                            transform: isLoaded ? 'translateY(0) rotate(0)' : 'translateY(100%) rotate(3deg)',
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
                                opacity: isLoaded ? 1 : 0,
                                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
                            }}
                        >
                            From weddings to corporate events, fashion shoots to family portraits — we capture life's most precious moments with{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 font-semibold text-black">artistic excellence</span>
                                <span
                                    className="absolute bottom-1 left-0 w-full h-[6px] bg-black/10"
                                    style={{
                                        transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.6s ease 0.8s',
                                    }}
                                />
                            </span>{' '}
                            at <strong className="text-black">Ambient Frames.</strong>
                        </p>

                        {/* CTA Buttons */}
                        <div
                            className="flex flex-col sm:flex-row gap-4"
                            style={{
                                opacity: isLoaded ? 1 : 0,
                                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
                            }}
                        >
                            <button className="group relative bg-black text-white px-10 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                                <span className="relative z-10">Book a Session</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </button>
                            <Link href="/find-photos/scan" className="group flex items-center gap-3 px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Find Photos</span>
                            </Link>
                            <button className="group flex items-center gap-3 px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black border-2 border-black/20 hover:border-black transition-colors">
                                <span>View Portfolio</span>
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div
                            className="mt-12 flex flex-wrap items-center gap-8"
                            style={{
                                opacity: isLoaded ? 1 : 0,
                                transition: 'opacity 0.8s ease 0.8s',
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E5E5E5] to-[#C5C5C5] border-2 border-white flex items-center justify-center"
                                        >
                                            <span className="font-sans text-[10px] font-bold text-[#666]">
                                                {String.fromCharCode(64 + i)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <span className="font-sans text-[13px] text-[#666]">
                                    <strong className="text-black">500+</strong> happy clients
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                                <span className="font-sans text-[13px] text-[#666] ml-2">5.0 Google Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="lg:col-span-6 relative order-1 lg:order-2">
                        <div
                            className="relative"
                            style={{
                                opacity: isLoaded ? 1 : 0,
                                transform: isLoaded ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.95)',
                                transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                            }}
                        >
                            {/* Main Hero Image */}
                            <div className="relative aspect-[4/5] w-full max-w-[600px] mx-auto lg:ml-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent z-10 pointer-events-none" />
                                <Image
                                    src="/hero-collage.png"
                                    alt="Professional photography portfolio by Ambient Frames"
                                    fill
                                    priority
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Floating Info Cards */}
                                <div
                                    className="absolute -left-8 top-[15%] bg-white p-5 shadow-2xl z-20 hidden lg:block"
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

                                <div
                                    className="absolute -right-4 bottom-[20%] bg-white p-5 shadow-2xl z-20 hidden lg:block"
                                    style={{
                                        animation: 'float 6s ease-in-out infinite',
                                        animationDelay: '2s',
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold text-[12px] uppercase tracking-wider text-black">Quick Delivery</p>
                                            <p className="font-sans text-[11px] text-[#999]">48-hour turnaround</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Badge */}
                                <div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 shadow-2xl z-20 hidden md:flex items-center gap-6"
                                >
                                    <div className="text-center">
                                        <p className="font-display text-[28px] font-light">2K+</p>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-white/60">Events Shot</p>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/20" />
                                    <div className="text-center">
                                        <p className="font-display text-[28px] font-light">100%</p>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-white/60">Satisfaction</p>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/20" />
                                    <div className="text-center">
                                        <p className="font-display text-[28px] font-light">50+</p>
                                        <p className="font-sans text-[10px] uppercase tracking-wider text-white/60">Awards</p>
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
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 1s ease 1.2s',
                    }}
                >
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40">Scroll to explore</span>
                    <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
                        <div className="w-1.5 h-3 bg-black/30 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroEnhanced;
