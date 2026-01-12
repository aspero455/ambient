"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedCameraBackground Component
 * 
 * A reusable background component featuring floating camera icons 
 * in multiple colors.
 * Designed to be dropped into any section container.
 */

const iconColors = [
    "text-black",       // Black
    "text-white",       // White
    "text-[#ADD8E6]",   // Light Blue
    "text-gray-500",    // Grey
];

interface AnimatedCameraBackgroundProps {
    count?: number;
    opacity?: number;
    size?: number;
}

const AnimatedCameraBackground: React.FC<AnimatedCameraBackgroundProps> = ({
    count = 40,
    opacity = 0.1,
    size = 40
}) => {
    const [icons, setIcons] = useState<any[]>([]);

    useEffect(() => {
        // Handle responsive count
        const isMobile = window.innerWidth < 768;
        const actualCount = isMobile ? 0 : count;

        // Generate icons only on client-side to prevent hydration mismatch
        const newIcons = Array.from({ length: actualCount }).map((_, i) => ({
            id: i,
            color: iconColors[i % iconColors.length],
            // Random start and end points for complete coverage
            initial: {
                left: Math.random() * 100,
                top: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
            },
            animate: {
                left: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                top: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                rotate: [0, 180, 360],
            },
            duration: Math.random() * 40 + 40, // Much slower duration (40-80s)
        }));
        setIcons(newIcons);
    }, [count]);

    if (icons.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {icons.map((icon) => (
                <motion.div
                    key={icon.id}
                    className={`absolute ${icon.color}`}
                    style={{
                        opacity,
                        left: 0,
                        top: 0
                    }}
                    initial={{
                        left: `${icon.initial.left}%`,
                        top: `${icon.initial.top}%`,
                        scale: icon.initial.scale,
                        rotate: icon.initial.rotate,
                    }}
                    animate={{
                        left: icon.animate.left,
                        top: icon.animate.top,
                        rotate: icon.animate.rotate,
                    }}
                    transition={{
                        duration: icon.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

export default AnimatedCameraBackground;
