"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * InteractiveProcess Component - Photography Booking Process
 * 
 * Optimized for performance with Framer Motion.
 * Redesigned for better visibility and compact layout.
 */

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your vision and story.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Curation",
        description: "Setting the scene with moodboards and planning.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Execution",
        description: "The magic happens behind the lens.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Delivery",
        description: "Artfully edited frames delivered to you.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
    },
];

import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

const InteractiveProcess: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            className="relative bg-white py-20 md:py-32 overflow-hidden border-t border-black/5"
        >
            <AnimatedCameraBackground opacity={0.3} />
            <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="max-w-[600px]"
                    >
                        <span className="inline-block font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-black/60 mb-4">
                            How We Work
                        </span>
                        <h2 className="font-display text-[42px] md:text-[64px] font-light text-black leading-[1.1] tracking-[-0.02em]">
                            The Process
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <p className="font-sans text-[16px] text-black/80 max-w-[300px] leading-relaxed">
                            A streamlined journey from initial vision to final delivery.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 bg-[#F9F9F9] hover:bg-black transition-colors duration-500 rounded-sm"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <span className="font-display text-[14px] text-black/40 group-hover:text-white/40 transition-colors">
                                    {step.number}
                                </span>
                                <div className="p-3 bg-white group-hover:bg-white/10 text-black group-hover:text-white transition-colors rounded-full">
                                    {step.icon}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="font-display text-[24px] font-light text-black group-hover:text-white mb-3 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-black/70 group-hover:text-white/70 transition-colors">
                                    {step.description}
                                </p>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700 ease-in-out" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Stats or Info (Optional) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-black/5 flex flex-wrap gap-12"
                >
                    <div className="flex flex-col gap-1">
                        <span className="font-display text-[32px] font-light text-black">48h</span>
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-black/40">Initial Preview</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-display text-[32px] font-light text-black">100%</span>
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-black/40">Digital Delivery</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-display text-[32px] font-light text-black">24/7</span>
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-black/40">Client Support</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveProcess;
