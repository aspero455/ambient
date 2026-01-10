"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/**
 * PhilosophySection Component
 * 
 * focuses on the artistic vision and "soul" of the studio.
 * Uses a classic editorial layout with a split view.
 */

const PhilosophySection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="relative bg-[#FAFAFA] py-32 md:py-48 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}
            />

            <div className="container mx-auto px-6 md:px-12 max-w-[1440px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Side (Left) */}
                    <div className="relative">
                        <motion.div
                            style={{ y }}
                            className="relative z-10 aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 overflow-hidden"
                        >
                            <Image
                                src="/img/528631979_18282710314284138_2035724994247197640_n..webp"
                                alt="Artistic Vision"
                                fill
                                className="object-cover transition-transform duration-1000 md:scale-110 grayscale hover:grayscale-0"
                            />

                            {/* Overlay Frame */}
                            <div className="absolute inset-4 border border-white/20 pointer-events-none" />
                        </motion.div>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -left-10 w-full h-full border border-black/5 z-0 hidden lg:block" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute -bottom-8 -right-8 bg-white p-8 shadow-xl max-w-xs z-20 hidden md:block"
                        >
                            <p className="font-display text-2xl italic text-black/80">
                                "Photography is the beauty of life captured."
                            </p>
                            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-black/40 mt-4">
                                — Tara Chisholm
                            </p>
                        </motion.div>
                    </div>

                    {/* Content Side (Right) */}
                    <div className="lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block w-12 h-[2px] bg-black/20 mb-8" />
                            <h2 className="font-display text-[48px] md:text-[64px] leading-[1.1] text-black mb-8">
                                We Believe in the <br />
                                <span className="italic text-black/40">Unscripted.</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-black/70">
                                Beyond the posed smiles and perfect lighting, there exists a raw, authentic narrative that makes your story unique. Our philosophy is rooted in finding these quiet, fleeting moments.
                            </p>
                            <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-black/70">
                                We approach every event not just as photographers, but as visual storytellers, weaving together light, composition, and emotion to create a timeless legacy of your most cherished memories.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-12"
                        >
                            <a href="/about" className="group inline-flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-black hover:text-black/60 transition-colors">
                                Read Our Story
                                <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-300" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
