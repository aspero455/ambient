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

// Using high-quality JPEG images for better resolution
const galleryItems = [
    {
        id: 1,
        title: "Grand Wedding Celebration",
        category: "wedding",
        image: "/img/584919632_18301346926284138_3623525760133837999_n.jpeg",
        size: "extraTall",
        location: "Mumbai Palace",
    },
    {
        id: 2,
        title: "Fashion Editorial",
        category: "fashion",
        image: "/img/567395566_18292643899284138_984878061390000747_n.jpeg",
        size: "wide",
        location: "Designer Studio",
    },
    {
        id: 3,
        title: "Corporate Gala Night",
        category: "events",
        image: "/img/566414945_18292643884284138_3751019525464458517_n.jpeg",
        size: "normal",
        location: "Delhi",
    },
    {
        id: 4,
        title: "Candid Portrait",
        category: "portrait",
        image: "/img/526620207_18281937079284138_8438353020918415449_n..jpg",
        size: "tall",
        location: "Outdoor Session",
    },
    {
        id: 5,
        title: "Bridal Elegance",
        category: "wedding",
        image: "/img/526617991_18281938183284138_1247856625555993611_n..jpg",
        size: "large",
        location: "Jaipur Palace",
    },
    {
        id: 6,
        title: "Product Launch",
        category: "events",
        image: "/img/528279540_18282602014284138_194004958280868693_n..webp",
        size: "small",
        location: "Bangalore",
    },
    {
        id: 7,
        title: "Fashion Week",
        category: "fashion",
        image: "/img/528631979_18282710314284138_2035724994247197640_n..webp",
        size: "tall",
        location: "Lakme Fashion Week",
    },
    {
        id: 8,
        title: "Family Portrait",
        category: "portrait",
        image: "/img/529672310_18282710362284138_7894353990389373612_n..webp",
        size: "normal",
        location: "Studio Session",
    },
    {
        id: 9,
        title: "Wedding Reception",
        category: "wedding",
        image: "/img/530361918_18283380247284138_133094580325100578_n..webp",
        size: "wide",
        location: "Mumbai",
    },
    {
        id: 10,
        title: "Creative Portrait",
        category: "portrait",
        image: "/img/531822595_18283640836284138_2008306935621772497_n..webp",
        size: "small",
        location: "Outdoor Shoot",
    },
    {
        id: 11,
        title: "Elegant Fashion",
        category: "fashion",
        image: "/img/532239093_18283639591284138_1240929492701407161_n..webp",
        size: "normal",
        location: "Designer Collection",
    },
    {
        id: 12,
        title: "Traditional Ceremony",
        category: "wedding",
        image: "/img/532501606_18283429012284138_3710883859252304802_n..webp",
        size: "tall",
        location: "Traditional Venue",
    },
];

// Size classes for stunning masonry layout
const getSizeClasses = (size: string) => {
    switch (size) {
        case 'extraTall':
            return { grid: 'row-span-3', aspect: 'aspect-[2/5]' };
        case 'tall':
            return { grid: 'row-span-2', aspect: 'aspect-[3/5]' };
        case 'large':
            return { grid: 'col-span-2 row-span-2', aspect: 'aspect-square' };
        case 'wide':
            return { grid: 'col-span-2', aspect: 'aspect-[16/9]' };
        case 'small':
            return { grid: '', aspect: 'aspect-square' };
        case 'normal':
        default:
            return { grid: '', aspect: 'aspect-[3/4]' };
    }
};

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

                {/* Stunning Masonry Grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[150px]"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.3s',
                    }}
                >
                    {filteredItems.map((item, index) => {
                        const sizeConfig = getSizeClasses(item.size);

                        return (
                            <div
                                key={item.id}
                                className={`relative group cursor-pointer overflow-hidden ${sizeConfig.grid}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                                    transition: `all 0.6s ease ${index * 0.08}s`,
                                }}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Image Container */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        quality={95}
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Content */}
                                    <div
                                        className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end"
                                        style={{
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            transform: hoveredItem === item.id ? 'translateY(0)' : 'translateY(20px)',
                                            transition: 'all 0.4s ease',
                                        }}
                                    >
                                        <span className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1 md:mb-2">
                                            {item.location}
                                        </span>
                                        <h4 className="font-display text-[16px] md:text-[22px] font-light text-white leading-tight">
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
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 flex items-center justify-center">
                                            <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Corner Accents on Hover */}
                                    <div className={`absolute top-3 left-3 w-4 h-4 border-l border-t border-white transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`} />
                                    <div className={`absolute top-3 right-3 w-4 h-4 border-r border-t border-white transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`} />
                                    <div className={`absolute bottom-3 left-3 w-4 h-4 border-l border-b border-white transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`} />
                                    <div className={`absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`} />
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

