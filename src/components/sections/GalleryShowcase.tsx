"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * GalleryShowcase Component - Photography Portfolio
 * 
 * Interactive masonry gallery with filtering by photography category,
 * lightbox preview, and smooth reveal animations.
 */

const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'events', label: 'Events' },
    { id: 'portrait', label: 'Portraits' },
];

const galleryItems = [
    {
        id: 1,
        title: "Romantic Sunset Wedding",
        category: "wedding",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        size: "tall",
        location: "Udaipur, India",
    },
    {
        id: 2,
        title: "Fashion Editorial",
        category: "fashion",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        size: "wide",
        location: "Mumbai Studio",
    },
    {
        id: 3,
        title: "Corporate Gala Night",
        category: "events",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        size: "normal",
        location: "Delhi",
    },
    {
        id: 4,
        title: "Model Portfolio",
        category: "portrait",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        size: "normal",
        location: "Outdoor Session",
    },
    {
        id: 5,
        title: "Traditional Ceremony",
        category: "wedding",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
        size: "tall",
        location: "Jaipur",
    },
    {
        id: 6,
        title: "Product Launch Event",
        category: "events",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
        size: "wide",
        location: "Bangalore",
    },
    {
        id: 7,
        title: "Fashion Week",
        category: "fashion",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
        size: "normal",
        location: "Lakme Fashion Week",
    },
    {
        id: 8,
        title: "Family Portrait",
        category: "portrait",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
        size: "normal",
        location: "Studio Session",
    },
];

const GalleryShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white py-24 md:py-40 overflow-hidden"
        >
            {/* Subtle Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAFAFA] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                {/* Section Header */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    <div className="max-w-[600px]">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/40 mb-6 block">
                            Our Portfolio
                        </span>
                        <h2 className="font-display text-[48px] md:text-[72px] font-light text-black leading-[0.95] tracking-[-0.02em]">
                            Stories we've
                            <span className="block text-black/40">captured.</span>
                        </h2>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-black text-white'
                                        : 'bg-black/5 text-black/60 hover:bg-black/10 hover:text-black'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.3s',
                    }}
                >
                    {filteredItems.map((item, index) => {
                        const sizeClasses = {
                            tall: 'row-span-2',
                            wide: 'col-span-2',
                            normal: '',
                        }[item.size];

                        return (
                            <div
                                key={item.id}
                                className={`relative group cursor-pointer overflow-hidden ${sizeClasses}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                                    transition: `all 0.6s ease ${index * 0.05}s`,
                                }}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Content */}
                                    <div
                                        className="absolute inset-0 p-6 flex flex-col justify-end"
                                        style={{
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            transform: hoveredItem === item.id ? 'translateY(0)' : 'translateY(20px)',
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
                                            {item.location}
                                        </span>
                                        <h4 className="font-display text-[20px] md:text-[24px] font-light text-white leading-tight">
                                            {item.title}
                                        </h4>
                                    </div>

                                    {/* View Button */}
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            transform: hoveredItem === item.id ? 'scale(1)' : 'scale(0.5)',
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All CTA */}
                <div
                    className="mt-16 md:mt-24 text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.8s',
                    }}
                >
                    <button className="group relative inline-flex items-center gap-4 bg-black text-white px-12 py-6 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden">
                        <span className="relative z-10">View Full Portfolio</span>
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

export default GalleryShowcase;
