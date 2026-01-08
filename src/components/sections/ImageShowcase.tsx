"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * ImageShowcase Component
 * 
 * Full-width gallery with dramatic hover effects and masonry-style grid.
 */

const showcaseImages = [
    {
        src: "/showcase-1.png",
        alt: "Mediterranean travel photography",
        size: "large"
    },
    {
        src: "/showcase-2.png",
        alt: "Luxury product photography",
        size: "small"
    },
    {
        src: "/showcase-3.png",
        alt: "Ocean seascape photography",
        size: "medium"
    },
    {
        src: "/collection-nature.png",
        alt: "Misty mountain landscape",
        size: "medium"
    },
    {
        src: "/collection-portraits.png",
        alt: "Professional portrait",
        size: "small"
    },
    {
        src: "/collection-architecture.png",
        alt: "Modern architecture",
        size: "large"
    }
];

const ImageShowcase: React.FC = () => {
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
        <section ref={sectionRef} className="bg-white py-[80px] md:py-[120px]">
            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                {/* Section Header */}
                <div
                    className="text-center mb-12 md:mb-16 max-w-[700px] mx-auto"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <h2 className="font-display text-[40px] md:text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-black mb-6">
                        Scroll-stopping imagery
                    </h2>
                    <p className="font-sans text-[18px] leading-[1.6] text-[#4A4A4A]">
                        Every image in our collection is carefully selected to make an impact.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {showcaseImages.map((image, index) => {
                        const aspectClass =
                            image.size === 'large' ? 'aspect-[3/4] md:row-span-2' :
                                image.size === 'medium' ? 'aspect-square' :
                                    'aspect-[4/3]';

                        return (
                            <div
                                key={image.alt}
                                className={`relative overflow-hidden group image-hover-zoom ${aspectClass}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `opacity 0.8s ease ${index * 100}ms, transform 0.8s ease ${index * 100}ms`
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500">
                                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Browse All Button */}
                <div
                    className="mt-16 text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.8s'
                    }}
                >
                    <button className="bg-black text-white px-10 py-5 font-sans font-bold text-[12px] uppercase tracking-[0.15em] hover:opacity-80 transition-opacity group">
                        Browse All Images
                        <svg className="inline-block ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ImageShowcase;
