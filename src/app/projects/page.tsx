"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

/**
 * Projects Page
 * Features the restored "Our Work" hero with floating polaroids,
 * followed by the new immersive grid and detailed case studies.
 */

// Default portfolio images
const defaultPortfolioImages = [
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

// Project image IDs mapping
const projectImageIds = [
    'project_1', 'project_2', 'project_3', 'project_4', 'project_5', 'project_6',
    'project_7', 'project_8', 'project_9', 'project_10', 'project_11', 'project_12'
];

interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    size: "large" | "medium" | "small";
    story: string;
    process: string;
    details: {
        client: string;
        service: string;
        deliverables: string;
    };
}

import { Counter } from '@/components/ui/Counter';
import { MagneticButton } from '@/components/ui/MagneticButton';

// All projects with richly detailed content
const getProjects = (images: string[]): Project[] => [
    {
        id: 1,
        title: "The Royal Wedding",
        category: "Wedding",
        location: "Mumbai",
        year: "2024",
        image: images[0],
        size: "large",
        story: "Set against the opulent backdrop of the Taj Palace, this wedding was a symphony of tradition and modernity. The couple, Priya and Rahul, desired a visual narrative that honored their deep cultural roots while embracing a contemporary, cinematic aesthetic. The vision was to capture not just the rituals, but the fleeting, unscripted moments of pure emotion—the tear in a father's eye, the shared laughter between sisters, and the quiet intimacy amidst the grandeur.",
        process: "Our team of four operated with surgical precision over the three-day celebration. We employed a 'fly on the wall' documentary approach for the ceremonies, using long lenses to remain unobtrusive. For the couple portraits, we switched to dramatic off-camera lighting to create magazine-worthy editorials. Post-processing focused on rich, warm tones to reflect the royal gold and crimson palette of the decor.",
        details: { client: "Priya & Rahul", service: "Full Wedding Coverage", deliverables: "300+ Edited Photos, Cinematic Film, Luxury Album" }
    },
    {
        id: 2,
        title: "Corporate Summit",
        category: "Corporate",
        location: "Bangalore",
        year: "2024",
        image: images[3],
        size: "small",
        story: "The Annual TechFlow Summit brings together the brightest minds in AI and robotics. The organizers needed imagery that conveyed innovation, scale, and dynamic interaction. They wanted to move away from stiff corporate headshots and capture the vibrant energy of networking and collaboration that defines their brand.",
        process: "We utilized high-shutter speeds and prime lenses to capture the fast-paced energy of the event in low light conditions. The challenge was to make a large conference hall feel intimate and engaging. We focused on dynamic angles, capturing speakers in passionate mid-gesture and attendees deep in conversation, creating a visual story of connection and progress.",
        details: { client: "TechFlow Inc", service: "Event Photography", deliverables: "Event Highlights, Social Media edits, Speaker Portraits" }
    },
    {
        id: 3,
        title: "Fashion Forward",
        category: "Fashion",
        location: "Delhi",
        year: "2024",
        image: images[5],
        size: "medium",
        story: "For Vogue India's 'Modern Heritage' spread, the concept was to juxtapose brutalist architecture with fluid, traditional textiles. The goal was to create a sharp visual contrast that creates tension and intrigue. We aimed for a mood that was edgy, stark, yet incredibly elegant.",
        process: "Collaborating intimately with the stylist and art director, we scouted concrete structures that would serve as a canvas for the vibrant fabrics. We used harsh, direct sunlight to create strong shadows and geometric compositions. The direction for the model was to be strong and statuesque, mirroring the architecture around her.",
        details: { client: "Vogue India", service: "Editorial Shoot", deliverables: "12-Page Spread, Cover Option, Digital Assets" }
    },
    {
        id: 4,
        title: "Family Legacy",
        category: "Portrait",
        location: "Pune",
        year: "2023",
        image: images[8],
        size: "small",
        story: "The Kapoor family wanted to document four generations coming together for a rare reunion at their ancestral home. The brief was simple: timeless, nostalgic, and authentic. They wanted images that would hang on their walls for decades, serving as a visual anchor for their family history.",
        process: "We opted for a purely natural light setup, utilizing the soft, diffused morning light streaming through the courtyard. We guided the family into loose, natural groupings rather than rigid poses, encouraging them to interact, talk, and laugh. This allowed us to capture genuine expressions and the subtle, tender dynamics between the generations.",
        details: { client: "The Kapoor Family", service: "Family Portrait Session", deliverables: "Framed Fine Art Prints, Digital Archive" }
    },
    {
        id: 5,
        title: "New Beginnings",
        category: "Maternity",
        location: "Goa",
        year: "2024",
        image: images[10],
        size: "large",
        story: "Sarah and Mike wanted to celebrate the anticipation of their first child with a shoot that felt peaceful and connected to nature. The concept was 'Ethereal Dawn'—capturing the quiet, sacred moments of pregnancy against the vastness of the ocean.",
        process: "We shot exclusively during the golden hour at a secluded beach. Using a shallow depth of field, we isolated the couple from the background, turning the ocean into a soft, painting-like wash of blues and golds. We directed them to focus on each other and the baby, creating a bubble of intimacy that felt private and profound.",
        details: { client: "Sarah & Mike", service: "Maternity Session", deliverables: "30 Edited High-Res Photos, Online Gallery" }
    },
    {
        id: 6,
        title: "Luxury Launch",
        category: "Corporate",
        location: "Mumbai",
        year: "2024",
        image: images[1],
        size: "medium",
        story: "Luxe Co needed to unveil their new diamond line with an event that dripped with sophistication. The photography needed to be as premium as the jewelry itself—sharp, high-contrast, and glamorous. Every image had to reinforce the exclusivity of the brand.",
        process: "We treated the event coverage almost like a product shoot. We brought in portable studio lighting to ensure the jewelry sparkled in every shot, even in the dim ambient light of the venue. We balanced candid social shots of VIP guests with meticulous detail shots of the product displays, ensuring a comprehensive coverage of the luxury experience.",
        details: { client: "Luxe Co", service: "Launch Event Coverage", deliverables: "Product Shots, Press Release Images, Social Media Reels" }
    },
    {
        id: 7,
        title: "Intimate Celebration",
        category: "Wedding",
        location: "Maldives",
        year: "2023",
        image: images[2],
        size: "small",
        story: "Amit and Neha chose a private island for their vows, focusing on intimacy over spectacle. With only 20 guests, the atmosphere was incredibly personal. Our task was to capture the romance of the setting and the deep emotional connection of the small group without interrupting the flow.",
        process: "In such a small setting, discretion is key. We shot predominantly with silent shutters and long focal lengths. The changing tropical light provided a stunning array of colors, which we optimized for in-camera to capture the vibrant turquoises and sunset oranges. We focused heavily on the raw, unposed reactions during the vows.",
        details: { client: "Amit & Neha", service: "Destination Wedding", deliverables: "Wedding Album, Highlight Reel, curated Prints" }
    },
    {
        id: 8,
        title: "CEO Portraits",
        category: "Portrait",
        location: "Hyderabad",
        year: "2024",
        image: images[4],
        size: "medium",
        story: "The CEO of Innovate Corp needed a visual rebrand. He wanted to move away from the 'stiff suit' stereotype to a more modern, approachable, visionary leader persona. The goal was to create portraits that looked authoritative yet inviting.",
        process: "We chose a modern architectural location with glass and steel lines to reflect the tech industry. We used a three-light setup to sculpt the face and separate the subject from the background, creating a polished, high-end commercial look. We coached him through expressions that conveyed confidence, warmth, and focus.",
        details: { client: "Innovate Corp", service: "Executive Headshots", deliverables: "Digital Profiles, LinkedIn Header, Press Kit" }
    },
    {
        id: 9,
        title: "Monsoon Magic",
        category: "Fashion",
        location: "Kerala",
        year: "2023",
        image: images[6],
        size: "large",
        story: "FabIndia's monsoon collection required a campaign that celebrated the romance of the rains. The concept 'Windswept' aimed to capture the movement of the fabrics in the wind and the lush, saturated greens of the Kerala backwaters.",
        process: "Shooting in the rain presents unique challenges. We protected our gear with custom housings and embraced the weather rather than fighting it. We used slower shutter speeds to blur the falling rain, turning it into a texture rather than a distraction. The soft, overcast light acted as a giant softbox, providing beautifully even illumination.",
        details: { client: "FabIndia", service: "Campaign Shoot", deliverables: "Print Campaign Images, Lookbook, Digital Billboards" }
    },
    {
        id: 10,
        title: "Baby Steps",
        category: "Maternity",
        location: "Mumbai",
        year: "2024",
        image: images[11],
        size: "small",
        story: "The Sharma family wanted to freeze time during the first two weeks of their newborn's life. They requested a 'lifestyle' approach—capturing the baby in their natural home environment rather than in a studio with props.",
        process: "Working with newborns requires immense patience and calm. We followed the baby's schedule, taking breaks for feeding and soothing. We used natural window light to keep the mood soft and organic. The focus was on the tiny details—the fingers, the toes, the eyelashes—and the tender interactions between the parents and their new miracle.",
        details: { client: "The Sharmas", service: "In-Home Newborn Session", deliverables: "Birth Announcement Photos, Memory Box" }
    },
    {
        id: 11,
        title: "Heritage Wedding",
        category: "Wedding",
        location: "Chennai",
        year: "2023",
        image: images[7],
        size: "medium",
        story: "Karthik and Ananya's wedding was a vibrant tapestry of Tamil traditions. From the Kanjeevaram sarees to the intricate floral decorations, color was the protagonist. They wanted photos that felt alive, celebratory, and culturally authentic.",
        process: "To do justice to the vibrant colors, we paid careful attention to white balance and exposure. We used a mix of wide-angle shots to capture the chaos and energy of the procession, and macro lenses for the jewelry and ritual details. We positioned ourselves to capture the perfect symmetry of the mandap interactions.",
        details: { client: "Karthik & Ananya", service: "Traditional Wedding", deliverables: "Traditional Album, Coffee Table Book" }
    },
    {
        id: 12,
        title: "Startup Culture",
        category: "Corporate",
        location: "Bangalore",
        year: "2024",
        image: images[9],
        size: "small",
        story: "NextGen Tech is a startup defined by its flat hierarchy and collaborative spirit. They needed a library of images for their careers page that showed 'real people doing real work', avoiding all stock photography clichés.",
        process: "We spent a full day embedded in their office, becoming part of the furniture. We photographed stand-up meetings, lunch breaks, and brainstorming sessions. We looked for genuine smiles and moments of breakthrough. The editing style was kept bright, airy, and clean to reflect their transparent modern culture.",
        details: { client: "NextGen Tech", service: "Culture & Branding Shoot", deliverables: "Website Assets, Recruitment Deck Images" }
    },
];

const categories = ["All", "Wedding", "Portrait", "Corporate", "Fashion", "Maternity"];

const ProjectCard = ({ project, index, onClick }: { project: Project, index: number, onClick: (p: Project) => void }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for internal image
    const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative cursor-pointer block"
            onClick={() => onClick(project)}
            whileHover={{ scale: 1.02, rotate: 1, zIndex: 10 }} // 3D Tilt hint
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <motion.div style={{ y, scale: 1.1 }} className="relative w-full h-full">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Minimalist Overlay with Staggered Text */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="font-sans text-[10px] uppercase tracking-widest text-white/80 mb-2"
                    >
                        {project.category}
                    </motion.span>
                    <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-[32px] md:text-[40px] leading-none text-white"
                    >
                        {project.title}
                    </motion.h3>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [scrollY, setScrollY] = useState(0);

    // Fetch projects from API
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProjects(data);
            })
            .catch(err => console.error("Failed to fetch projects", err));
    }, []);

    // Scroll listener for parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    // Hide body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main>
                {/* ═══════════════════════════════════════════════════════════════
                    HERO - "OUR WORK" FLOATING POLAROIDS STYLE
                ═══════════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white"
                >
                    {/* 1. Animated Background Grid & Cameras */}
                    <div className="absolute inset-0 z-0 opacity-50">
                        <AnimatedCameraBackground />
                    </div>

                    {/* 2. Red Glowing Orbs (Breathing Animation) */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-40"
                            style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(220, 38, 38, 0.1) 60%, transparent 80%)' }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-[60%] -right-[5%] w-[400px] h-[400px] rounded-full blur-[80px] opacity-30"
                            style={{ background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0.1) 60%, transparent 80%)' }}
                            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                        <motion.div
                            className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full blur-[60px] opacity-30"
                            style={{ background: 'radial-gradient(circle, rgba(185, 28, 28, 0.4) 0%, rgba(185, 28, 28, 0.1) 60%, transparent 80%)' }}
                            animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />
                    </div>

                    {/* 3. Floating Polaroids (Parallax Scroll) */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -10 }}
                        animate={{ opacity: 1, x: 0, rotate: -6 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute left-[5%] md:left-[10%] top-[20%] w-[180px] md:w-[280px] z-10 hidden md:block"
                        style={{
                            transform: `translateY(${scrollY * -0.2}px) rotate(-6deg)`,
                        }}
                    >
                        <div className="bg-white p-3 pb-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <Image
                                    src={projects[0]?.image || defaultPortfolioImages[0]}
                                    alt="Featured Work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="font-serif text-[12px] text-gray-400 mt-2 text-center italic">Editorial '24</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100, rotate: 10 }}
                        animate={{ opacity: 1, x: 0, rotate: 6 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="absolute right-[5%] md:right-[10%] bottom-[20%] w-[180px] md:w-[280px] z-10 hidden md:block"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px) rotate(6deg)`,
                        }}
                    >
                        <div className="bg-white p-3 pb-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <Image
                                    src={projects[5]?.image || defaultPortfolioImages[5]}
                                    alt="Featured Work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="font-serif text-[12px] text-gray-400 mt-2 text-center italic">Portraits</p>
                        </div>
                    </motion.div>

                    {/* 4. Central Content (Staggered Entry) */}
                    <div className="relative z-20 text-center max-w-4xl px-6 mt-[-50px]">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block border-t border-b border-black/10 py-2 px-6 mb-8 font-sans text-[11px] uppercase tracking-[0.3em] text-black/40"
                        >
                            Portfolio
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-display font-light tracking-[-0.03em] text-[80px] md:text-[140px] leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black via-black to-red-400"
                        >
                            {'Our Work'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    className="inline-block" // Ensure inline-block for transform
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="font-sans text-[16px] md:text-[20px] leading-relaxed text-black/50 max-w-xl mx-auto"
                        >
                            A curated selection of moments we've had the privilege to capture, showcasing artistry and emotion in every frame.
                        </motion.p>
                    </div>

                    {/* 5. Stats Cards - Floating (Spring Entry + Counters) */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: "spring", stiffness: 100 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-[90%] md:w-auto"
                    >
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 md:p-8 flex items-center justify-between gap-8 md:gap-16 border border-black/5 hover:scale-105 transition-transform duration-300">
                            <div className="text-center px-4">
                                <span className="block font-display text-[32px] md:text-[40px] leading-none mb-1">
                                    <Counter from={0} to={200} />+
                                </span>
                                <span className="block font-sans text-[10px] uppercase font-bold text-black/30">Projects</span>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center px-4">
                                <span className="block font-display text-[32px] md:text-[40px] leading-none mb-1">
                                    <Counter from={0} to={7} />
                                </span>
                                <span className="block font-sans text-[10px] uppercase font-bold text-black/30">Years</span>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center px-4">
                                <span className="block font-display text-[32px] md:text-[40px] leading-none mb-1">
                                    <Counter from={0} to={15} />
                                </span>
                                <span className="block font-sans text-[10px] uppercase font-bold text-black/30">Awards</span>
                            </div>

                            {/* Latest Upload Mini Badge */}
                            <div className="hidden md:flex items-center gap-4 pl-8 border-l border-black/5">
                                <div className="text-right">
                                    <span className="block font-sans text-[9px] uppercase font-bold text-black/30 mb-1">Latest Upload</span>
                                    <span className="block font-serif text-[14px] italic">The Royal Wedding</span>
                                </div>
                                <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-gray-100 border border-white shadow-sm">
                                    <Image src={projects[0]?.image || defaultPortfolioImages[0]} alt="Latest" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    FILTER BAR (Magnetic)
                ═══════════════════════════════════════════════════════════════ */}
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/5 py-4">
                    <div className="container mx-auto px-6 md:px-10 flex overflow-x-auto no-scrollbar justify-center gap-8">
                        {categories.map((cat) => (
                            <MagneticButton key={cat}>
                                <button
                                    onClick={() => setActiveFilter(cat)}
                                    className={`whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.2em] transition-colors relative pb-2 px-2 ${activeFilter === cat ? 'text-black font-bold' : 'text-black/40 hover:text-black'
                                        }`}
                                >
                                    {cat}
                                    {activeFilter === cat && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                        />
                                    )}
                                </button>
                            </MagneticButton>
                        ))}
                    </div>
                </div>                {/* ═══════════════════════════════════════════════════════════════
                    PROJECTS TITLE
                ═══════════════════════════════════════════════════════════════ */}
                <section className="pt-24 pb-8 bg-white relative z-10">
                    <div className="container mx-auto px-4 md:px-10 max-w-[1500px] flex justify-between items-center relative">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-[24px] md:text-[48px] text-black leading-none uppercase"
                        >
                            Creative <span className="text-black/20">Projects</span>
                        </motion.h2>

                        {/* Unique Rotating Stamp Animation to fill space */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="hidden md:flex items-center justify-center relative w-32 h-32"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full text-black/20">
                                    <defs>
                                        <path id="circle-path-stamp" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="11" fontWeight="bold" letterSpacing="2">
                                        <textPath href="#circle-path-stamp" className="fill-current uppercase">
                                            Ambient Frames • Curated Portfolio •
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                    PROJECTS STAGGERED GRID (MATCHING SKETCH)
                ═══════════════════════════════════════════════════════════════ */}
                <section className="pb-32 bg-white min-h-screen relative overflow-hidden">
                    {/* Background Animation: Cameras */}
                    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                        <AnimatedCameraBackground />
                    </div>

                    {/* Background Animation: Red Floating Glow */}
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full z-0 pointer-events-none">
                        <motion.div
                            className="w-full h-full rounded-full blur-[100px] opacity-40"
                            style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)' }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                                x: [0, -50, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full z-0 pointer-events-none">
                        <motion.div
                            className="w-full h-full rounded-full blur-[100px] opacity-30"
                            style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)' }}
                            animate={{
                                scale: [1, 1.1, 1],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                    </div>

                    <div className="container mx-auto px-4 md:px-10 max-w-[1500px] relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                            {/* Column 1 */}
                            <div className="flex flex-col gap-12">
                                {filteredProjects.filter((_, i) => i % 3 === 0).map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} onClick={setSelectedProject} />
                                ))}
                            </div>

                            {/* Column 2 - Staggered Down */}
                            <div className="flex flex-col gap-12 md:pt-24">
                                {filteredProjects.filter((_, i) => i % 3 === 1).map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} onClick={setSelectedProject} />
                                ))}
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col gap-12">
                                {filteredProjects.filter((_, i) => i % 3 === 2).map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} onClick={setSelectedProject} />
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            {/* ═══════════════════════════════════════════════════════════════
                 DETAILED PROJECT REVIEW - SPLIT SCREEN MODAL (WITH FIXED CLOSE)
            ═══════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* FIXED CLOSE BUTTON FOR VISIBILITY */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-black/5"
                        >
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col lg:flex-row w-full h-full">

                            {/* LEFT: IMMERSIVE IMAGE */}
                            <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-full bg-black">
                                <motion.div
                                    className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent"
                                />
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* RIGHT: PROJECT CONTENT */}
                            <div className="w-full lg:w-[45%] h-[60vh] lg:h-full overflow-y-auto bg-white custom-scrollbar">
                                <div className="p-8 md:p-16 pt-20">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="w-2 h-2 bg-black rounded-full" />
                                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-black/50">
                                                Project Case Study
                                            </span>
                                        </div>

                                        <h2 className="font-display text-[48px] md:text-[64px] leading-[1] text-black mb-6">
                                            {selectedProject.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 border-b border-black/10 pb-8">
                                            <div>
                                                <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Client</span>
                                                <span className="font-sans text-[14px]">{selectedProject.details.client}</span>
                                            </div>
                                            <div>
                                                <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Service</span>
                                                <span className="font-sans text-[14px]">{selectedProject.details.service}</span>
                                            </div>
                                            <div>
                                                <span className="block font-sans text-[10px] uppercase font-bold text-black/40 mb-1">Year</span>
                                                <span className="font-sans text-[14px]">{selectedProject.year}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-12"
                                    >
                                        <section>
                                            <h3 className="font-sans text-[12px] uppercase font-bold tracking-widest text-black mb-4">
                                                The Vision
                                            </h3>
                                            <p className="font-serif text-[18px] leading-relaxed text-black/80">
                                                {selectedProject.story}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="font-sans text-[12px] uppercase font-bold tracking-widest text-black mb-4">
                                                Our Process
                                            </h3>
                                            <p className="font-sans text-[15px] leading-loose text-black/60">
                                                {selectedProject.process}
                                            </p>
                                        </section>

                                        <section className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="font-sans text-[12px] uppercase font-bold tracking-widest text-black mb-2">
                                                Deliverables
                                            </h3>
                                            <p className="font-sans text-[14px] text-black/70">
                                                {selectedProject.details.deliverables}
                                            </p>
                                        </section>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-16 pt-8 border-t border-black/10"
                                    >
                                        <Link
                                            href="/contact"
                                            className="group flex items-center justify-between w-full p-6 bg-black text-white hover:bg-black/90 transition-colors rounded-sm"
                                        >
                                            <span className="font-sans text-[12px] uppercase tracking-[0.2em] font-bold">Start Your Project</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
