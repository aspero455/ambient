"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

// ===== MAIN PAGE COMPONENT =====
export default function FindPhotosPage() {
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

    const headlineWords = ["Find", "Your", "Photos"];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main>
                {/* ═══════════════════════════════════════════════════════════════
                    HERO SECTION - Matching Home Page Style
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative w-full min-h-screen overflow-hidden bg-[#F8F9FA]"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Soft Blue Glow */}
                        <motion.div
                            className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/40 blur-[100px] mix-blend-multiply"
                            animate={{
                                x: [0, -50, 0],
                                y: [0, 100, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Warm Amber Glow */}
                        <motion.div
                            className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-100/40 blur-[120px] mix-blend-multiply"
                            animate={{
                                x: [0, 60, 0],
                                y: [0, -80, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />

                        {/* Subtle Purple Haze */}
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

                        {/* Floating Camera Icon - Center Top, Moving Freely */}
                        <motion.div
                            className="absolute z-0 opacity-[0.06] pointer-events-none text-black"
                            initial={{ x: "40%", y: "5%", rotate: -10 }}
                            animate={{
                                x: ["40%", "75%", "20%", "60%", "40%"],
                                y: ["5%", "40%", "60%", "25%", "5%"],
                                rotate: [-10, 20, -15, 10, -10],
                                scale: [1, 1.1, 0.9, 1.05, 1]
                            }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg
                                width="100"
                                height="100"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="drop-shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                            >
                                <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                        </motion.div>

                        {/* Face Scan Icon - Center, Moving Freely */}
                        <motion.div
                            className="absolute z-0 opacity-[0.05] pointer-events-none text-black"
                            initial={{ x: "50%", y: "10%", rotate: 5 }}
                            animate={{
                                x: ["50%", "15%", "70%", "30%", "50%"],
                                y: ["10%", "50%", "30%", "65%", "10%"],
                                rotate: [5, -15, 12, -8, 5],
                            }}
                            transition={{
                                duration: 35,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M9 10h.01M15 10h.01M12 14a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z" />
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h2M20 12h2M12 2v2M12 20v2" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Grid Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.4]"
                        style={{
                            backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                        }}
                    />

                    {/* Corner Accents */}
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
                    <div className="absolute top-[15%] left-[5%] w-4 h-4 bg-black/10 rotate-45 animate-float hidden lg:block" />
                    <div className="absolute top-[45%] right-[8%] w-6 h-6 border border-black/10 rotate-45 animate-float-delay hidden lg:block" />
                    <div className="absolute bottom-[25%] left-[12%] w-3 h-3 bg-black/5 rounded-full animate-float hidden lg:block" />
                    <div className="absolute top-[60%] right-[15%] w-8 h-8 border border-black/10 rounded-full animate-float-delay hidden lg:block" />

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
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                        AI-Powered Photo Search
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
                                                    fontSize: 'clamp(48px, 10vw, 110px)',
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
                                    Real-time facial recognition technology that matches your face against our entire photo database. Find all your event photos{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 font-semibold text-black">instantly</span>
                                        <span
                                            className="absolute bottom-1 left-0 w-full h-[6px] bg-black/10"
                                            style={{
                                                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                                                transformOrigin: 'left',
                                                transition: 'transform 0.6s ease 0.8s',
                                            }}
                                        />
                                    </span>{' '}
                                    with just a scan.
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
                                    <Link
                                        href="/find-photos/scan"
                                        className="group relative bg-black text-white px-10 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Start Scanning
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                    </Link>
                                    <button className="group flex items-center gap-3 px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black border-2 border-black/20 hover:border-black transition-colors">
                                        <span>Learn How It Works</span>
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                {/* Stats */}
                                <div
                                    className="mt-12 flex flex-wrap items-center gap-8"
                                    style={{
                                        opacity: isLoaded ? 1 : 0,
                                        transition: 'opacity 0.8s ease 0.8s',
                                    }}
                                >
                                    <div className="text-center">
                                        <div className="font-display text-3xl font-light text-black">99.7%</div>
                                        <div className="font-sans text-[11px] uppercase tracking-wider text-black/40">Accuracy</div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-black/10" />
                                    <div className="text-center">
                                        <div className="font-display text-3xl font-light text-black">&lt;50ms</div>
                                        <div className="font-sans text-[11px] uppercase tracking-wider text-black/40">Detection</div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-black/10" />
                                    <div className="text-center">
                                        <div className="font-display text-3xl font-light text-black">10K+</div>
                                        <div className="font-sans text-[11px] uppercase tracking-wider text-black/40">Photos</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual - Orb with Centered Button */}
                            <div className="lg:col-span-6 relative order-1 lg:order-2">
                                <div
                                    className="relative flex flex-col items-center justify-center"
                                    style={{
                                        opacity: isLoaded ? 1 : 0,
                                        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                                        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                                    }}
                                >
                                    {/* Large Glowing Orb */}
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                        {/* Outer Glow Ring */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                                                boxShadow: '0 0 120px 60px rgba(59, 130, 246, 0.08)',
                                            }}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        />

                                        {/* Middle Ring */}
                                        <motion.div
                                            className="absolute inset-[10%] rounded-full border border-black/5"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        />

                                        {/* Inner Ring */}
                                        <motion.div
                                            className="absolute inset-[20%] rounded-full border border-black/10"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        />

                                        {/* Core Orb with Gradient */}
                                        <motion.div
                                            className="absolute inset-[25%] rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(240,240,245,1) 40%, rgba(220,225,235,1) 70%, rgba(200,210,225,1))',
                                                boxShadow: '0 25px 80px rgba(0,0,0,0.15), inset 0 -15px 40px rgba(0,0,0,0.05), inset 0 15px 40px rgba(255,255,255,0.8)',
                                            }}
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        />

                                        {/* Shine Effect */}
                                        <motion.div
                                            className="absolute inset-[25%] rounded-full overflow-hidden"
                                            animate={{ opacity: [0.6, 0.9, 0.6] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div
                                                className="absolute top-0 left-0 w-full h-1/2"
                                                style={{
                                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                                                }}
                                            />
                                        </motion.div>

                                        {/* Scan Line Animation */}
                                        <motion.div
                                            className="absolute inset-[25%] rounded-full overflow-hidden"
                                        >
                                            <motion.div
                                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                                                animate={{ y: ['-100%', '500%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                            />
                                        </motion.div>

                                        {/* Corner Brackets */}
                                        <div className="absolute inset-[22%]">
                                            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-black/20" />
                                            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-black/20" />
                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-black/20" />
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-black/20" />
                                        </div>

                                        {/* Floating Particles */}
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1.5 h-1.5 rounded-full bg-black/20"
                                                style={{
                                                    top: `${15 + i * 10}%`,
                                                    left: i % 2 === 0 ? `${5 + i * 3}%` : `${85 - i * 3}%`,
                                                }}
                                                animate={{
                                                    y: [0, -15, 0],
                                                    opacity: [0.2, 0.5, 0.2],
                                                }}
                                                transition={{
                                                    duration: 2 + i * 0.3,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Centered Start Scanning Button */}
                                    <motion.div
                                        className="mt-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <Link
                                            href="/find-photos/scan"
                                            className="group relative bg-black text-white px-12 py-6 font-sans font-bold text-[13px] tracking-[0.15em] uppercase overflow-hidden shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 rounded-full"
                                        >
                                            <span className="relative z-10 flex items-center gap-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                Start Scanning
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40">Scroll</span>
                        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
                            <motion.div
                                className="w-1.5 h-3 bg-black/30 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </section>


                {/* ═══════════════════════════════════════════════════════════════
                    HOW IT WORKS SECTION - Colorful Classic Design
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-24 md:py-40 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F0F7FF] relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-orange-100/50 blur-[80px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-blue-100/50 blur-[80px]"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4 block">How It Works</span>
                            <h2 className="font-display text-[42px] md:text-[64px] font-light text-black leading-tight">
                                Three Simple <span className="italic text-black/40">Steps</span>
                            </h2>
                            <motion.div
                                className="w-20 h-[2px] bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mt-6"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>

                        {/* Process Steps - Horizontal Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: "01", title: "Register", desc: "Enter your name and phone number. We'll notify you when photos are ready.", color: "from-orange-50 to-orange-100", accent: "bg-orange-400" },
                                { step: "02", title: "Scan Face", desc: "Take a quick selfie with your camera. Our AI will match your face.", color: "from-blue-50 to-blue-100", accent: "bg-blue-400" },
                                { step: "03", title: "Download", desc: "View and download all your matching photos instantly!", color: "from-emerald-50 to-emerald-100", accent: "bg-emerald-400" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={`group relative bg-gradient-to-br ${item.color} p-8 border border-black/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Step Number */}
                                    <div className={`absolute -top-4 left-8 w-10 h-10 ${item.accent} flex items-center justify-center shadow-lg`}>
                                        <span className="font-display text-sm font-bold text-white">{item.step}</span>
                                    </div>

                                    <div className="pt-4">
                                        <h4 className="font-display text-2xl font-light text-black mb-3">{item.title}</h4>
                                        <p className="font-sans text-[15px] text-black/60 leading-relaxed">{item.desc}</p>
                                    </div>

                                    {/* Arrow connector (hidden on last) */}
                                    {i < 2 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-black/10" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════════════
                    WHY CHOOSE US - Colorful Classic Design
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-24 md:py-40 bg-gradient-to-br from-white via-[#FFF9F5] to-[#F5F9FF] relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute top-[20%] left-[10%] w-[200px] h-[200px] rounded-full bg-purple-100/40 blur-[60px]"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-amber-100/40 blur-[60px]"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] relative z-10">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4 block">Why Choose Us</span>
                            <h2 className="font-display text-[42px] md:text-[64px] font-light text-black leading-tight mb-4">
                                Powerful <span className="italic text-black/40">Features</span>
                            </h2>
                            <motion.div
                                className="w-20 h-[2px] bg-gradient-to-r from-purple-300 to-amber-300 mx-auto"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Lightning Fast", desc: "Results in under 50 milliseconds with our optimized AI engine", icon: "⚡", color: "from-amber-50 to-orange-50", border: "border-amber-200/50" },
                                { title: "99.7% Accuracy", desc: "Industry-leading facial recognition across all lighting conditions", icon: "✓", color: "from-emerald-50 to-teal-50", border: "border-emerald-200/50" },
                                { title: "Secure & Private", desc: "Your data is encrypted end-to-end and never shared with third parties", icon: "🔒", color: "from-blue-50 to-indigo-50", border: "border-blue-200/50" },
                                { title: "Easy Download", desc: "Download individual photos or all at once with a single click", icon: "📥", color: "from-purple-50 to-pink-50", border: "border-purple-200/50" },
                                { title: "Cross-Platform", desc: "Works seamlessly on all modern browsers and devices", icon: "🌐", color: "from-cyan-50 to-blue-50", border: "border-cyan-200/50" },
                                { title: "24/7 Available", desc: "Access and find your photos anytime, anywhere in the world", icon: "🕐", color: "from-rose-50 to-orange-50", border: "border-rose-200/50" },
                            ].map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    className={`group p-8 bg-gradient-to-br ${feature.color} border ${feature.border} hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-3xl mb-5">{feature.icon}</div>
                                    <h3 className="font-display text-xl font-light text-black mb-3">{feature.title}</h3>
                                    <p className="font-sans text-[14px] text-black/60 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <motion.div
                            className="mt-20 flex flex-wrap justify-center gap-12 md:gap-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {[
                                { value: "99.7%", label: "Recognition Accuracy" },
                                { value: "Under 50ms", label: "Response Time" },
                                { value: "10K+", label: "Photos Processed" },
                                { value: "500+", label: "Happy Clients" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="font-display text-4xl md:text-5xl font-light text-black">{stat.value}</div>
                                    <div className="font-sans text-xs uppercase tracking-wider text-black/40 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════════════
                    CTA SECTION
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-32 bg-black relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">
                        <motion.div
                            className="text-center max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-display text-[42px] md:text-[64px] font-light text-white mb-6 leading-tight">
                                Ready to Find <br className="hidden md:block" />Your Photos?
                            </h2>
                            <p className="font-sans text-[18px] text-white/60 mb-10 max-w-xl mx-auto">
                                Start scanning now and discover all your photos from any event instantly.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/find-photos/scan"
                                    className="group relative bg-white text-black px-10 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden hover:shadow-xl transition-all"
                                >
                                    <span className="relative z-10">Start Scanning Now</span>
                                </Link>
                                <button className="px-10 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-white border-2 border-white/30 hover:border-white transition-colors">
                                    Contact Us
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* CSS for floating animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(45deg); }
                    50% { transform: translateY(-10px) rotate(45deg); }
                }
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0) rotate(45deg); }
                    50% { transform: translateY(-15px) rotate(45deg); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-float-delay {
                    animation: float-delay 5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
