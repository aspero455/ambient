"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * PremiumFeatures Component - Photography Services
 * 
 * Bento-grid style services showcase with parallax images,
 * gradient overlays, and staggered reveal animations.
 */

const services = [
    {
        id: 1,
        title: "Wedding Photography",
        description: "Capturing your special day with timeless elegance. From intimate ceremonies to grand celebrations, we preserve every precious moment.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        size: "large",
        accent: "from-rose-500/20 to-pink-500/20",
    },
    {
        id: 2,
        title: "Fashion & Editorial",
        description: "High-impact fashion photography for brands, magazines, and portfolios.",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        size: "small",
        accent: "from-purple-500/20 to-indigo-500/20",
    },
    {
        id: 3,
        title: "Corporate Events",
        description: "Professional coverage for conferences, launches, and corporate gatherings.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        size: "small",
        accent: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: 4,
        title: "Portrait Sessions",
        description: "Individual and family portraits that capture personality and connection. Studio or outdoor locations available.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        size: "medium",
        accent: "from-amber-500/20 to-orange-500/20",
    },
    {
        id: 5,
        title: "Model Portfolios",
        description: "Build your professional modeling portfolio with stunning, industry-standard shots.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        size: "medium",
        accent: "from-emerald-500/20 to-teal-500/20",
    },
];

const PremiumFeatures: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

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
            className="relative bg-[#FAFAFA] py-24 md:py-40 overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-black/[0.02] to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-black/[0.02] to-transparent blur-3xl" />

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                {/* Section Header */}
                <div
                    className="max-w-[800px] mb-16 md:mb-24"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/40 mb-6 block">
                        Our Photography Services
                    </span>
                    <h2 className="font-display text-[48px] md:text-[72px] font-light text-black leading-[0.95] tracking-[-0.02em] mb-8">
                        Every moment deserves
                        <br />
                        <span className="text-black/40">to be remembered.</span>
                    </h2>
                    <p className="font-sans text-[18px] leading-[1.7] text-[#666] max-w-[600px]">
                        From weddings to fashion shoots, corporate events to personal portraits — we specialize in capturing life's most meaningful moments with creativity and precision.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
                    {services.map((service, index) => {
                        const sizeClasses = {
                            large: 'lg:col-span-2 lg:row-span-2',
                            medium: 'lg:col-span-2',
                            small: 'lg:col-span-1',
                        }[service.size];

                        return (
                            <div
                                key={service.id}
                                className={`group relative overflow-hidden cursor-pointer ${sizeClasses}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `all 0.8s ease ${index * 0.1}s`,
                                }}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    {/* Service Number */}
                                    <span
                                        className="absolute top-6 right-6 font-display text-[64px] font-light text-white/10 leading-none"
                                        style={{
                                            transform: hoveredId === service.id ? 'translateY(0) scale(1.1)' : 'translateY(10px)',
                                            opacity: hoveredId === service.id ? 1 : 0.5,
                                            transition: 'all 0.5s ease',
                                        }}
                                    >
                                        0{index + 1}
                                    </span>

                                    {/* Title */}
                                    <h3
                                        className="font-display text-[24px] md:text-[32px] font-light text-white mb-3 leading-tight"
                                        style={{
                                            transform: hoveredId === service.id ? 'translateY(0)' : 'translateY(10px)',
                                            transition: 'transform 0.5s ease',
                                        }}
                                    >
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="font-sans text-[14px] leading-[1.6] text-white/80 max-w-[300px]"
                                        style={{
                                            opacity: hoveredId === service.id ? 1 : 0,
                                            transform: hoveredId === service.id ? 'translateY(0)' : 'translateY(20px)',
                                            transition: 'all 0.5s ease 0.1s',
                                        }}
                                    >
                                        {service.description}
                                    </p>

                                    {/* Arrow Indicator */}
                                    <div
                                        className="absolute bottom-8 right-8"
                                        style={{
                                            opacity: hoveredId === service.id ? 1 : 0,
                                            transform: hoveredId === service.id ? 'translate(0, 0)' : 'translate(20px, 20px)',
                                            transition: 'all 0.5s ease 0.15s',
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div
                    className="mt-16 md:mt-24 text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.8s',
                    }}
                >
                    <button className="group relative inline-flex items-center gap-4 bg-black text-white px-12 py-6 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden">
                        <span className="relative z-10">View All Services</span>
                        <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PremiumFeatures;
