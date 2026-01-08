"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Statistics Component
 * 
 * Impressive animated counter metrics section with scroll-triggered animations.
 */

const stats = [
    { number: 50000, suffix: "+", label: "Premium Images", prefix: "" },
    { number: 1000, suffix: "+", label: "Artists Worldwide", prefix: "" },
    { number: 98, suffix: "%", label: "Client Satisfaction", prefix: "" },
    { number: 24, suffix: "/7", label: "Expert Support", prefix: "" },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
};

const StatItem: React.FC<{ stat: typeof stats[0]; isVisible: boolean; delay: number }> = ({
    stat,
    isVisible,
    delay
}) => {
    const count = useCountUp(stat.number, 2000, isVisible);

    return (
        <div
            className="text-center group"
            style={{
                animationDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`
            }}
        >
            <div className="mb-4">
                <span className="font-display text-[72px] md:text-[96px] lg:text-[120px] font-light leading-[0.9] tracking-[-0.03em] text-black">
                    {stat.prefix}{count.toLocaleString()}{stat.suffix}
                </span>
            </div>
            <p className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-[#4A4A4A]">
                {stat.label}
            </p>
        </div>
    );
};

const Statistics: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white py-[80px] md:py-[160px]"
        >
            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {stats.map((stat, index) => (
                        <StatItem key={stat.label} stat={stat} isVisible={isVisible} delay={index * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
