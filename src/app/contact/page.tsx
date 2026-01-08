"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import BrandShowcase from '@/components/sections/BrandShowcase';
import FAQSection from '@/components/sections/FAQSection';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Redesigned Contact Page - "Classic Editorial" Theme
 * 
 * Features:
 * - Bright, minimalist aesthetic (no dark hero)
 * - Drifting camera icons on light backgrounds
 * - Elegant typography and spacious layout
 * - Smooth scroll-triggered reveal animations
 */

export default function ContactPage() {
    const [scrollY, setScrollY] = useState(0);
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [isVisible, setIsVisible] = useState(false);

    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => setFormStatus('sent'), 1800);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA] selection:bg-black selection:text-white">
            <Navigation />

            <main className="flex-grow">
                {/* ═══════════════════════════════════════════════════════════════
                    HERO: SERVICES STYLE
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[85vh] bg-gradient-to-br from-[#F0F7FF] via-white to-[#FFF5F5] overflow-hidden flex items-center"
                >
                    {/* Background Grid */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                            transform: `translateY(${scrollY * 0.1}px)`,
                        }}
                    />

                    {/* Glowing Orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Blue Orb */}
                        <motion.div
                            className="absolute w-[500px] h-[500px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                            }}
                            animate={{
                                x: [0, 100, -50, 80, 0],
                                y: [0, -80, 60, -40, 0],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '-10%', left: '-10%' }}
                        />
                        {/* Light Red Orb */}
                        <motion.div
                            className="absolute w-[400px] h-[400px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
                            }}
                            animate={{
                                x: [0, -120, 60, -60, 0],
                                y: [0, 100, -50, 120, 0],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ bottom: '10%', right: '-5%' }}
                        />
                        <motion.div
                            className="absolute w-40 h-40 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 70%)',
                                boxShadow: '0 0 80px 30px rgba(59, 130, 246, 0.05)',
                            }}
                            animate={{
                                x: [0, 120, 60, -60, 0],
                                y: [0, -100, 50, 120, 0],
                                scale: [1, 1.3, 0.8, 1.1, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '20%', left: '5%' }}
                        />
                        <motion.div
                            className="absolute w-24 h-24 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 40%, transparent 70%)',
                                boxShadow: '0 0 50px 20px rgba(239, 68, 68, 0.05)',
                            }}
                            animate={{
                                x: [0, -80, 100, -50, 0],
                                y: [0, 80, -60, 100, 0],
                                scale: [1, 0.7, 1.4, 0.9, 1],
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '60%', right: '10%' }}
                        />
                    </div>

                    {/* Camera Icons */}
                    <AnimatedCameraBackground opacity={0.1} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10 pt-20">
                        <div className="max-w-[1000px]">
                            {/* Eyebrow */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                    Start Your Narrative
                                </span>
                            </motion.div>

                            {/* Main Headline */}
                            <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-8">
                                {["Let's", "Begin", "a", "Conversation"].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        className="inline-block mr-4 last:mr-0"
                                        initial={{ opacity: 0, y: 80 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        style={{ fontSize: 'clamp(42px, 8.5vw, 100px)' }}
                                    >
                                        {index === 3 ? <span className="italic text-black/20 font-light">{word}</span> : word}
                                    </motion.span>
                                ))}
                            </h1>

                            {/* Description */}
                            <motion.p
                                className="font-sans text-[18px] md:text-[20px] leading-[1.7] text-black/60 max-w-[600px] mb-12"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Whether you have a project in mind or just want to say hello, we're here
                                to listen and collaborate on your next visual masterpiece.
                            </motion.p>

                            {/* Decorative Separator */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={isVisible ? { scaleX: 1 } : {}}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                                className="w-full h-[1px] bg-black/5 origin-left mb-12"
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    CONTENT: FORM & STUDIO INFO
                ═══════════════════════════════════════════════════════════════ */}
                <section className="relative py-24 md:py-44">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                            {/* Form Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-7"
                            >
                                <div className="max-w-[600px]">
                                    <h2 className="font-display text-[32px] md:text-[42px] font-light text-black mb-16">
                                        Send a Message
                                    </h2>

                                    <form onSubmit={handleFormSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    className="w-full bg-transparent border-b border-black/10 py-4 text-black focus:border-black outline-none transition-all peer"
                                                    placeholder=" "
                                                />
                                                <label htmlFor="name" className="absolute left-0 top-4 text-black/30 font-sans text-[14px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-black/40 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] uppercase tracking-widest font-bold">
                                                    Full Name
                                                </label>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="w-full bg-transparent border-b border-black/10 py-4 text-black focus:border-black outline-none transition-all peer"
                                                    placeholder=" "
                                                />
                                                <label htmlFor="email" className="absolute left-0 top-4 text-black/30 font-sans text-[14px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-black/40 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] uppercase tracking-widest font-bold">
                                                    Email Address
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <input
                                                type="text"
                                                id="subject"
                                                required
                                                className="w-full bg-transparent border-b border-black/10 py-4 text-black focus:border-black outline-none transition-all peer"
                                                placeholder=" "
                                            />
                                            <label htmlFor="subject" className="absolute left-0 top-4 text-black/30 font-sans text-[14px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-black/40 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] uppercase tracking-widest font-bold">
                                                Interest / Topic
                                            </label>
                                        </div>

                                        <div className="relative group">
                                            <textarea
                                                id="message"
                                                required
                                                rows={4}
                                                className="w-full bg-transparent border-b border-black/10 py-4 text-black focus:border-black outline-none transition-all peer resize-none"
                                                placeholder=" "
                                            />
                                            <label htmlFor="message" className="absolute left-0 top-4 text-black/30 font-sans text-[14px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-black/40 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] uppercase tracking-widest font-bold">
                                                Your Story
                                            </label>
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={formStatus !== 'idle'}
                                                className="relative w-full md:w-auto px-12 py-5 bg-black text-white font-sans font-bold text-[12px] tracking-[0.2em] uppercase overflow-hidden transition-transform active:scale-95 disabled:bg-black/40"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {formStatus === 'idle' && (
                                                        <motion.span
                                                            key="send"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="relative z-10"
                                                        >
                                                            Deliver Message
                                                        </motion.span>
                                                    )}
                                                    {formStatus === 'sending' && (
                                                        <motion.span
                                                            key="sending"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="relative z-10 flex items-center justify-center gap-2"
                                                        >
                                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending
                                                        </motion.span>
                                                    )}
                                                    {formStatus === 'sent' && (
                                                        <motion.span
                                                            key="sent"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="relative z-10"
                                                        >
                                                            Message Received
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Info Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="lg:col-span-5"
                            >
                                <div className="space-y-12 h-full flex flex-col justify-between">
                                    <div className="space-y-12">
                                        <div>
                                            <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-6">Our Studio</h3>
                                            <div className="relative aspect-video w-full overflow-hidden mb-8 group">
                                                <Image
                                                    src="/img/528631979_18282710314284138_2035724994247197640_n..webp"
                                                    alt="Studio location"
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                                            </div>
                                            <p className="font-sans text-[16px] text-black leading-relaxed">
                                                Andheri West, Studio 4A<br />
                                                Mumbai, MH 400053
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                            <div>
                                                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-4">Email</h3>
                                                <a href="mailto:hello@ambientframes.com" className="font-sans text-[16px] text-black hover:text-black/40 transition-colors">
                                                    hello@ambientframes.com
                                                </a>
                                            </div>
                                            <div>
                                                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-4">Phone</h3>
                                                <a href="tel:+918356953173" className="font-sans text-[16px] text-black hover:text-black/40 transition-colors">
                                                    +91 83569 53173
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-12 border-t border-black/5">
                                        <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-6">Follow our journey</h3>
                                        <div className="flex gap-8">
                                            {['Instagram', 'Vimeo', 'LinkedIn'].map((social) => (
                                                <a
                                                    key={social}
                                                    href="#"
                                                    className="font-sans text-[13px] font-bold uppercase tracking-widest text-black hover:text-black/40 transition-colors border-b border-transparent hover:border-black/20 pb-1"
                                                >
                                                    {social}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SOCIAL PROOF: TRUSTED BY
                ═══════════════════════════════════════════════════════════════ */}
                <BrandShowcase />

                {/* ═══════════════════════════════════════════════════════════════
                    FAQ: ALWAYS OPEN
                ═══════════════════════════════════════════════════════════════ */}
                <FAQSection />

            </main>

            <Footer />
        </div>
    );
}
