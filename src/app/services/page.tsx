"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Services Page
 * Comprehensive services showcase with beautiful animations
 */

// Default portfolio images (synced with generated services images)
const defaultPortfolioImages = [
    "/img/services/wedding.png",
    "/img/services/portrait.png",
    "/img/services/corporate.png",
    "/img/services/fashion.png",
    "/img/services/family.png",
    "/img/services/maternity.png",
];

// Service image IDs mapping
const serviceImageIds = [
    'services_wedding',
    'services_portrait',
    'services_corporate',
    'services_fashion',
    'services_family',
    'services_maternity'
];

interface Service {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    image: string;
    features: string[];
    stats: { shoots: string; satisfaction: string; awards: string };
}

// Services data (images will be dynamically assigned)
const getServices = (images: string[]): Service[] => [
    {
        id: 'wedding',
        number: "01",
        title: "Wedding Photography",
        subtitle: "Capturing Your Forever Moments",
        description: "Your wedding day is a once-in-a-lifetime celebration of love. We capture every stolen glance, joyful tear, and heartfelt embrace with artistry and precision.",
        longDescription: "From the nervous excitement of getting ready to the last dance of the night, we document every precious moment of your special day. Our unobtrusive style ensures authentic, emotional photographs that tell your unique love story.",
        image: images[0],
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
        image: images[1],
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
        image: images[2],
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
        image: images[3],
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
        image: images[4],
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
        image: images[5],
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

// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: "Sarah & Michael",
        role: "Wedding Clients",
        text: "Ambient Frames didn't just take photos; they captured the very soul of our wedding. Looking at the album feels like reliving the most magical day of our lives. Pure artistry.",
        image: "/img/services/wedding.png" // Using service image as placeholder or we could find others
    },
    {
        id: 2,
        name: "David Chen",
        role: "CEO, TechFlow",
        text: "The level of professionalism and the quality of the corporate headshots were outstanding. They managed to make our entire team look confident and approachable. Highly recommended.",
        image: "/img/services/corporate.png"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Fashion Designer",
        text: "I possess a very specific vision for my collections, and Ambient Frames exceeded it. Their understanding of lighting and composition is world-class. A true collaborative partner.",
        image: "/img/services/fashion.png"
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
        a: "Delivery times vary by package and season. Weddings typically take 3-4 weeks for the complete gallery, while portrait sessions are often ready within 7-10 days."
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
    const [activeService, setActiveService] = useState<Service | null>(null); // For Modal
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());
    const [serviceImages, setServiceImages] = useState<string[]>(defaultPortfolioImages);

    const heroRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const testimonialsRef = useRef<HTMLElement>(null);
    const processRef = useRef<HTMLElement>(null);
    const faqRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    // Fetch dynamic images from Cloudinary config (matches the newly updated JSON)
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images?section=services');
                if (res.ok) {
                    const data = await res.json();
                    if (data.images) {
                        const newImages = serviceImageIds.map((id, index) =>
                            data.images[id]?.url || defaultPortfolioImages[index]
                        );
                        setServiceImages(newImages);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch service images:', error);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [activeService]);

    // Get services with dynamic images
    const services = getServices(serviceImages);

    useEffect(() => {
        const sections = [
            { ref: heroRef, id: 'hero' },
            { ref: servicesRef, id: 'services' },
            { ref: testimonialsRef, id: 'testimonials' },
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
                    {/* ... (Hero Background content preserved) ... */}
                    {/* 1. Base Gradient Layer (Last Layer) - Blue on Right */}
                    {/* Increased Blue Glow Background - 40% Visibility */}
                    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden hidden lg:block">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)',
                                filter: 'blur(100px)',
                            }}
                            animate={{
                                opacity: [0.6, 1, 0.6],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* 2. Glowing Circles / Orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
                    {/* Animated Circular "Book a Session" Button */}
                    <Link
                        href="/contact"
                        className="absolute top-[20%] right-[15%] w-[220px] h-[220px] rounded-full border-2 border-black/20 hidden lg:flex items-center justify-center group cursor-pointer z-20"
                        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                    >
                        {/* Animated Background Fill */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-blue-600"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 1, 0],
                                opacity: [0, 0.15, 0.15, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.3, 0.7, 1],
                            }}
                        />
                        {/* Hover Background */}
                        <div className="absolute inset-0 rounded-full bg-black scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                        {/* Text */}
                        <span className="relative z-10 font-sans font-bold text-[13px] tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                            Book a Session
                        </span>
                        {/* Pulse Ring Animation */}
                        <motion.div
                            className="absolute inset-[-10px] rounded-full border border-blue-500/30"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                    </Link>

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

                            {/* CTA Button - Only Explore Services (Book Session moved to circle) */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <a
                                    href="#services"
                                    className="group flex items-center justify-center gap-3 px-8 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black border-2 border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    <span>Explore Services</span>
                                    <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </a>
                                {/* Mobile Only: Book a Session Link */}
                                <Link
                                    href="/contact"
                                    className="lg:hidden group relative bg-black text-white px-8 py-4 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden text-center"
                                >
                                    <span className="relative z-10">Book a Session</span>
                                </Link>
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
                    SECTION 2: SERVICES SHOWCASE (With Modal Interaction)
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={servicesRef} id="services" className="py-20 md:py-32 bg-white relative overflow-hidden">
                    {/* Animated Blue Glow Background */}
                    <motion.div
                        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -30, 50, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
                            filter: 'blur(100px)',
                        }}
                        animate={{
                            x: [0, -40, 60, 0],
                            y: [0, 40, -20, 0],
                            scale: [1, 0.9, 1.15, 1],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] relative z-10">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    className="group relative bg-white border border-black/10 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-500"
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActiveService(service)}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center z-10">
                                            <span className="font-display text-[18px] font-light text-black">{service.number}</span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 font-sans text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            View Details
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-display text-[26px] font-light text-black mb-2 group-hover:text-black/70 transition-colors">{service.title}</h3>
                                        <p className="font-sans text-[11px] uppercase tracking-wider text-black/40 mb-4">{service.subtitle}</p>
                                        <p className="font-sans text-[14px] text-black/60 leading-relaxed line-clamp-2">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 3: TESTIMONIALS (NEW SECTION)
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={testimonialsRef} className="py-24 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1400px] relative z-10">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-black/50 mb-4 block">Client Love</span>
                            <h2 className="font-display text-[42px] md:text-[56px] font-light text-black leading-tight">
                                Cherished <span className="italic text-black/40">Words</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.id}
                                    className="bg-white p-10 border border-black/5 shadow-sm relative group hover:-translate-y-2 transition-transform duration-500"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="absolute -top-4 left-10 text-[80px] leading-none font-serif text-black/5 group-hover:text-black/10 transition-colors">"</div>
                                    <p className="font-serif text-[18px] text-black/70 italic leading-relaxed mb-8 relative z-10">
                                        {t.text}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-100">
                                            {/* Using service images as generic avatar placeholders for now or letters */}
                                            <div className="w-full h-full bg-black/5 flex items-center justify-center text-black/40 font-display text-xl">
                                                {t.name[0]}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-[14px] text-black">{t.name}</h4>
                                            <p className="font-sans text-[10px] uppercase tracking-wider text-black/40">{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 4: OUR PROCESS (Dark Mode)
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={processRef} className="py-24 md:py-32 bg-[#050505] text-white relative overflow-hidden">
                    {/* ... Process content preserved ... */}
                    {/* Animated Background Mesh */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-blue-900/40 to-transparent blur-[120px]" />
                        <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-purple-900/40 to-transparent blur-[120px]" />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-[1200px] relative z-10">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-24"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4 block">How It Works</span>
                            <h2 className="font-display text-[48px] md:text-[64px] font-light text-white leading-tight mb-6">
                                Our Creative <span className="italic text-white/30">Journey</span>
                            </h2>
                            <p className="font-sans text-[16px] text-white/50 max-w-[500px] mx-auto leading-relaxed">
                                A seamless experience designed to capture your unique story with precision and care.
                            </p>
                        </motion.div>

                        {/* Process Steps - Horizontal Flow */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="absolute top-12 left-0 w-full h-[1px] bg-white/10 hidden md:block">
                                <motion.div
                                    className="h-full bg-white/30"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    viewport={{ once: true }}
                                />
                            </div>

                            {[
                                {
                                    step: "01", title: "Connect", desc: "Share your vision. We listen to understand exactly what you need.", icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    )
                                },
                                {
                                    step: "02", title: "Plan", desc: "We strategize locations, lighting, and mood boards for the perfect shoot.", icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    )
                                },
                                {
                                    step: "03", title: "Create", desc: "The magic happens. We guide you through poses and capture raw emotion.", icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    )
                                },
                                {
                                    step: "04", title: "Deliver", desc: "Receive your curated gallery of high-resolution, edited memories.", icon: (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    )
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="relative group pt-12 md:pt-16"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Node on Line */}
                                    <div className="absolute top-12 left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#050505] border border-white/30 rounded-full z-10 group-hover:border-white group-hover:scale-125 transition-all duration-300 hidden md:block" />

                                    <div className="p-8 bg-white/5 border border-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="font-display text-[42px] leading-none text-white/10 font-light group-hover:text-white/20 transition-colors">
                                                {item.step}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/20 transition-all">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <h4 className="font-display text-[20px] text-white mb-3 tracking-wide">{item.title}</h4>
                                        <p className="font-sans text-[13px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    SECTION 5: FAQ
                ═══════════════════════════════════════════════════════════════ */}
                <section ref={faqRef} className="py-20 md:py-32 bg-white relative">
                    {/* ... FAQ content preserved ... */}
                    <div className="container mx-auto px-6 md:px-10 max-w-[900px]">
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
                    {/* ... CTA content preserved ... */}
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

            {/* ═══════════════════════════════════════════════════════════════
                 SERVICE DETAIL MODAL
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {activeService && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Modal Content */}
                        <motion.div
                            className="bg-white w-full max-w-[1000px] h-[90vh] md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Close Button from Step 517 */}
                            <button
                                onClick={() => setActiveService(null)}
                                className="absolute top-5 right-5 z-50 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 border border-black/10"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Left: Image */}
                            <div className="w-full md:w-[45%] h-[30vh] md:h-auto relative bg-black">
                                <Image
                                    src={activeService.image}
                                    alt={activeService.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white md:hidden">
                                    <h3 className="font-display text-2xl">{activeService.title}</h3>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-[55%] p-6 md:p-12 overflow-y-auto bg-white custom-scrollbar">
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-2 block">{activeService.subtitle}</span>
                                <h2 className="font-display text-[32px] md:text-[42px] leading-[1.1] text-black mb-6 hidden md:block">{activeService.title}</h2>

                                <p className="font-serif text-[18px] leading-relaxed text-black/70 mb-8">
                                    {activeService.longDescription}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-black/10 mb-8">
                                    <div className="text-center">
                                        <span className="block font-display text-2xl text-black">{activeService.stats.shoots}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-black/40">Shoots</span>
                                    </div>
                                    <div className="text-center border-l border-black/10">
                                        <span className="block font-display text-2xl text-black">{activeService.stats.satisfaction}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-black/40">Quality</span>
                                    </div>
                                    <div className="text-center border-l border-black/10">
                                        <span className="block font-display text-2xl text-black">{activeService.stats.awards}</span>
                                        <span className="text-[9px] uppercase tracking-wider text-black/40">Awards</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <h4 className="font-sans text-[12px] uppercase font-bold tracking-wider text-black mb-4">What's Included</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                                    {activeService.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-black/40 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="font-sans text-[13px] text-black/70">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action */}
                                <Link
                                    href="/contact"
                                    className="block w-full bg-black text-white text-center py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] hover:bg-black/90 transition-colors"
                                >
                                    Book This Service
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
