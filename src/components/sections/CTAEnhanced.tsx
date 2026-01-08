"use client";

import React, { useEffect, useRef, useState } from 'react';

import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * CTAEnhanced Component - Photography Business CTA
 * 
 * Premium call-to-action section with animated background,
 * floating elements, and compelling messaging for booking.
 */

const CTAEnhanced: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

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

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-32 md:py-48 overflow-hidden"
        >
            <AnimatedCameraBackground opacity={0.3} />
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div
                    className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        left: `${mousePosition.x * 100 - 40}%`,
                        top: `${mousePosition.y * 100 - 40}%`,
                        transition: 'left 0.5s ease-out, top 0.5s ease-out',
                    }}
                />
                <div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(200,200,200,0.4) 0%, transparent 70%)',
                        right: `${(1 - mousePosition.x) * 50}%`,
                        bottom: `${(1 - mousePosition.y) * 50}%`,
                        transition: 'right 0.8s ease-out, bottom 0.8s ease-out',
                    }}
                />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Floating Elements */}
                <div className="absolute top-[15%] left-[10%] w-24 h-24 border border-white/10 rounded-full animate-float" />
                <div className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-white/10 rotate-45 animate-float-delay" />
                <div className="absolute top-[60%] left-[5%] w-8 h-8 bg-white/5 rounded-full animate-float" />
                <div className="absolute top-[30%] right-[8%] w-12 h-12 border border-white/5 rounded-full animate-float-delay" />

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-24 h-24">
                    <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                    <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
                </div>
                <div className="absolute top-8 right-8 w-24 h-24">
                    <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-white/30 to-transparent" />
                    <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
                </div>
                <div className="absolute bottom-8 left-8 w-24 h-24">
                    <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-white/30 to-transparent" />
                </div>
                <div className="absolute bottom-8 right-8 w-24 h-24">
                    <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-white/30 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-white/30 to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">
                <div className="max-w-[1000px] mx-auto text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 mb-10"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease',
                        }}
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                            Limited Slots Available
                        </span>
                        <span className="px-3 py-1 bg-white/10 font-sans text-[11px] font-bold text-white">
                            Book Now
                        </span>
                    </div>

                    {/* Headline */}
                    <h2
                        className="font-display font-light text-white mb-8 leading-[1.0] tracking-[-0.02em]"
                        style={{
                            fontSize: 'clamp(40px, 8vw, 96px)',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease 0.1s',
                        }}
                    >
                        Let's create
                        <br />
                        <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                            magic together.
                        </span>
                    </h2>

                    {/* Description */}
                    <p
                        className="font-sans text-[18px] md:text-[22px] leading-[1.6] text-white/60 mb-12 max-w-[650px] mx-auto"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s ease 0.2s',
                        }}
                    >
                        Whether it's your wedding day, a fashion shoot, or a corporate event — we're here to capture your most important moments with artistry and passion.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s ease 0.3s',
                        }}
                    >
                        <button className="group relative bg-white text-black px-12 py-6 font-sans font-bold text-[13px] tracking-[0.15em] uppercase overflow-hidden shadow-2xl hover:shadow-white/20 transition-shadow">
                            <span className="relative z-10 flex items-center gap-3">
                                Book a Session
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                        <button className="group px-12 py-6 font-sans font-bold text-[13px] tracking-[0.15em] uppercase text-white border-2 border-white/20 hover:border-white/50 transition-colors flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Us Now
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[900px] mx-auto"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.8s ease 0.5s',
                        }}
                    >
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ), label: "Flexible scheduling"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ), label: "48-hour sneak peeks"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    </svg>
                                ), label: "Pro-grade equipment"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                ), label: "500+ happy clients"
                            },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className="flex flex-col items-center gap-3 group"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.6s ease ${0.6 + index * 0.1}s`,
                                }}
                            >
                                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-all">
                                    {item.icon}
                                </div>
                                <span className="font-sans text-[12px] text-white/50 text-center">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>
    );
};

export default CTAEnhanced;
