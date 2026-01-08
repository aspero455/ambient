"use client";

import React, { useEffect, useRef, useState } from 'react';
import AnimatedCameraBackground from '../ui/AnimatedCameraBackground';

/**
 * ProcessSection Component
 * 
 * How it works section with animated steps and connecting line.
 */

const steps = [
    {
        number: "01",
        title: "Browse & Discover",
        description: "Explore our curated collections of premium imagery with powerful search filters and intuitive navigation."
    },
    {
        number: "02",
        title: "Curate & Save",
        description: "Create boards to organize your favorite images. Share with your team for seamless collaboration."
    },
    {
        number: "03",
        title: "License & Download",
        description: "Simple, transparent pricing with rights fully cleared. Download in multiple formats instantly."
    },
    {
        number: "04",
        title: "Create & Inspire",
        description: "Use authentic imagery to create unforgettable campaigns that resonate with your audience."
    }
];

const ProcessSection: React.FC = () => {
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
        <section ref={sectionRef} className="bg-white py-[80px] md:py-[160px] relative overflow-hidden">
            {/* ═══════════════════════════════════════════════════════════════
                 ANIMATED BACKGROUND ICONS
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatedCameraBackground opacity={0.3} />

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">
                {/* Section Header */}
                <div
                    className="text-center mb-12 md:mb-20 max-w-[600px] mx-auto"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-[#999999] mb-4 block">
                        How It Works
                    </span>
                    <h2 className="font-display text-[40px] md:text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-black mb-6">
                        Simple, seamless process
                    </h2>
                    <p className="font-sans text-[18px] leading-[1.6] text-[#4A4A4A]">
                        From discovery to download, we've streamlined every step of your creative workflow.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-[#E5E5E5]">
                        <div
                            className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-out"
                            style={{ width: isVisible ? '100%' : '0%' }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="relative text-center lg:text-left"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `opacity 0.8s ease ${index * 150 + 200}ms, transform 0.8s ease ${index * 150 + 200}ms`
                                }}
                            >
                                {/* Step Number */}
                                <div className="relative inline-flex items-center justify-center w-[120px] h-[120px] mb-8 lg:mb-10">
                                    <div className="absolute inset-0 rounded-full bg-[#F5F5F5] group-hover:bg-black transition-colors duration-300" />
                                    <span className="relative font-display text-[48px] font-light text-black">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="font-display text-[24px] md:text-[28px] font-light text-black mb-4 leading-[1.2]">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-[15px] leading-[1.6] text-[#4A4A4A] max-w-[280px] mx-auto lg:mx-0">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
