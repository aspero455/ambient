"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Blog Page - "The Journal"
 * 
 * A high-end, editorial blog page that matches the Ambient Frames aesthetic.
 */

// Blog image IDs
const blogImageIds = ['blog_1', 'blog_2', 'blog_3', 'blog_4', 'blog_5', 'blog_6'];

// Default blog post data
const defaultBlogPosts = [
    {
        id: 1,
        title: "The Art of Natural Light in Portraiture",
        excerpt: "Discover how to harness the sun's softest hours to create hauntingly beautiful portraits.",
        category: "Tutorial",
        date: "Jan 12, 2024",
        readTime: "6 min read",
        image: "/img/524877796_18281941537284138_7194601866269685029_n..webp",
        featured: true,
        author: "Harsh Patel",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">Lighting is not just about exposure; it's about feeling. In this extensive guide, we explore the subtle nuances of natural light and how it shapes the emotional narrative of a portrait.</p>
            <h3 className="text-xl font-bold mb-4 font-sans uppercase tracking-widest">The Golden Hour</h3>
            <p className="mb-6 text-black/70">The hour after sunrise and the hour before sunset provide a quality of light that is unmatched. The low angle of the sun creates long, dramatic shadows and a warm, gold hue that renders skin tones beautifully.</p>
            <h3 className="text-xl font-bold mb-4 font-sans uppercase tracking-widest">Window Light</h3>
            <p className="mb-6 text-black/70">North-facing windows are a photographer's best friend. They offer soft, diffused light that wraps around the subject, creating a painterly effect reminiscent of the Old Masters.</p>
            <blockquote className="border-l-2 border-black pl-6 py-2 my-8 font-serif text-2xl italic">"Light makes photography. Embrace light. Admire it. Love it. But above all, know light."</blockquote>
        `
    },
    {
        id: 2,
        title: "Capturing the Unseen: Wedding Moments",
        excerpt: "Beyond the posed shots lie the true essence of a wedding.",
        category: "Inside Look",
        date: "Jan 08, 2024",
        readTime: "8 min read",
        image: "/img/528577300_18282637933284138_6024131309224852219_n..webp",
        featured: false,
        author: "Sarah Jenkins",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">Weddings are a whirlwind of emotions. While formal portraits are necessary, the soul of the event hides in the in-between moments.</p>
            <p className="mb-6 text-black/70">A stolen glance, a tear wiped away, a child sleeping amidst the chaos—these are the images that families treasure for generations. Our approach is 80% documentary, 20% directed.</p>
        `
    },
    {
        id: 3,
        title: "Gear Talk: Why We Still Choose Leica",
        excerpt: "Technical specifications are just part of the story.",
        category: "Equipment",
        date: "Jan 05, 2024",
        readTime: "10 min read",
        image: "/img/528631979_18282710314284138_2035724994247197640_n..webp",
        featured: false,
        author: "Tech Team",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">In an era of computational photography and AI, why do we stick to a manual rangefinder? The answer lies in the process.</p>
            <p className="mb-6 text-black/70">It slows you down. It forces you to think before you click. The glass rendering is unique—micro-contrast that gives a 3D pop to images that digital sharpness simply cannot emulate.</p>
        `
    },
    {
        id: 4,
        title: "The Mumbai Color Palette: A Visual Guide",
        excerpt: "How the vibrant yet cinematic colors of Mumbai influence our approach.",
        category: "Perspective",
        date: "Dec 28, 2023",
        readTime: "5 min read",
        image: "/img/529672310_18282710362284138_7894353990389373612_n..webp",
        featured: false,
        author: "Creative Director",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">Mumbai is not just a city; it's a sensory overload. Visually, it's a clash of teal ocean, warm sunsets, and the grays of urban decay.</p>
            <p className="mb-6 text-black/70">We emulate this in our color grading. We push for warmer highlights and cooler shadows, creating a 'teal and orange' look that feels cinematic yet grounded in the reality of the city.</p>
        `
    },
    {
        id: 5,
        title: "Directing Models for Emotional Authenticity",
        excerpt: "Moving beyond technical perfection.",
        category: "Tutorial",
        date: "Dec 20, 2023",
        readTime: "12 min read",
        image: "/img/530361918_18283380247284138_133094580325100578_n..webp",
        featured: false,
        author: "Harsh Patel",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">A model is not a prop. To get a genuine expression, you need to build a connection.</p>
            <p className="mb-6 text-black/70">Talk to them. Play music. Create a scenario. Don't just say 'smile'. Say 'think about a secret you've never told anyone'. The eyes will change, and that's when you click.</p>
        `
    },
    {
        id: 6,
        title: "Black & White: The Soul of Cinematography",
        excerpt: "Why monochrome photography continues to dominate.",
        category: "Analysis",
        date: "Dec 15, 2023",
        readTime: "7 min read",
        image: "/img/531822595_18283640836284138_2008306935621772497_n..webp",
        featured: false,
        author: "Editor's Desk",
        content: `
            <p className="mb-6 font-serif text-lg leading-relaxed">Color distracts. Black and white interprets.</p>
            <p className="mb-6 text-black/70">When you remove color, you are left with light, texture, and emotion. It forces the viewer to focus on the composition and the subject's expression.</p>
        `
    }
];

const categories = ["All Stories", "Tutorial", "Inside Look", "Equipment", "Perspective", "Analysis"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All Stories");
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);

    // Lock Body Scroll when Modal is Open
    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedPost]);

    // Fetch dynamic images from Cloudinary config
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images?section=blog');
                if (res.ok) {
                    const data = await res.json();
                    if (data.images) {
                        const updatedPosts = defaultBlogPosts.map((post, index) => {
                            const imageId = blogImageIds[index];
                            const cloudinaryUrl = data.images[imageId]?.url;
                            return cloudinaryUrl ? { ...post, image: cloudinaryUrl } : post;
                        });
                        setBlogPosts(updatedPosts);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch blog images:', error);
            }
        };
        fetchImages();
    }, []);

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

    const filteredPosts = activeCategory === "All Stories"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="flex-grow">
                {/* ═══════════════════════════════════════════════════════════════
                    HERO: SERVICES STYLE
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[70vh] bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5] overflow-hidden flex items-center"
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

                    {/* Red Floating Orbs (Subtle Background) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)',
                                filter: 'blur(100px)',
                            }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Camera Icons Background */}
                    <AnimatedCameraBackground opacity={0.1} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10 pt-20">
                        <div className="max-w-[900px]">
                            {/* Eyebrow */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black/60">
                                    The Journal
                                </span>
                            </motion.div>

                            {/* Main Headline */}
                            <h1 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-black mb-10">
                                {["Stories,", "Insights", "&", "Perspectives"].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        className="inline-block mr-4 last:mr-0"
                                        initial={{ opacity: 0, y: 80 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        style={{ fontSize: 'clamp(42px, 8vw, 90px)' }}
                                    >
                                        {word === "&" ? <span className="italic text-black/20 font-light">{word}</span> : word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                className="font-sans text-[18px] md:text-[20px] leading-[1.7] text-black/60 max-w-[550px]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                Exploring the intersection of technical excellence and authentic human storytelling in contemporary photography.
                            </motion.p>
                        </div>

                        {/* Creative "Book a Session" Rotating Aperture Animation */}
                        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 hidden lg:block z-10">
                            <Link href="/contact" className="group relative block w-[280px] h-[280px]">
                                {/* Outer Rotating Ring with Text */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <defs>
                                            <path id="textPath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                                        </defs>
                                        <text fontSize="18" fontWeight="bold" letterSpacing="4" fill="currentColor" className="text-black/20 uppercase font-sans">
                                            <textPath href="#textPath" startOffset="0%">
                                                • Book a Session • Capture the Moment • Create Memories
                                            </textPath>
                                        </text>
                                    </svg>
                                </motion.div>

                                {/* Inner Aperture / Button */}
                                <div className="absolute inset-[20%] rounded-full border border-black/10 bg-white flex items-center justify-center shadow-lg group-hover:scale-90 transition-transform duration-500 ease-out">
                                    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative font-display text-2xl text-black group-hover:text-white transition-colors duration-300 z-10">
                                            Book<br />Now
                                        </span>
                                        {/* Aperture Blades Decoration */}
                                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="absolute top-1/2 left-1/2 w-full h-px bg-black origin-left" style={{ transform: `rotate(${i * 60}deg) translateX(10%)` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    FILTER BAR
                ═══════════════════════════════════════════════════════════════ */}
                <section className="sticky top-[60px] md:top-[80px] z-30 bg-white border-b border-black/5">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`font-sans text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all relative py-2 ${activeCategory === cat ? 'text-black' : 'text-black/30 hover:text-black'
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    BLOG GRID
                ═══════════════════════════════════════════════════════════════ */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-sm">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-black/40 text-[11px] font-medium uppercase tracking-wider">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-black/20 rounded-full" />
                                                <span>{post.readTime}</span>
                                            </div>

                                            <h3 className="font-display text-[24px] md:text-[28px] text-black leading-tight group-hover:text-black/60 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="font-sans text-[15px] text-black/50 leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="pt-2">
                                                <span className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-black group-hover:gap-5 transition-all">
                                                    Read Story
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    NEWSLETTER: THE JOURNAL BRIEF
                ═══════════════════════════════════════════════════════════════ */}
                <section className="bg-black py-24 md:py-40 overflow-hidden relative">
                    <AnimatedCameraBackground opacity={0.15} />

                    <div className="container mx-auto px-6 md:px-10 max-w-[1440px] relative z-10 text-center">
                        <div className="max-w-[700px] mx-auto">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8 block"
                            >
                                Stay Inspired
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display font-light text-[40px] md:text-[64px] text-white leading-tight mb-10 tracking-tight"
                            >
                                Join our monthly <br />
                                <span className="italic text-white/30">Visual Journal</span>
                            </motion.h2>

                            <p className="font-sans text-[16px] text-white/50 mb-12 max-w-[450px] mx-auto leading-relaxed">
                                Curated insights on clinical photography, cinematic storytelling, and studio updates delivered once a month.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-white font-sans text-[14px] outline-none focus:border-white/30 transition-colors"
                                />
                                <button className="bg-white text-black px-8 py-4 font-sans font-bold text-[11px] uppercase tracking-widest hover:bg-white/90 transition-all">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* ═══════════════════════════════════════════════════════════════
                 BLOG DETAIL MODAL (Full Screen Preview)
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* FIXED CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-black/5"
                        >
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col lg:flex-row w-full h-full">

                            {/* LEFT: IMMERSIVE IMAGE */}
                            <div className="relative w-full lg:w-[50%] h-[40vh] lg:h-full bg-gray-100">
                                <motion.div className="absolute inset-0 z-10 bg-black/10" />
                                <Image
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* RIGHT: CONTENT SCROLL */}
                            <div className="w-full lg:w-[50%] h-[60vh] lg:h-full overflow-y-auto bg-white custom-scrollbar">
                                <div className="p-8 md:p-20 pt-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                                {selectedPost.category}
                                            </span>
                                            <span className="text-black/40 text-[12px] uppercase tracking-wider font-medium">
                                                {selectedPost.readTime}
                                            </span>
                                        </div>

                                        <h2 className="font-display text-[42px] md:text-[56px] leading-[1.1] text-black mb-8">
                                            {selectedPost.title}
                                        </h2>

                                        <div className="flex items-center gap-4 border-b border-black/10 pb-8 mb-12">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                                                {/* Placeholder Avatar */}
                                                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-sans text-[12px] font-bold uppercase tracking-wider text-black">
                                                    {selectedPost.author || "Ambient Team"}
                                                </p>
                                                <p className="font-sans text-[11px] text-black/40 uppercase tracking-widest">
                                                    {selectedPost.date}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:text-black/70 max-w-none"
                                        dangerouslySetInnerHTML={{ __html: selectedPost.content || `<p>${selectedPost.excerpt}</p>` }}
                                    />

                                    {/* Footer / Share / Next Article */}
                                    <div className="mt-20 pt-10 border-t border-black/10 flex justify-between items-center">
                                        <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-black/40">
                                            Share this article
                                        </span>
                                        <div className="flex gap-4">
                                            {['Twitter', 'Facebook', 'LinkedIn'].map(social => (
                                                <button key={social} className="text-black/60 hover:text-black font-sans text-[11px] uppercase tracking-wider transition-colors">
                                                    {social}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
