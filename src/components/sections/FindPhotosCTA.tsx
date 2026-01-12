"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * FindPhotosCTA Component - AI Photo Discovery
 * 
 * Re-imagined with a high-end, futuristic tech aesthetic.
 * Images are always visible with continuous "alive" animations.
 * 
 * Animations Included:
 * 1. Continuous Scanning Line (Auto-loop)
 * 2. Slow Breathing/Floating of Cards
 * 3. Text/Tech Data Decoding Effect (Simulated)
 * 4. Ambient Particle Drift
 * 5. Subtle Image Pulse/Zoom
 */

const features = [
    {
        id: "01",
        title: "Selfie Upload",
        description: "Upload a single selfie to initiate the secure identification process.",
        image: "/img/ai_face_id.png",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    },
    {
        id: "02",
        title: "Smart Scanning",
        description: "Our AI scans thousands of event photos in milliseconds to find matches.",
        image: "/img/ai_scan_feature.png",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        )
    },
    {
        id: "03",
        title: "Instant Results",
        description: "Get a curated gallery of your moments, ready to download in high-res.",
        image: "/img/ai_photo_match.png",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        )
    }
];

const FindPhotosCTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-40 bg-white overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <style jsx>{`
                @keyframes scan-line {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(500%); opacity: 0; }
                }
                @keyframes float-card {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes slow-zoom {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes float-orb {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    33% { transform: translate(100px, -50px) scale(1.1); opacity: 0.5; }
                    66% { transform: translate(-50px, 50px) scale(0.9); opacity: 0.3; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                }
                @media (min-width: 768px) {
                    .animate-scan-infinite {
                        animation: scan-line 3s linear infinite;
                    }
                    .animate-float-slow {
                        animation: float-card 6s ease-in-out infinite;
                    }
                    .animate-float-delayed {
                        animation: float-card 6s ease-in-out infinite 1s;
                    }
                    .animate-float-more-delayed {
                        animation: float-card 6s ease-in-out infinite 2s;
                    }
                    .animate-image-pulse {
                        animation: slow-zoom 10s ease-in-out infinite;
                    }
                    .animate-orb-float {
                        animation: float-orb 15s ease-in-out infinite;
                    }
                }
            `}</style>

            {/* Minimal Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: 'radial-gradient(#e5e5e5 1.5px, transparent 1.5px)',
                    backgroundSize: '40px 40px',
                    transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                    transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            />

            {/* Glowing Floating Black Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 pointer-events-none hidden md:block">
                <div className="absolute inset-0 bg-black/10 rounded-full blur-[120px] animate-orb-float mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-12">
                    <div
                        className="max-w-2xl"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-black/5 rounded-full bg-black/[0.02]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/60">
                                AI Powered Discovery
                            </span>
                        </div>

                        <h2 className="font-display text-[56px] md:text-[88px] font-light leading-[0.9] text-black tracking-[-0.03em]">
                            Find yourself <br />
                            <span className="text-black/20">in seconds.</span>
                        </h2>
                    </div>

                    <div
                        className="mb-4"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                        }}
                    >
                        <Link
                            href="/find-photos"
                            className="group relative inline-flex items-center gap-6 bg-black text-white px-10 py-5 font-sans font-bold text-[13px] tracking-[0.2em] uppercase overflow-hidden rounded-full hover:px-12 transition-all duration-500"
                        >
                            <span className="relative z-10">Start Scanning</span>
                            <div className="relative z-10 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors duration-500">
                                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    </div>
                </div>

                {/* Feature Cards - Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-auto md:h-[500px]">
                    {features.map((feature, index) => {
                        const floatClass = index === 0 ? 'animate-float-slow' : index === 1 ? 'animate-float-delayed' : 'animate-float-more-delayed';

                        return (
                            <div
                                key={feature.id}
                                className={`relative group overflow-hidden rounded-[2rem] bg-[#F5F5F5] border border-black/5 cursor-pointer hover:shadow-2xl hover:shadow-black/5 ${floatClass}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    // Removed transform here to avoid conflict with float animation, handling entry via class or wrapper if needed, 
                                    // but let's just fade in Opacity for simplicity with the float loop
                                    transition: `opacity 1s ease ${index * 0.2}s`,
                                }}
                            >
                                {/* Background Image Surface - Always Visible Now */}
                                <div className="absolute inset-0 p-4 md:p-6 opacity-100 mix-blend-multiply transition-all duration-700">
                                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover animate-image-pulse opacity-80"
                                        />
                                        {/* Tech Overlay Grid */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                        <div className="absolute inset-0 border-[0.5px] border-black/10 rounded-[1.5rem] m-2"></div>
                                    </div>
                                </div>

                                {/* Main Content Canvas */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                                    {/* Top Icon Area */}
                                    <div className="flex justify-between items-start">
                                        <div className={`
                                            w-14 h-14 rounded-2xl flex items-center justify-center
                                            bg-white/80 backdrop-blur-sm shadow-sm border border-black/5
                                            text-black
                                        `}>
                                            {feature.icon}
                                        </div>
                                        <span className="font-display text-[40px] text-black/20 font-bold">
                                            {feature.id}
                                        </span>
                                    </div>

                                    {/* Bottom Text Area */}
                                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
                                        <h3 className="font-display text-[28px] text-black leading-tight mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="font-sans text-[14px] text-black/60 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Continuous Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)] z-20 animate-scan-infinite" />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Note */}
                <div
                    className="mt-20 flex justify-center"
                    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 1s' }}
                >
                    <p className="font-sans text-[13px] text-black/40 text-center max-w-lg bg-black/[0.03] px-6 py-3 rounded-full">
                        <span className="font-bold text-black/60 mr-2">Info</span>
                        Your biometrics are processed securely and deleted immediately.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FindPhotosCTA;
