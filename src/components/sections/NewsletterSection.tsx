"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * NewsletterSection Component - Photography Updates
 * 
 * Premium newsletter signup with animated background,
 * input styling, and success state for photography updates.
 */

const NewsletterSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-white py-24 md:py-32 overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(45deg, black 25%, transparent 25%),
              linear-gradient(-45deg, black 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, black 75%),
              linear-gradient(-45deg, transparent 75%, black 75%)
            `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                />
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-24 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
            <div className="absolute top-0 right-1/3 w-[1px] h-32 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-1/3 w-[1px] h-28 bg-gradient-to-t from-transparent via-black/10 to-transparent" />
            <div className="absolute bottom-0 right-1/4 w-[1px] h-20 bg-gradient-to-t from-transparent via-black/10 to-transparent" />

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                <div
                    className="max-w-[800px] mx-auto text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-8">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    {/* Headline */}
                    <h2 className="font-display text-[40px] md:text-[56px] font-light text-black leading-[1.0] tracking-[-0.02em] mb-6">
                        Stay in the frame.
                    </h2>

                    {/* Description */}
                    <p className="font-sans text-[18px] leading-[1.7] text-[#666] mb-10 max-w-[500px] mx-auto">
                        Get photography tips, behind-the-scenes stories, exclusive offers, and be the first to know about our availability.
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="relative max-w-[500px] mx-auto"
                    >
                        <div
                            className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''
                                }`}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter your email address"
                                className={`w-full px-6 py-5 pr-[160px] bg-[#F5F5F5] border-2 font-sans text-[16px] text-black placeholder:text-black/40 focus:outline-none transition-all duration-300 ${isFocused ? 'border-black' : 'border-transparent'
                                    } ${isSubmitted ? 'bg-emerald-50 border-emerald-500' : ''}`}
                                disabled={isSubmitted}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 font-sans font-bold text-[12px] uppercase tracking-[0.15em] transition-all duration-300 ${isSubmitted
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-black text-white hover:bg-[#333]'
                                    }`}
                            >
                                {isSubmitted ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Done!
                                    </span>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </div>

                        {/* Success Message */}
                        <div
                            className={`mt-4 transition-all duration-300 ${isSubmitted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
                                }`}
                        >
                            <p className="font-sans text-[14px] text-emerald-600">
                                📸 Welcome! You'll receive our first update soon.
                            </p>
                        </div>
                    </form>

                    {/* Trust Badges */}
                    <div
                        className="mt-12 flex flex-wrap items-center justify-center gap-8"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.8s ease 0.3s',
                        }}
                    >
                        <div className="flex items-center gap-2 text-black/40">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-sans text-[13px]">No spam, ever</span>
                        </div>
                        <div className="flex items-center gap-2 text-black/40">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-sans text-[13px]">Photography tips</span>
                        </div>
                        <div className="flex items-center gap-2 text-black/40">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-sans text-[13px]">Exclusive offers</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div
                        className="mt-16 flex items-center justify-center gap-4"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.8s ease 0.5s',
                        }}
                    >
                        <span className="font-sans text-[12px] uppercase tracking-[0.15em] text-black/40 mr-4">
                            Follow Us
                        </span>
                        {['instagram', 'pinterest', 'facebook', 'youtube'].map((social) => (
                            <a
                                key={social}
                                href={`#${social}`}
                                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:bg-black hover:text-white transition-all duration-300"
                            >
                                {social === 'instagram' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                )}
                                {social === 'pinterest' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                    </svg>
                                )}
                                {social === 'facebook' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                {social === 'youtube' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
