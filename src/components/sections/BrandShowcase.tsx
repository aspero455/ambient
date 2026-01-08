"use client";

import React, { useEffect, useRef, useState } from 'react';
import AnimatedCameraBackground from '../ui/AnimatedCameraBackground';

/**
 * BrandShowcase Component
 * 
 * Photography clients and partners section with infinite scroll marquee,
 * hover effects, and elegant trust indicators.
 */

const clients = [
    { name: "Vogue India", logo: "VI" },
    { name: "Elle Magazine", logo: "EM" },
    { name: "Harper's Bazaar", logo: "HB" },
    { name: "GQ India", logo: "GQ" },
    { name: "Cosmopolitan", logo: "CO" },
    { name: "Femina", logo: "FM" },
    { name: "Grazia", logo: "GZ" },
    { name: "Hello! Magazine", logo: "HM" },
    { name: "Filmfare", logo: "FF" },
    { name: "Brides Today", logo: "BT" },
];

const BrandShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-20 md:py-28 overflow-hidden"
        >
            {/* ═══════════════════════════════════════════════════════════════
                 ANIMATED BACKGROUND ICONS
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatedCameraBackground opacity={0.3} />

            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] mb-12 relative z-30">
                {/* Section Header */}
                <div
                    className="text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 mb-4 block">
                        Featured In & Trusted By
                    </span>
                    <h2 className="font-display text-[32px] md:text-[48px] font-light text-white leading-tight">
                        Our work has been featured in
                        <span className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                            leading publications
                        </span>
                    </h2>
                </div>
            </div>

            {/* First Marquee Row */}
            <div
                className="relative py-8"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.3s',
                }}
            >
                <div className="flex animate-marquee">
                    {[...clients, ...clients].map((client, index) => (
                        <div
                            key={`row1-${index}`}
                            className="flex-none mx-8 group cursor-pointer"
                        >
                            <div className="flex items-center gap-4 px-10 py-6 border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <span className="font-display text-[16px] font-light text-white/80 group-hover:text-white transition-colors">
                                        {client.logo}
                                    </span>
                                </div>
                                <span className="font-sans text-[14px] font-medium text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Marquee Row (Reverse) */}
            <div
                className="relative py-8"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.5s',
                }}
            >
                <div className="flex animate-marquee-reverse">
                    {[...clients.reverse(), ...clients].map((client, index) => (
                        <div
                            key={`row2-${index}`}
                            className="flex-none mx-8 group cursor-pointer"
                        >
                            <div className="flex items-center gap-4 px-10 py-6 border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <span className="font-display text-[16px] font-light text-white/80 group-hover:text-white transition-colors">
                                        {client.logo}
                                    </span>
                                </div>
                                <span className="font-sans text-[14px] font-medium text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Stats */}
            <div
                className="container mx-auto px-6 md:px-10 max-w-[1440px] mt-16"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s ease 0.7s',
                }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                    {[
                        { value: "2,000+", label: "Events Covered" },
                        { value: "500+", label: "Happy Clients" },
                        { value: "50+", label: "Awards Won" },
                        { value: "10+", label: "Years Experience" },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="text-center"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.6s ease ${0.8 + index * 0.1}s`,
                            }}
                        >
                            <p className="font-display text-[48px] md:text-[64px] font-light text-white mb-2">
                                {stat.value}
                            </p>
                            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandShowcase;
