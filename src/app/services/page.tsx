"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Services Page
 * Comprehensive services showcase with beautiful animations
 */

// Portfolio images for services
const portfolioImages = [
    "/img/524877796_18281941537284138_7194601866269685029_n..webp",
    "/img/528577300_18282637933284138_6024131309224852219_n..webp",
    "/img/528631979_18282710314284138_2035724994247197640_n..webp",
    "/img/529672310_18282710362284138_7894353990389373612_n..webp",
    "/img/530361918_18283380247284138_133094580325100578_n..webp",
    "/img/531822595_18283640836284138_2008306935621772497_n..webp",
    "/img/532239093_18283639591284138_1240929492701407161_n..webp",
    "/img/532501606_18283429012284138_3710883859252304802_n..webp",
    "/img/532508474_18283639534284138_7821912398438107581_n..webp",
    "/img/566414945_18292643884284138_3751019525464458517_n.jpeg",
    "/img/567395566_18292643899284138_984878061390000747_n.jpeg",
    "/img/584919632_18301346926284138_3623525760133837999_n.jpeg",
];

// Services data
const services = [
    {
        id: 'wedding',
        number: "01",
        title: "Wedding Photography",
        subtitle: "Capturing Your Forever Moments",
        description: "Your wedding day is a once-in-a-lifetime celebration of love. We capture every stolen glance, joyful tear, and heartfelt embrace with artistry and precision.",
        longDescription: "From the nervous excitement of getting ready to the last dance of the night, we document every precious moment of your special day. Our unobtrusive style ensures authentic, emotional photographs that tell your unique love story.",
        image: portfolioImages[0],
        features: [
            "Full-day coverage (up to 12 hours)",
            "Second photographer included",
            "Pre-wedding consultation",
            "High-resolution digital gallery",
            "Premium photo album",
            "Drone aerial shots"
        ],
        stats: { shoots: "500+", satisfaction: "100%", awards: "5" }
    },
    {
        id: 'portrait',
        number: "02",
        title: "Portrait Sessions",
        subtitle: "Reveal Your True Self",
        description: "Professional portraits that capture your personality, confidence, and unique essence. Perfect for professionals, artists, and anyone seeking stunning personal imagery.",
        longDescription: "Whether it's for your LinkedIn profile, personal branding, or simply to celebrate who you are, our portrait sessions are designed to make you look and feel your absolute best. We create comfortable environments where your authentic self shines through.",
        image: portfolioImages[1],
        features: [
            "1-2 hour session",
            "Multiple outfit changes",
            "Professional retouching",
            "Makeup artist available",
            "Indoor/outdoor locations",
            "Same-week delivery"
        ],
        stats: { shoots: "1000+", satisfaction: "99%", awards: "3" }
    },
    {
        id: 'corporate',
        number: "03",
        title: "Corporate Events",
        subtitle: "Elevate Your Brand",
        description: "Professional coverage of business events, conferences, product launches, and corporate milestones that capture the energy and success of your organization.",
        longDescription: "From intimate board meetings to large-scale conferences, we understand the importance of capturing key moments that tell your corporate story. Our discrete approach ensures natural, unposed shots while still delivering stunning professional imagery.",
        image: portfolioImages[2],
        features: [
            "Flexible duration coverage",
            "Multiple photographers",
            "Same-day preview images",
            "Branded photo delivery",
            "Event highlight reels",
            "Social media ready files"
        ],
        stats: { shoots: "200+", satisfaction: "100%", awards: "2" }
    },
    {
        id: 'fashion',
        number: "04",
        title: "Fashion & Editorial",
        subtitle: "Art Meets Fashion",
        description: "High-fashion photography with creative direction that brings your vision to life. From lookbooks to magazine editorials, we create stunning visual narratives.",
        longDescription: "Our fashion photography combines technical excellence with creative vision. We work closely with designers, stylists, and models to create compelling imagery that captures the essence of your brand and tells your fashion story.",
        image: portfolioImages[3],
        features: [
            "Creative direction included",
            "Studio or location shoots",
            "Professional retouching",
            "Mood board development",
            "Multiple look options",
            "Commercial licensing"
        ],
        stats: { shoots: "50+", satisfaction: "100%", awards: "4" }
    },
    {
        id: 'family',
        number: "05",
        title: "Family Portraits",
        subtitle: "Cherish Every Generation",
        description: "Beautiful family portraits that capture the love, connection, and unique dynamics of your family. From newborns to grandparents, we celebrate every chapter.",
        longDescription: "Family is everything, and these moments deserve to be preserved beautifully. Our relaxed, fun approach ensures natural smiles and genuine interactions, creating timeless portraits that you'll treasure for generations.",
        image: portfolioImages[4],
        features: [
            "2-hour family session",
            "Multiple family groupings",
            "Pet-friendly shoots",
            "Outdoor/indoor options",
            "Print-ready files",
            "Holiday mini sessions"
        ],
        stats: { shoots: "300+", satisfaction: "100%", awards: "2" }
    },
    {
        id: 'maternity',
        number: "06",
        title: "Maternity & Newborn",
        subtitle: "New Beginnings",
        description: "Celebrate the miracle of new life with stunning maternity and newborn photography that captures this precious time with elegance and tenderness.",
        longDescription: "From the beautiful glow of pregnancy to the delicate features of your newborn, we create timeless images that celebrate this incredible journey. Our patient, gentle approach ensures a comfortable experience for mom and baby.",
        image: portfolioImages[5],
        features: [
            "Maternity session (outdoor/studio)",
            "Newborn session (in-home)",
            "Props and accessories",
            "Sibling/family inclusion",
            "Artistic editing",
            "Announcement cards"
        ],
        stats: { shoots: "150+", satisfaction: "100%", awards: "1" }
    }
];

// Pricing packages
const packages = [
    {
        name: "Essential",
        price: "₹25,000",
        duration: "4 Hours",
        description: "Perfect for intimate events and portrait sessions",
        features: [
            "4 hours of coverage",
            "1 photographer",
            "100+ edited photos",
            "Online gallery",
            "Digital downloads",
            "2-week delivery"
        ],
        popular: false
    },
    {
        name: "Premium",
        price: "₹50,000",
        duration: "8 Hours",
        description: "Our most popular package for weddings and events",
        features: [
            "8 hours of coverage",
            "2 photographers",
            "300+ edited photos",
            "Online gallery",
            "Premium photo album",
            "1-week delivery",
            "Highlight slideshow",
            "Print releases"
        ],
        popular: true
    },
    {
        name: "Luxury",
        price: "₹1,00,000",
        duration: "Full Day",
        description: "Complete coverage for the most special occasions",
        features: [
            "Full-day coverage (12+ hours)",
            "3 photographers",
            "500+ edited photos",
            "Premium online gallery",
            "Luxury photo album",
            "Drone coverage",
            "Same-day preview",
            "3-day delivery",
            "Engagement session included",
            "Canvas prints"
        ],
        popular: false
    }
];

// FAQ data
const faqs = [
    {
        q: "How far in advance should I book?",
        a: "We recommend booking 3-6 months in advance for weddings and major events. For portrait sessions, 2-4 weeks notice is usually sufficient."
    },
    {
        q: "Do you travel for destination shoots?",
        a: "Absolutely! We love destination weddings and shoots. Travel fees apply for locations outside Mumbai, but we're happy to discuss packages for your specific needs."
    },
    {
        q: "How long until we receive our photos?",
        a: "Delivery times vary by package: Essential (2 weeks), Premium (1 week), Luxury (3 days). Weddings typically take 2-4 weeks for the complete gallery."
    },
    {
        q: "Can we request specific shots or poses?",
        a: "Of course! We encourage you to share inspiration and must-have shots. We'll work together to ensure we capture everything meaningful to you."
    },
    {
        q: "What happens if it rains on our outdoor shoot?",
        a: "We always have a backup plan! We can reschedule, move to a covered location, or embrace the weather for unique, dramatic shots—your choice."
    },
    {
        q: "Do you offer videography services?",
        a: "Yes! We partner with talented videographers to offer comprehensive photo and video packages. Ask us about bundled pricing."
    }
];

export default function ServicesPage() {
    const [scrollY, setScrollY] = useState(0);
    const [activeService, setActiveService] = useState<string | null>(null);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

    const heroRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const pricingRef = useRef<HTMLElement>(null);
    const processRef = useRef<HTMLElement>(null);
    const faqRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = [
            { ref: heroRef, id: 'hero' },
            { ref: servicesRef, id: 'services' },
            { ref: pricingRef, id: 'pricing' },
            { ref: processRef, id: 'process' },
            { ref: faqRef, id: 'faq' },
            { ref: ctaRef, id: 'cta' },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-section');
                        if (id) setLoadedSections((prev) => new Set([...prev, id]));
                    }
                });
            },
            { threshold: 0.15 }
        );

        sections.forEach(({ ref, id }) => {
            if (ref.current) {
                ref.current.setAttribute('data-section', id);
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    const isVisible = (id: string) => loadedSections.has(id);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="overflow-hidden">
                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 1: HERO
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[90vh] bg-white overflow-hidden flex items-center"
                >
                    {/* ═══════════════════════════════════════════════════════════════
                        BACKGROUND LAYERS (Z-ORDER: BOTTOM TO TOP)
                    ═══════════════════════════════════════════════════════════════ */}

                    {/* 1. Base Gradient Layer (Last Layer) - Blue on Right */}
                    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden hidden lg:block">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
                                filter: 'blur(80px)',
                            }}
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* 2. Glowing Circles / Orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Blue Glowing Orb - Right Side */}
                        <motion.div
                            className="absolute w-[500px] h-[500px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
                                boxShadow: '0 0 100px 40px rgba(59, 130, 246, 0.06)',
                            }}
                            animate={{
                                x: [0, 60, -40, 0],
                                y: [0, -50, 80, 0],
                                scale: [1, 1.2, 0.9, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '10%', right: '5%' }}
                        />

                        {/* Traditional Black Orb - Left Side */}
                        <motion.div
                            className="absolute w-40 h-40 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 40%, transparent 70%)',
                                boxShadow: '0 0 80px 30px rgba(0,0,0,0.08)',
                            }}
                            animate={{
                                x: [0, 80, -60, 0],
                                y: [0, 100, -80, 0],
                                scale: [1, 1.3, 0.8, 1.1, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '25%', left: '8%' }}
                        />
                    </div>

                    {/* 3. Animated Camera Background */}
                    <AnimatedCameraBackground opacity={0.1} />

                    {/* 4. Grid Overlay and Decorative Circles */}
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
                    <div
                        className="absolute top-[15%] right-[20%] w-[350px] h-[350px] rounded-full border border-black/5 hidden lg:block"
                        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                    />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] relative z-10 pt-20">
                        <div className="max-w-[900px]">
                            {/* Eyebrow */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                    Professional Photography Services
                                </span>
                            </motion.div>

                            {/* Main Headline */}
                            <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-8">
                                {["Crafting", "Visual", "Stories"].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        className="inline-block mr-4 last:mr-0"
                                        initial={{ opacity: 0, y: 80 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        style={{ fontSize: 'clamp(42px, 9vw, 100px)' }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            {/* Description */}
                            <motion.p
                                className="font-sans text-[18px] md:text-[20px] leading-[1.7] text-black/60 max-w-[600px] mb-10"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                From intimate portraits to grand celebrations, we bring artistry, passion,
                                and technical excellence to every frame we capture.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group relative bg-black text-white px-8 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden text-center"
                                >
                                    <span className="relative z-10">Book a Session</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                </Link>
                                <a
                                    href="#services"
                                    className="group flex items-center justify-center gap-3 px-6 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black border-2 border-black/20 hover:border-black transition-colors"
                                >
                                    <span>Explore Services</span>
                                    <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="mt-16 grid grid-cols-3 gap-8 max-w-[500px]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {[
                                { number: "2000+", label: "Projects" },
                                { number: "500+", label: "Happy Clients" },
                                { number: "7+", label: "Years" }
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="font-display text-[32px] md:text-[40px] font-light text-black leading-none">{stat.number}</p>
                                    <p className="font-sans text-[10px] uppercase tracking-wider text-black/40 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40">Scroll</span>
                        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-black/30 rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 2: SERVICES SHOWCASE
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={servicesRef} id="services" className="py-20 md:py-32 bg-white relative">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">What We Offer</span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-tight mb-4">
                                Our <span className="italic text-black/40">Services</span>
                            </h2>
                            <motion.div
                                className="w-20 h-[2px] bg-black/20 mx-auto"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    className="group relative bg-white border border-black/10 overflow-hidden cursor-pointer"
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        {/* Number Badge */}
                                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                            <span className="font-display text-[18px] font-light text-black">{service.number}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display text-[24px] font-light text-black mb-2">{service.title}</h3>
                                        <p className="font-sans text-[11px] uppercase tracking-wider text-black/40 mb-4">{service.subtitle}</p>
                                        <p className="font-sans text-[14px] text-black/60 leading-relaxed mb-4">{service.description}</p>

                                        {/* Stats */}
                                        <div className="flex gap-6 pt-4 border-t border-black/10">
                                            <div>
                                                <p className="font-display text-[20px] font-light text-black">{service.stats.shoots}</p>
                                                <p className="font-sans text-[9px] uppercase tracking-wider text-black/40">Shoots</p>
                                            </div>
                                            <div>
                                                <p className="font-display text-[20px] font-light text-black">{service.stats.satisfaction}</p>
                                                <p className="font-sans text-[9px] uppercase tracking-wider text-black/40">Satisfaction</p>
                                            </div>
                                        </div>

                                        {/* Expand indicator */}
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/10">
                                            <span className="font-sans text-[11px] uppercase tracking-wider text-black/40">View Details</span>
                                            <div className={`w-8 h-8 rounded-full border border-black/20 flex items-center justify-center transition-transform duration-300 ${activeService === service.id ? 'rotate-180' : ''}`}>
                                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <div
                                        className="overflow-hidden transition-all duration-500"
                                        style={{
                                            maxHeight: activeService === service.id ? '400px' : '0px',
                                            opacity: activeService === service.id ? 1 : 0,
                                        }}
                                    >
                                        <div className="p-6 pt-0 border-t border-black/10">
                                            <p className="font-sans text-[14px] text-black/60 leading-relaxed mb-6">{service.longDescription}</p>
                                            <h4 className="font-sans text-[12px] uppercase tracking-wider text-black/40 mb-3">What's Included</h4>
                                            <div className="grid grid-cols-2 gap-2 mb-6">
                                                {service.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="font-sans text-[12px] text-black/60">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-2 font-sans font-bold text-[11px] uppercase tracking-wider text-black hover:text-black/60 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <span>Book This Service</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 3: PRICING PACKAGES
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={pricingRef} className="py-20 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4 block">Investment</span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-white leading-tight mb-4">
                                Pricing <span className="italic text-white/40">Packages</span>
                            </h2>
                            <p className="font-sans text-[16px] text-white/50 max-w-[500px] mx-auto">
                                Transparent pricing for exceptional quality. Every package can be customized to your needs.
                            </p>
                        </motion.div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.name}
                                    className={`relative p-8 border ${pkg.popular ? 'bg-white text-black border-white' : 'bg-transparent border-white/10'}`}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: index * 0.15 }}
                                    viewport={{ once: true }}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-sans text-[10px] uppercase tracking-wider">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="text-center mb-8">
                                        <h3 className={`font-display text-[28px] font-light mb-2 ${pkg.popular ? 'text-black' : 'text-white'}`}>{pkg.name}</h3>
                                        <p className={`font-sans text-[12px] uppercase tracking-wider mb-4 ${pkg.popular ? 'text-black/40' : 'text-white/40'}`}>{pkg.duration}</p>
                                        <p className={`font-display text-[48px] font-light ${pkg.popular ? 'text-black' : 'text-white'}`}>{pkg.price}</p>
                                        <p className={`font-sans text-[13px] mt-2 ${pkg.popular ? 'text-black/60' : 'text-white/50'}`}>{pkg.description}</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {pkg.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <svg className={`w-4 h-4 ${pkg.popular ? 'text-black' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className={`font-sans text-[13px] ${pkg.popular ? 'text-black/70' : 'text-white/60'}`}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="/contact"
                                        className={`block text-center py-4 font-sans font-bold text-[12px] uppercase tracking-wider transition-all ${pkg.popular
                                            ? 'bg-black text-white hover:bg-black/80'
                                            : 'border border-white/30 text-white hover:bg-white hover:text-black'
                                            }`}
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            className="text-center mt-12 font-sans text-[14px] text-white/40"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Custom packages available for unique requirements. <Link href="/contact" className="underline hover:text-white transition-colors">Contact us</Link> to discuss.
                        </motion.p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 4: OUR PROCESS
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={processRef} className="py-20 md:py-32 bg-gradient-to-b from-[#F5F5F5] to-white relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-[20%] right-[10%] w-64 h-64 border border-black/5 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">How It Works</span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-tight mb-4">
                                Our <span className="italic text-black/40">Process</span>
                            </h2>
                            <motion.div
                                className="w-20 h-[2px] bg-black/20 mx-auto"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>

                        {/* Process Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Consultation", desc: "We discuss your vision, preferences, and requirements to understand exactly what you're looking for.", icon: "💬" },
                                { step: "02", title: "Planning", desc: "Together we plan locations, timing, and creative direction to ensure a smooth shoot day.", icon: "📋" },
                                { step: "03", title: "Capture", desc: "The magic happens! We capture your moments with expertise, creativity, and passion.", icon: "📸" },
                                { step: "04", title: "Delivery", desc: "Receive your beautifully edited images through our premium online gallery.", icon: "✨" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="group relative p-8 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative mb-6">
                                        <span className="font-display text-[72px] font-light text-black/10 leading-none block">
                                            {item.step}
                                        </span>
                                        <span className="absolute top-2 right-0 text-3xl">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <h4 className="font-sans font-bold text-[18px] text-black mb-3">{item.title}</h4>
                                    <p className="font-sans text-[14px] text-black/60 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 5: FAQ
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={faqRef} className="py-20 md:py-32 bg-white relative">
                    <div className="container mx-auto px-6 md:px-10 max-w-[900px]">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">Questions</span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-tight mb-4">
                                Frequently <span className="italic text-black/40">Asked</span>
                            </h2>
                        </motion.div>

                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="border border-black/10"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        className="w-full flex items-center justify-between p-6 text-left"
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    >
                                        <span className="font-sans font-semibold text-[16px] text-black pr-8">{faq.q}</span>
                                        <div className={`w-8 h-8 rounded-full border border-black/20 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div
                                        className="overflow-hidden transition-all duration-300"
                                        style={{
                                            maxHeight: activeFaq === index ? '200px' : '0px',
                                            opacity: activeFaq === index ? 1 : 0,
                                        }}
                                    >
                                        <p className="px-6 pb-6 font-sans text-[15px] text-black/60 leading-relaxed">{faq.a}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 6: CTA
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={ctaRef} className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute w-96 h-96 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                            }}
                            animate={{
                                x: [0, 100, -100, 0],
                                y: [0, -50, 50, 0],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            initial={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[900px] relative z-10">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6 block">Let's Create Together</span>
                            <h2 className="font-display text-[36px] md:text-[52px] lg:text-[64px] font-light text-white leading-[1.1] mb-6">
                                Ready to capture your <span className="italic text-white/40">story?</span>
                            </h2>
                            <p className="font-sans text-[16px] text-white/50 leading-relaxed mb-10 max-w-[500px] mx-auto">
                                Every great photograph begins with a conversation. Let's discuss your vision and create something beautiful together.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link href="/contact" className="group relative bg-white text-black px-10 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden">
                                    <span className="relative z-10">Book a Session</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#eee] to-[#ccc] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                </Link>
                                <a href="tel:+918356953173" className="flex items-center gap-3 font-sans text-[14px] text-white/60 hover:text-white transition-colors">
                                    <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    +91 83569 53173
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
