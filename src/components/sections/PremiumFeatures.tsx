"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * PremiumFeatures Component - Photography Services
 * 
 * Redesigned Horizontal Accordion Gallery
 * - 5+ Distinct Animations:
 *   1. Staggered Entry (Scroll Reveal)
 *   2. Accordion Expansion (Hover Width)
 *   3. Image Parallax/Zoom (Hover Scale)
 *   4. Text Reveal & Orientation Change
 *   5. Floating Particle Grain Effect
 *   6. Dynamic Gradient Overlay
 */

const services = [
    {
        id: "01",
        title: "Wedding",
        subtitle: "Photography",
        description: "Capturing your special day with timeless elegance. From intimate ceremonies to grand celebrations, we preserve every precious moment in cinematic detail.",
        image: "/services/wedding.png",
        position: "center",
    },
    {
        id: "02",
        title: "Fashion",
        subtitle: "Editorial",
        description: "High-impact fashion photography for brands, magazines, and portfolios. Avant-garde concepts meets urban sophistication.",
        image: "/services/fashion.png",
        position: "top",
    },
    {
        id: "03",
        title: "Corporate",
        subtitle: "Events",
        description: "Professional coverage for conferences, galas, and launches. We capture the essence of your business with a premium, polished look.",
        image: "/services/corporate.png",
        position: "center",
    },
    {
        id: "04",
        title: "Portrait",
        subtitle: "Sessions",
        description: "Artistic individual and family portraits that capture personality and connection. Cinematic lighting and direction included.",
        image: "/services/portrait.png",
        position: "center",
    },
    {
        id: "05",
        title: "Model",
        subtitle: "Book",
        description: "Build your professional modeling portfolio with stunning, industry-standard shots that stand out to agencies and clients.",
        image: "/services/model.png",
        position: "top",
    },
];

const PremiumFeatures: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeId, setActiveId] = useState<string>("01"); // Default active

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

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
        >
            {/* Animated Grain/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-noise"></div>
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1600px] relative z-10">
                {/* Section Header */}
                <div
                    className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <div className="max-w-[700px]">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 mb-6 block">
                            Our Expertise
                        </span>
                        <h2 className="font-display text-[40px] md:text-[64px] font-light text-white leading-[1.0] tracking-[-0.02em]">
                            World-Class <br />
                            <span className="text-white/50">Photography Services</span>
                        </h2>
                    </div>

                    <p className="font-sans text-[16px] text-white/60 max-w-[400px] leading-relaxed mb-2">
                        We don't just take photos; we craft visual legacies. Swipe through our specialized services designed for perfection.
                    </p>
                </div>

                {/* Horizontal Accordion */}
                <div
                    className="flex flex-col md:flex-row h-[600px] md:h-[600px] gap-2 md:gap-4 select-none"
                    onMouseLeave={() => setActiveId("01")} // Reset to first or keep last hovered? Reset for clean look
                >
                    {services.map((service, index) => {
                        const isActive = activeId === service.id;

                        return (
                            <div
                                key={service.id}
                                className={`
                                    relative overflow-hidden cursor-pointer rounded-2xl transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)
                                    ${isActive ? 'flex-[3.5] md:flex-[3]' : 'flex-1'}
                                `}
                                style={{
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    opacity: isVisible ? 1 : 0,
                                    transitionDelay: `${index * 100}ms`,
                                }}
                                onMouseEnter={() => setActiveId(service.id)}
                            >
                                {/* Background Image with Scaling Animation */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        classes={`object-cover object-${service.position} transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-110' : 'scale-100 grayscale hover:grayscale-0'}`}
                                        className={`object-cover object-${service.position} transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-110' : 'scale-100 grayscale-[0.5]'}`}
                                    />
                                    {/* Dark Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-60'}`} />
                                </div>

                                {/* Content Container */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">

                                    {/* Top Number */}
                                    <div className={`flex justify-between items-start transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70'}`}>
                                        <span className="font-display text-[32px] md:text-[40px] text-white/20 font-light">
                                            {service.id}
                                        </span>
                                        {/* Icon arrow only visible when active */}
                                        <div className={`
                                            w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white
                                            transition-all duration-500 ${isActive ? 'opacity-100 rotate-45' : 'opacity-0 scale-0'}
                                        `}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Bottom Info - Animated based on state */}
                                    <div className="relative z-10 w-full">
                                        {/* Title Wrapper: Changes Layout based on Active State */}
                                        <div className={`transition-all duration-500 ${isActive ? 'mb-4 translate-y-0' : 'absolute bottom-0 left-0 md:-rotate-90 md:origin-bottom-left md:translate-x-8 md:-translate-y-8 w-max'}`}>
                                            <h3 className="font-display text-[32px] md:text-[48px] leading-tight text-white whitespace-nowrap">
                                                {service.title} <span className="text-white/40">{service.subtitle}</span>
                                            </h3>
                                        </div>

                                        {/* Description: Only visible when active */}
                                        <div
                                            className={`
                                                overflow-hidden transition-all duration-700 ease-out
                                                ${isActive ? 'max-h-[200px] opacity-100 delay-100' : 'max-h-0 opacity-0'}
                                            `}
                                        >
                                            <p className="font-sans text-[14px] md:text-[16px] text-white/80 max-w-[90%] leading-relaxed border-l border-white/20 pl-4 mt-2">
                                                {service.description}
                                            </p>

                                            <button className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors flex items-center gap-2 group/btn">
                                                Explore Service
                                                <span className="block w-8 h-[1px] bg-white group-hover/btn:w-12 transition-all" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PremiumFeatures;
