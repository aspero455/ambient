"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Find Photos CTA Section
 * 
 * A minimal, elegant section directing users to the photo finding page.
 * Keeps consistent with the site's black/white/emerald aesthetic.
 * Redesigned to fill horizontal space better.
 */

const FindPhotosCTA: React.FC = () => {
    return (
        <section className="relative w-full py-20 md:py-28 bg-white overflow-hidden border-b border-black/5">
            {/* Subtle Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.3]"
                style={{
                    backgroundImage: 'linear-gradient(#00000005 1px, transparent 1px), linear-gradient(90deg, #00000005 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Heading & CTA */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">
                                AI Photo Discovery
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-[48px] md:text-[64px] font-light leading-[1] text-black mb-8 -ml-1"
                        >
                            Find your photos <br />
                            <span className="italic text-black/40">in seconds.</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-sans text-[16px] md:text-[18px] text-black/60 leading-relaxed mb-10 max-w-md"
                        >
                            No more endless scrolling. Our advanced facial recognition technology instantly scans thousands of event photos to find every moment you're in.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Link
                                href="/find-photos"
                                className="group relative inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-sans font-bold text-[12px] tracking-[0.2em] uppercase overflow-hidden hover:pr-12 transition-all duration-500"
                            >
                                <span className="relative z-10">Start Scanning</span>
                                <span className="absolute right-5 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300 z-10">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Steps & Note - Expanding horizontally */}
                    <div className="lg:col-span-7 w-full">
                        {/* Steps Container - Classic Box Style */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-black/10">
                            {[
                                {
                                    num: "01",
                                    title: "Upload Selfie",
                                    desc: "Take a quick selfie to identify your face.",
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )
                                },
                                {
                                    num: "02",
                                    title: "AI Analysis",
                                    desc: "We scan the gallery for matches.",
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    num: "03",
                                    title: "Get Photos",
                                    desc: "Download your high-res images instantly.",
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    )
                                }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 + (idx * 0.15) }}
                                    className="border-r border-b border-black/10 p-8 md:p-10 hover:bg-black/[0.02] transition-colors group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-black/[0.02] rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="font-display text-[40px] text-black/10 group-hover:text-black/20 transition-colors">
                                            {step.num}
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/60 group-hover:border-black group-hover:text-black transition-all">
                                            {step.icon}
                                        </div>
                                    </div>

                                    <h3 className="font-sans text-[16px] font-bold text-black mb-2 relative z-10">
                                        {step.title}
                                    </h3>
                                    <p className="font-sans text-[13px] text-black/50 leading-relaxed relative z-10">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Note Box - Full Width */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-8 flex items-start gap-4 p-5 bg-amber-50/50 border border-amber-100/50 rounded-sm"
                        >
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                            <p className="font-sans text-[13px] text-amber-900/60 leading-relaxed">
                                <span className="font-bold text-amber-900/80 uppercase tracking-wide text-[11px] mr-2">Note</span>
                                Photos are only available for access during the ongoing event days. We recommend downloading your collection immediately.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Corner Bracket Accents (Classic Theme) */}
            <div className="absolute top-0 left-0 p-8 hidden md:block opacity-30">
                <div className="w-4 h-4 border-t border-l border-black" />
            </div>
            <div className="absolute bottom-0 right-0 p-8 hidden md:block opacity-30">
                <div className="w-4 h-4 border-b border-r border-black" />
            </div>

        </section>
    );
};

export default FindPhotosCTA;
