"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlowingOrb Component
 * 
 * A large, soft blue ambient light orb that floats and acts as a connector between sections.
 * It provides a "misty" atmospheric effect.
 */

const GlowingOrb: React.FC = () => {
    return (
        <div className="relative w-full h-[0px] z-0 pointer-events-none flex justify-center">
            <motion.div
                className="absolute transform -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
                    boxShadow: '0 0 100px 50px rgba(59, 130, 246, 0.05)',
                }}
                animate={{
                    scale: [1, 1.1, 0.95, 1],
                    opacity: [0.6, 0.8, 0.6],
                    y: ['-50%', '-55%', '-45%', '-50%'],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Core Highlight */}
            <motion.div
                className="absolute transform -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px]"
                style={{
                    background: 'radial-gradient(circle, rgba(147, 197, 253, 0.2) 0%, transparent 60%)',
                }}
                animate={{
                    scale: [1, 1.2, 0.9, 1],
                    x: [0, 30, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default GlowingOrb;
