"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * FeaturedCollections Component
 * 
 * Curated image collections grid with elegant hover reveal effects.
 */

const collections = [
    {
        title: "Nature & Landscapes",
        description: "Breathtaking vistas and natural wonders",
        image: "/collection-nature.png",
        count: "12,500+ images"
    },
    {
        title: "Portraits & People",
        description: "Authentic human moments captured beautifully",
        image: "/collection-portraits.png",
        count: "8,200+ images"
    },
    {
        title: "Architecture & Urban",
        description: "Modern structures and city life",
        image: "/collection-architecture.png",
        count: "6,800+ images"
    },
    {
        title: "Abstract & Artistic",
        description: "Creative expressions and artistic concepts",
        image: "/collection-abstract.png",
        count: "4,500+ images"
    }
];

const FeaturedCollections: React.FC = () => {
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
                    className="mb-12 md:mb-16 max-w-[600px]"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <h2 className="font-display text-[40px] md:text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-black mb-6">
                        Featured Collections
                    </h2>
                    <p className="font-sans text-[18px] leading-[1.6] text-[#4A4A4A]">
                        Explore our curated collections of premium imagery, handpicked by our team of experts.
                    </p>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {collections.map((collection, index) => (
                        <div
                            key={collection.title}
                            className="group relative overflow-hidden cursor-pointer hover-lift"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: `opacity 0.8s ease ${index * 100 + 200}ms, transform 0.8s ease ${index * 100 + 200}ms`
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    {/* Always visible title */}
                                    <div className="relative z-10">
                                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {collection.count}
                                        </span>
                                        <h3 className="font-display text-[32px] md:text-[40px] font-light text-white mb-2 leading-[1.1] drop-shadow-lg">
                                            {collection.title}
                                        </h3>
                                        <p className="font-sans text-[14px] text-white/90 max-w-[280px] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {collection.description}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div
                    className="mt-16 text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.6s'
                    }}
                >
                    <button className="bg-black text-white px-10 py-5 font-sans font-bold text-[12px] uppercase tracking-[0.15em] hover:opacity-80 transition-opacity">
                        View All Collections
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
