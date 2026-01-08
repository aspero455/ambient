"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Testimonials Component
 * 
 * Client testimonials with elegant card design and auto-scrolling carousel.
 */

const testimonials = [
    {
        quote: "Ambient Frames has completely transformed our creative workflow. The quality of imagery is unmatched.",
        author: "Sarah Mitchell",
        role: "Creative Director",
        company: "McCann New York",
        avatar: "SM"
    },
    {
        quote: "Finally, a stock photography platform that understands what authentic imagery means. Every image tells a story.",
        author: "David Chen",
        role: "Art Director",
        company: "Ogilvy London",
        avatar: "DC"
    },
    {
        quote: "The curation is impeccable. We've cut our image sourcing time in half since switching to Ambient Frames.",
        author: "Emma Rodriguez",
        role: "Head of Design",
        company: "TBWA\\Chiat\\Day",
        avatar: "ER"
    },
    {
        quote: "Premium quality, fair pricing, and incredible support. This is how stock photography should be.",
        author: "Michael Park",
        role: "Senior Designer",
        company: "Publicis Groupe",
        avatar: "MP"
    },
    {
        quote: "Our campaigns have never looked better. The authentic feel of these images resonates with our audience.",
        author: "Lisa Thompson",
        role: "Brand Manager",
        company: "L'Oréal Paris",
        avatar: "LT"
    }
];

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
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
        <section ref={sectionRef} className="bg-[#1A1A1A] py-[80px] md:py-[160px] overflow-hidden">
            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] mb-12 md:mb-16">
                {/* Section Header */}
                <div
                    className="max-w-[600px]"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <h2 className="font-display text-[40px] md:text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-white mb-6">
                        Trusted by the best
                    </h2>
                    <p className="font-sans text-[18px] leading-[1.6] text-[#999999]">
                        See what leading creatives and agencies are saying about Ambient Frames.
                    </p>
                </div>
            </div>

            {/* Testimonials Carousel */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-6 px-10 pb-4 snap-x snap-mandatory"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.3s'
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.author}
                        className="flex-none w-[350px] md:w-[450px] snap-start"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.6s ease ${index * 100 + 400}ms, transform 0.6s ease ${index * 100 + 400}ms`
                        }}
                    >
                        <div className="bg-[#2A2A2A] p-8 h-full flex flex-col border border-[#333333] hover:border-[#444444] transition-colors duration-300">
                            {/* Quote */}
                            <div className="mb-8 flex-1">
                                <svg className="w-10 h-10 text-[#444444] mb-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391C14.017 10.447 16.505 8 19.978 8v2.174c-1.858 0-3.124 1.276-3.124 3.435V21h-2.837zm-9.017 0v-7.391C5 10.447 7.488 8 10.961 8v2.174c-1.858 0-3.124 1.276-3.124 3.435V21H5z" />
                                </svg>
                                <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-white/90">
                                    "{testimonial.quote}"
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#4A4A4A] flex items-center justify-center">
                                    <span className="font-sans font-bold text-[14px] text-white">
                                        {testimonial.avatar}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-sans font-semibold text-[14px] text-white">
                                        {testimonial.author}
                                    </p>
                                    <p className="font-sans text-[12px] text-[#999999]">
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Spacer at end */}
                <div className="flex-none w-10" />
            </div>
        </section>
    );
};

export default Testimonials;
