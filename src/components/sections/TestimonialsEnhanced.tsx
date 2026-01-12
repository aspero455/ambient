"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * TestimonialsEnhanced Component - Client Reviews
 * 
 * Premium testimonials from photography clients with ratings,
 * animated cards, and social proof indicators.
 */

const testimonials = [
    {
        id: 1,
        quote: "Ambient Frames captured our wedding day so beautifully. Every image tells a story, and we couldn't be happier with how they preserved our special moments.",
        author: "Priya & Rahul Sharma",
        role: "Wedding Clients",
        company: "Destination Wedding, Udaipur",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        project: "Wedding Photography",
        featured: true,
    },
    {
        id: 2,
        quote: "As a model, I've worked with many photographers, but Ambient Frames truly stands out. They know how to bring out the best in every shot.",
        author: "Ananya Patel",
        role: "Fashion Model",
        company: "Elite Model Management",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        project: "Model Portfolio",
        featured: false,
    },
    {
        id: 3,
        quote: "Our corporate event was covered professionally. The team was discreet yet captured every important moment. Highly recommended for corporate clients.",
        author: "Vikram Mehta",
        role: "Marketing Director",
        company: "Tech Solutions Pvt Ltd",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        project: "Corporate Event",
        featured: false,
    },
    {
        id: 4,
        quote: "The pre-wedding shoot exceeded all our expectations! They found the perfect locations and made us feel completely comfortable in front of the camera.",
        author: "Sneha & Arjun",
        role: "Engaged Couple",
        company: "Pre-Wedding Shoot, Goa",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        project: "Pre-Wedding",
        featured: false,
    },
    {
        id: 5,
        quote: "They shot our fashion lookbook and the results were stunning. Creative, professional, and delivered on time. Will definitely work with them again!",
        author: "Sara Khan",
        role: "Fashion Designer",
        company: "Couture By Sara",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        project: "Fashion Lookbook",
        featured: false,
    },
];

import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

const TestimonialsEnhanced: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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

    // Auto-scroll effect
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A] py-24 md:py-40 overflow-hidden"
        >
            <AnimatedCameraBackground opacity={0.3} />
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '48px 48px',
                    }}
                />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] hidden md:block" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px] hidden md:block" />
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">
                {/* Section Header */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-24"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    <div className="max-w-[600px]">
                        <span className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 mb-6">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                                Client Love
                            </span>
                        </span>
                        <h2 className="font-display text-[48px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em]">
                            What our clients
                            <span className="block text-white/40">say about us</span>
                        </h2>
                    </div>

                    {/* Rating Summary */}
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-sans text-[13px] text-white/60">
                                <strong className="text-white">5.0</strong> from 200+ reviews
                            </p>
                        </div>
                        <div className="w-[1px] h-12 bg-white/10" />
                        <div className="flex -space-x-3">
                            {testimonials.slice(0, 4).map((t, i) => (
                                <div
                                    key={t.id}
                                    className="relative w-10 h-10 rounded-full border-2 border-[#0A0A0A] overflow-hidden"
                                    style={{ zIndex: 4 - i }}
                                >
                                    <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#0A0A0A] flex items-center justify-center">
                                <span className="font-sans text-[10px] font-bold text-white">+200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Testimonial */}
                <div
                    className="mb-16"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.3s',
                    }}
                >
                    {testimonials.filter(t => t.featured).map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 md:p-12"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-8 text-white/5">
                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391C14.017 10.447 16.505 8 19.978 8v2.174c-1.858 0-3.124 1.276-3.124 3.435V21h-2.837zm-9.017 0v-7.391C5 10.447 7.488 8 10.961 8v2.174c-1.858 0-3.124 1.276-3.124 3.435V21H5z" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                                {/* Author Info */}
                                <div className="flex flex-col items-start">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-white/10">
                                        <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
                                    </div>
                                    <h4 className="font-display text-[24px] font-light text-white mb-2">{testimonial.author}</h4>
                                    <p className="font-sans text-[14px] text-white/60 mb-4">{testimonial.role}</p>
                                    <p className="font-sans text-[12px] text-white/40">{testimonial.company}</p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mt-6">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="lg:col-span-2 flex flex-col justify-center">
                                    <p className="font-display text-[28px] md:text-[36px] font-light text-white leading-[1.3] mb-8">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="px-4 py-2 bg-white/5 font-sans text-[11px] font-bold uppercase tracking-wider text-white/60">
                                            {testimonial.project}
                                        </span>
                                        <span className="font-sans text-[13px] text-white/40">Verified Client</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scrolling Testimonials */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar gap-6 pb-4 snap-x snap-mandatory"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.5s',
                    }}
                >
                    {testimonials.filter(t => !t.featured).map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`flex-none w-[340px] md:w-[400px] snap-start transition-all duration-500 ${activeIndex === index + 1 ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
                                }`}
                        >
                            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 h-full flex flex-col hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-6">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="font-sans text-[16px] leading-[1.6] text-white/80 mb-8 flex-1">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-sans font-semibold text-[14px] text-white">{testimonial.author}</p>
                                        <p className="font-sans text-[12px] text-white/40">{testimonial.project}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Spacer */}
                    <div className="flex-none w-10" />
                </div>

                {/* Navigation Dots */}
                <div
                    className="flex justify-center gap-3 mt-12"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease 0.7s',
                    }}
                >
                    {testimonials.filter(t => !t.featured).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index + 1)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index + 1 ? 'bg-white w-8' : 'bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsEnhanced;
