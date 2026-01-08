"use client";

import { motion } from 'framer-motion';

/**
 * TextTicker Component
 * 
 * Infinite scrolling text marquee with key brand messages.
 * Features seamless framer-motion animation.
 */

const messages = [
    "Wedding Photography",
    "•",
    "Corporate Events",
    "•",
    "Fashion & Editorial",
    "•",
    "Portrait Sessions",
    "•",
    "Model Portfolios",
    "•",
    "Pre-Wedding Shoots",
    "•",
    "Award-Winning Quality",
    "•",
];

const TextTicker: React.FC = () => {
    return (
        <section className="bg-black py-6 overflow-hidden border-y border-white/10">
            <div className="flex">
                <motion.div
                    className="flex items-center whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 30,
                        repeat: Infinity
                    }}
                >
                    {/* Render content twice for seamless loop */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            {messages.map((text, index) => (
                                <span
                                    key={`${i}-${index}`}
                                    className={`mx-8 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] ${text === "•" ? "text-[#666666]" : "text-white"
                                        }`}
                                >
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TextTicker;
