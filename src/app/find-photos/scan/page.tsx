'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';

// Simulated database of found photos (in real app, this would come from API)
const SAMPLE_PHOTOS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop', name: 'Event Photo 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', name: 'Event Photo 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop', name: 'Event Photo 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop', name: 'Event Photo 4' },
    { id: 5, url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', name: 'Event Photo 5' },
    { id: 6, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', name: 'Event Photo 6' },
];

type Step = 'registration' | 'camera' | 'scanning' | 'results';

interface FormData {
    name: string;
    contact: string;
}

interface FormErrors {
    name?: string;
    contact?: string;
}

export default function ScanPage() {
    const [step, setStep] = useState<Step>('registration');
    const [formData, setFormData] = useState<FormData>({ name: '', contact: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [foundPhotos, setFoundPhotos] = useState<typeof SAMPLE_PHOTOS>([]);
    const [scanProgress, setScanProgress] = useState(0);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        setIsLoaded(true);
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Form validation
    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.contact.trim()) {
            errors.contact = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) {
            errors.contact = 'Please enter a valid 10-digit phone number';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setStep('camera');
            startCamera();
        }
    };

    // Start camera
    const startCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setCameraActive(true);
            }
        } catch (err) {
            console.error('Camera error:', err);
            setCameraError('Unable to access camera. Please ensure you have granted camera permissions.');
        }
    };

    // Stop camera
    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    }, []);

    // Capture photo
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                stopCamera();
                startScanning();
            }
        }
    };

    // Start scanning simulation
    const startScanning = () => {
        setStep('scanning');
        setScanProgress(0);

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    const found = Math.random() > 0.3;
                    if (found) {
                        const numPhotos = Math.floor(Math.random() * 5) + 2;
                        setFoundPhotos(SAMPLE_PHOTOS.slice(0, numPhotos));
                    } else {
                        setFoundPhotos([]);
                    }
                    setStep('results');
                    return 100;
                }
                return prev + 2;
            });
        }, 60);
    };

    // Download single photo
    const downloadPhoto = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    // Download all photos
    const downloadAllPhotos = async () => {
        for (let i = 0; i < foundPhotos.length; i++) {
            await downloadPhoto(foundPhotos[i].url, `photo_${i + 1}.jpg`);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    // Reset to start
    const resetScan = () => {
        setStep('registration');
        setFormData({ name: '', contact: '' });
        setFormErrors({});
        setCapturedImage(null);
        setFoundPhotos([]);
        setScanProgress(0);
        setCameraError(null);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navigation />

            <main className="flex-1">
                {/* ═══════════════════════════════════════════════════════════════
                    HERO SECTION - Matching Find Photos Page Style
                ═══════════════════════════════════════════════════════════════ */}
                <section className="relative w-full min-h-screen overflow-hidden bg-[#F8F9FA] py-20 md:py-32">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Soft Blue Glow */}
                        <motion.div
                            className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-100/40 blur-[100px] mix-blend-multiply"
                            animate={{
                                x: [0, -30, 0],
                                y: [0, 50, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Warm Amber Glow */}
                        <motion.div
                            className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-100/40 blur-[100px] mix-blend-multiply"
                            animate={{
                                x: [0, 40, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />

                        {/* Purple Haze */}
                        <motion.div
                            className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-purple-100/30 blur-[80px] mix-blend-multiply"
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -40, 30, 0],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />

                        {/* Floating Camera Icon */}
                        <motion.div
                            className="absolute z-0 opacity-[0.04] pointer-events-none text-black"
                            initial={{ x: "70%", y: "10%", rotate: -10 }}
                            animate={{
                                x: ["70%", "80%", "65%", "70%"],
                                y: ["10%", "30%", "15%", "10%"],
                                rotate: [-10, 15, -5, -10],
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6h-2.586l-2-2H8.586l-2 2H4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Grid Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.3]"
                        style={{
                            backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                        }}
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
                        <div className="absolute top-6 left-6 w-12 h-[1px] bg-black/20" />
                        <div className="absolute top-6 left-6 w-[1px] h-12 bg-black/20" />
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                        <div className="absolute top-6 right-6 w-12 h-[1px] bg-black/20" />
                        <div className="absolute top-6 right-6 w-[1px] h-12 bg-black/20" />
                    </div>

                    <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                    Face Recognition Scanner
                                </span>
                            </div>
                            <h1 className="font-display text-4xl md:text-6xl font-light text-black mb-4 leading-tight">
                                Find Your <span className="font-semibold">Photos</span>
                            </h1>
                            <p className="font-sans text-lg text-black/60 max-w-lg mx-auto">
                                Register, scan your face, and instantly discover all your event photos.
                            </p>
                        </motion.div>

                        {/* Progress Steps - Elegant Minimal */}
                        <motion.div
                            className="flex justify-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center">
                                {[
                                    { key: 'registration', label: 'Register', num: '01' },
                                    { key: 'camera', label: 'Scan', num: '02' },
                                    { key: 'results', label: 'Results', num: '03' }
                                ].map((s, i) => (
                                    <div key={s.key} className="flex items-center">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-display text-sm transition-all duration-500
                                                ${['registration', 'camera', 'scanning', 'results'].indexOf(step) >= ['registration', 'camera', 'results'].indexOf(s.key)
                                                    ? 'bg-black text-white'
                                                    : 'bg-transparent border border-black/20 text-black/30'
                                                }`}>
                                                {s.num}
                                            </div>
                                            <span className={`mt-2 font-sans text-[10px] uppercase tracking-[0.15em] transition-colors
                                                ${['registration', 'camera', 'scanning', 'results'].indexOf(step) >= ['registration', 'camera', 'results'].indexOf(s.key)
                                                    ? 'text-black'
                                                    : 'text-black/30'
                                                }`}>
                                                {s.label}
                                            </span>
                                        </div>
                                        {i < 2 && (
                                            <div className={`w-16 md:w-24 h-[1px] mx-4 md:mx-6 transition-colors
                                                ${['registration', 'camera', 'scanning', 'results'].indexOf(step) > ['registration', 'camera', 'results'].indexOf(s.key)
                                                    ? 'bg-black'
                                                    : 'bg-black/10'
                                                }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Main Content Card - Clean & Classic */}
                        <motion.div
                            className="bg-white border border-black/10 shadow-2xl max-w-xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Card Header Line */}
                            <div className="h-1 bg-black" />

                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">

                                    {/* Step 1: Registration Form - Elegant Design */}
                                    {step === 'registration' && (
                                        <motion.div
                                            key="registration"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {/* Icon */}
                                            <div className="flex justify-center mb-8">
                                                <div className="relative">
                                                    <div className="w-20 h-20 bg-[#F8F9FA] flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    {/* Corner Accents */}
                                                    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-black" />
                                                    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-black" />
                                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-black" />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-black" />
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <div className="text-center mb-10">
                                                <h2 className="font-display text-2xl md:text-3xl font-light text-black mb-3">
                                                    Enter Your <span className="italic">Details</span>
                                                </h2>
                                                <div className="w-12 h-[1px] bg-black/20 mx-auto mb-4" />
                                                <p className="font-sans text-sm text-black/50">
                                                    We'll notify you when your photos are ready
                                                </p>
                                            </div>

                                            {/* Form */}
                                            <form onSubmit={handleFormSubmit}>
                                                {/* Horizontal Fields */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                                    <div>
                                                        <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                            Full Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.name ? 'border-red-400 bg-red-50/50' : 'border-black/10 focus:border-black'} 
                                                                font-sans text-black text-lg focus:outline-none transition-colors bg-transparent`}
                                                            placeholder="Your full name"
                                                        />
                                                        {formErrors.name && (
                                                            <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.name}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            value={formData.contact}
                                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                            className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.contact ? 'border-red-400 bg-red-50/50' : 'border-black/10 focus:border-black'} 
                                                                font-sans text-black text-lg focus:outline-none transition-colors bg-transparent`}
                                                            placeholder="Your phone number"
                                                        />
                                                        {formErrors.contact && (
                                                            <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.contact}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <div className="pt-10">
                                                    <button
                                                        type="submit"
                                                        className="group w-full bg-black text-white py-5 font-sans font-bold text-[11px] tracking-[0.2em] uppercase
                                                            hover:bg-black/90 transition-all relative overflow-hidden"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                                            Continue to Scan
                                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Footer Note */}
                                            <p className="text-center mt-8 font-sans text-[11px] text-black/30">
                                                Your information is secure and will not be shared
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Camera Capture */}
                                    {step === 'camera' && (
                                        <motion.div
                                            key="camera"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {/* Icon */}
                                            <div className="flex justify-center mb-8">
                                                <div className="relative">
                                                    <div className="w-20 h-20 bg-[#F8F9FA] flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-black" />
                                                    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-black" />
                                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-black" />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-black" />
                                                </div>
                                            </div>

                                            <div className="text-center mb-8">
                                                <h2 className="font-display text-2xl md:text-3xl font-light text-black mb-3">
                                                    Position Your <span className="italic">Face</span>
                                                </h2>
                                                <div className="w-12 h-[1px] bg-black/20 mx-auto mb-4" />
                                                <p className="font-sans text-sm text-black/50">Look directly at the camera and click capture</p>
                                            </div>

                                            <div className="relative mx-auto max-w-md">
                                                {/* Camera View */}
                                                <div className="relative aspect-[4/3] bg-black overflow-hidden">
                                                    {cameraError ? (
                                                        <div className="absolute inset-0 flex items-center justify-center p-8">
                                                            <div className="text-center">
                                                                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-4">
                                                                    <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-white/70 font-sans text-sm mb-4">{cameraError}</p>
                                                                <button
                                                                    onClick={startCamera}
                                                                    className="px-6 py-3 bg-white text-black font-sans font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-gray-100 transition-colors"
                                                                >
                                                                    Try Again
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <video
                                                                ref={videoRef}
                                                                autoPlay
                                                                playsInline
                                                                muted
                                                                className="w-full h-full object-cover transform scale-x-[-1]"
                                                            />

                                                            {/* Face Guide Overlay */}
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <div className="absolute inset-0 bg-black/30"
                                                                    style={{
                                                                        maskImage: 'radial-gradient(ellipse 35% 45% at center, transparent 100%, black 100%)',
                                                                        WebkitMaskImage: 'radial-gradient(ellipse 35% 45% at center, transparent 100%, black 100%)'
                                                                    }}
                                                                />
                                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-60 border border-white/40 border-dashed rounded-[50%]" />
                                                                <div className="absolute top-[15%] left-[25%] w-5 h-5 border-l border-t border-white" />
                                                                <div className="absolute top-[15%] right-[25%] w-5 h-5 border-r border-t border-white" />
                                                                <div className="absolute bottom-[15%] left-[25%] w-5 h-5 border-l border-b border-white" />
                                                                <div className="absolute bottom-[15%] right-[25%] w-5 h-5 border-r border-b border-white" />
                                                            </div>

                                                            {/* Status indicator */}
                                                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                                                <span className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                                                                <span className="text-white text-[10px] font-mono uppercase tracking-wider">{cameraActive ? 'Live' : 'Loading'}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Capture Buttons */}
                                                {!cameraError && (
                                                    <div className="mt-6 flex justify-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                stopCamera();
                                                                setStep('registration');
                                                            }}
                                                            className="px-8 py-4 border border-black/20 text-black font-sans font-bold text-[11px] tracking-[0.15em] uppercase
                                                                hover:border-black transition-colors"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            onClick={capturePhoto}
                                                            disabled={!cameraActive}
                                                            className="px-8 py-4 bg-black text-white font-sans font-bold text-[11px] tracking-[0.15em] uppercase
                                                                hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                                                                flex items-center gap-3"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            Capture
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <canvas ref={canvasRef} className="hidden" />
                                        </motion.div>
                                    )}

                                    {/* Step 3: Scanning */}
                                    {step === 'scanning' && (
                                        <motion.div
                                            key="scanning"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center py-8"
                                        >
                                            <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-10">
                                                {/* Captured image */}
                                                {capturedImage && (
                                                    <div className="w-full h-full overflow-hidden border border-black/10">
                                                        <img
                                                            src={capturedImage}
                                                            alt="Captured"
                                                            className="w-full h-full object-cover transform scale-x-[-1]"
                                                        />
                                                    </div>
                                                )}

                                                {/* Scanning animation - rotating corners */}
                                                <motion.div
                                                    className="absolute inset-[-8px]"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                >
                                                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black" />
                                                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black" />
                                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black" />
                                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black" />
                                                </motion.div>

                                                {/* Scanning line */}
                                                <motion.div
                                                    className="absolute left-0 right-0 h-[2px] bg-black"
                                                    animate={{ top: ['0%', '100%', '0%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                />
                                            </div>

                                            <h2 className="font-display text-2xl md:text-3xl font-light text-black mb-3">
                                                Scanning <span className="italic">Database</span>
                                            </h2>
                                            <div className="w-12 h-[1px] bg-black/20 mx-auto mb-4" />
                                            <p className="font-sans text-sm text-black/50 mb-10">
                                                Searching for your photos in our collection...
                                            </p>

                                            {/* Progress bar */}
                                            <div className="max-w-xs mx-auto">
                                                <div className="h-[3px] bg-black/10 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-black"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${scanProgress}%` }}
                                                        transition={{ duration: 0.1 }}
                                                    />
                                                </div>
                                                <p className="font-mono text-[11px] text-black/40 mt-4 uppercase tracking-wider">{scanProgress}% Complete</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Results */}
                                    {step === 'results' && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {foundPhotos.length > 0 ? (
                                                /* Photos Found */
                                                <div>
                                                    <div className="text-center mb-10">
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                                            className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6"
                                                        >
                                                            <div className="w-16 h-16 bg-black flex items-center justify-center">
                                                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-black" />
                                                            <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-black" />
                                                            <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-black" />
                                                            <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-black" />
                                                        </motion.div>
                                                        <h2 className="font-display text-2xl md:text-3xl font-light text-black mb-3">
                                                            Photos <span className="italic">Found!</span>
                                                        </h2>
                                                        <div className="w-12 h-[1px] bg-black/20 mx-auto mb-4" />
                                                        <p className="font-sans text-sm text-black/50">
                                                            We found <strong className="text-black">{foundPhotos.length} photos</strong> matching your face
                                                        </p>
                                                    </div>

                                                    {/* Download All Button */}
                                                    <div className="flex justify-center mb-8">
                                                        <button
                                                            onClick={downloadAllPhotos}
                                                            className="group flex items-center gap-3 bg-black text-white px-8 py-4 font-sans font-bold text-[11px] tracking-[0.15em] uppercase
                                                                hover:bg-black/90 transition-all"
                                                        >
                                                            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                            Download All Photos
                                                        </button>
                                                    </div>

                                                    {/* Photo Grid */}
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                        {foundPhotos.map((photo, index) => (
                                                            <motion.div
                                                                key={photo.id}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                className="group relative aspect-square bg-[#F8F9FA] overflow-hidden"
                                                            >
                                                                <Image
                                                                    src={photo.url}
                                                                    alt={photo.name}
                                                                    fill
                                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                                />

                                                                {/* Hover overlay */}
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                                                    <button
                                                                        onClick={() => downloadPhoto(photo.url, `${photo.name}.jpg`)}
                                                                        className="opacity-0 group-hover:opacity-100 transition-opacity
                                                                            bg-white text-black px-4 py-2 font-sans font-bold text-[10px] uppercase tracking-wider
                                                                            flex items-center gap-2"
                                                                    >
                                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                        </svg>
                                                                        Download
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Try Again */}
                                                    <div className="mt-10 text-center">
                                                        <button
                                                            onClick={resetScan}
                                                            className="text-black/40 font-sans text-[11px] uppercase tracking-[0.15em] hover:text-black transition-colors flex items-center gap-2 mx-auto"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                            Scan another face
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* No Photos Found */
                                                <div className="text-center py-8">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                                        className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6"
                                                    >
                                                        <div className="w-16 h-16 bg-[#F8F9FA] flex items-center justify-center">
                                                            <svg className="w-8 h-8 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-black/20" />
                                                        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-black/20" />
                                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-black/20" />
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-black/20" />
                                                    </motion.div>
                                                    <h2 className="font-display text-2xl md:text-3xl font-light text-black mb-3">
                                                        No Photos <span className="italic">Found</span>
                                                    </h2>
                                                    <div className="w-12 h-[1px] bg-black/20 mx-auto mb-4" />
                                                    <p className="font-sans text-sm text-black/50 mb-10 max-w-sm mx-auto">
                                                        We couldn't find any photos matching your face in our database.
                                                        This could mean your photos haven't been uploaded yet.
                                                    </p>
                                                    <button
                                                        onClick={resetScan}
                                                        className="bg-black text-white px-8 py-4 font-sans font-bold text-[11px] tracking-[0.15em] uppercase
                                                            hover:bg-black/90 transition-all"
                                                    >
                                                        Try Again
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
