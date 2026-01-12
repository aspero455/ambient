'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';
import type * as FaceApiType from '@vladmandic/face-api';

// Simulated database of found photos
const SAMPLE_PHOTOS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=800&fit=crop', name: 'Event Photo 1', date: 'Oct 24, 2024' },
    { id: 2, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', name: 'Event Photo 2', date: 'Oct 24, 2024' },
    { id: 3, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop', name: 'Event Photo 3', date: 'Oct 24, 2024' },
    { id: 4, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop', name: 'Event Photo 4', date: 'Oct 24, 2024' },
    { id: 5, url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop', name: 'Event Photo 5', date: 'Oct 24, 2024' },
    { id: 6, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop', name: 'Event Photo 6', date: 'Oct 24, 2024' },
    { id: 7, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop', name: 'Event Photo 7', date: 'Oct 24, 2024' },
    { id: 8, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop', name: 'Event Photo 8', date: 'Oct 24, 2024' },
];

type Step = 'registration' | 'camera' | 'scanning' | 'results';
type CapturePhase = 'center' | 'left' | 'right' | 'complete';

export default function ScanPage() {
    const [step, setStep] = useState<Step>('registration');
    const [formData, setFormData] = useState({ name: '', contact: '' });
    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [foundPhotos, setFoundPhotos] = useState<typeof SAMPLE_PHOTOS>([]);
    const [scanProgress, setScanProgress] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // AI & Capture State
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [capturePhase, setCapturePhase] = useState<CapturePhase>('center');
    const [faceDetected, setFaceDetected] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('Initializing AI...');
    const [capturedDescriptors, setCapturedDescriptors] = useState<Float32Array[]>([]);

    // Tech aesthetic states
    const [randomCode, setRandomCode] = useState<string[]>([]);

    // AI Ref
    const faceApiRef = useRef<typeof FaceApiType | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Initial Model Loading
    useEffect(() => {
        const loadModels = async () => {
            // Using a reliable CDN for face-api models
            const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
            try {
                const faceapi = await import('@vladmandic/face-api');
                faceApiRef.current = faceapi;

                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                setModelsLoaded(true);
                setFeedbackMsg('AI Systems Ready');
            } catch (error) {
                console.error('Model loading failed:', error);
                setFeedbackMsg('AI Init Failed: Check Network');
            }
        };
        loadModels();
    }, []);

    // Detection Loop
    useEffect(() => {
        if (!cameraActive || !modelsLoaded || !videoRef.current || !overlayRef.current) return;

        let animationFrame: number;

        const detect = async () => {
            const faceapi = faceApiRef.current;
            if (!faceapi) return;

            if (videoRef.current && overlayRef.current && !videoRef.current.paused && !videoRef.current.ended) {
                const video = videoRef.current;
                const canvas = overlayRef.current;

                const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
                // Only match dimensions if they differ to avoid flicker/perf hit
                if (canvas.width !== displaySize.width || canvas.height !== displaySize.height) {
                    faceapi.matchDimensions(canvas, displaySize);
                }

                try {
                    // Use TinyFaceDetector for speed on mobile/web
                    // Increase scoreThreshold to avoid false positives
                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 }))
                        .withFaceLandmarks();

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Flip context horizontally to match mirrored video
                        // We need to handle this carefully. face-api checks raw video, but we display flipped.
                        // The simplest way for overlay is to flip the canvas context drawing or CSS transform the canvas
                        // We are already CSS transforming scale-x-[-1] on the canvas in JSX, so drawing "normally" works relative to the video frame
                        // BUT face-api coordinates match the original video frame.
                        // So if we display both flipped with CSS, they align visually. 
                    }

                    if (resizedDetections.length > 0) {
                        setFaceDetected(true);
                        const face = resizedDetections[0]; // focus on primary face
                        const landmarks = face.landmarks;
                        const box = face.detection.box;

                        if (ctx) {
                            // Draw fancy tech brackets
                            ctx.strokeStyle = '#10b981'; // Emerald
                            ctx.lineWidth = 3;
                            const len = 30; // bracket length

                            // Top Left
                            ctx.beginPath(); ctx.moveTo(box.x, box.y + len); ctx.lineTo(box.x, box.y); ctx.lineTo(box.x + len, box.y); ctx.stroke();
                            // Top Right
                            ctx.beginPath(); ctx.moveTo(box.x + box.width - len, box.y); ctx.lineTo(box.x + box.width, box.y); ctx.lineTo(box.x + box.width, box.y + len); ctx.stroke();
                            // Bottom Left
                            ctx.beginPath(); ctx.moveTo(box.x, box.y + box.height - len); ctx.lineTo(box.x, box.y + box.height); ctx.lineTo(box.x + len, box.y + box.height); ctx.stroke();
                            // Bottom Right
                            ctx.beginPath(); ctx.moveTo(box.x + box.width - len, box.y + box.height); ctx.lineTo(box.x + box.width, box.y + box.height); ctx.lineTo(box.x + box.width, box.y + box.height - len); ctx.stroke();

                            // Draw partial landmarks for "scanning" effect
                            ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
                            // Just draw outline points to reduce clutter
                            landmarks.getJawOutline().forEach(point => {
                                ctx.beginPath(); ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); ctx.fill();
                            });
                            landmarks.getNose().forEach(point => {
                                ctx.beginPath(); ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); ctx.fill();
                            });
                        }

                        // Pose Logic
                        const nose = landmarks.getNose()[3];
                        const leftEye = landmarks.getLeftEye()[0];
                        const rightEye = landmarks.getRightEye()[3];

                        const faceWidth = rightEye.x - leftEye.x;
                        const center = (rightEye.x + leftEye.x) / 2;
                        // Deviation: positive = nose to right (user looking left), negative = nose to left (user looking right)
                        const deviation = (nose.x - center) / faceWidth;

                        if (capturePhase === 'center') {
                            if (Math.abs(deviation) < 0.25) setFeedbackMsg('Perfect. Hold Steady.');
                            else setFeedbackMsg('Face Forward');
                        } else if (capturePhase === 'left') {
                            // User turns head LEFT -> Nose moves RIGHT in the image frame
                            if (deviation > 0.35) setFeedbackMsg('Angle Good. Hold.');
                            else setFeedbackMsg('Turn Head LEFT');
                        } else if (capturePhase === 'right') {
                            // User turns head RIGHT -> Nose moves LEFT in the image frame
                            if (deviation < -0.35) setFeedbackMsg('Angle Good. Hold.');
                            else setFeedbackMsg('Turn Head RIGHT');
                        }

                    } else {
                        setFaceDetected(false);
                        setFeedbackMsg('Align Face In Frame');
                    }
                } catch (e) {
                    console.log("Detect error", e); // Silently fail on some frames to avoid spam
                }
            }
            animationFrame = requestAnimationFrame(detect);
        };

        detect();
        return () => cancelAnimationFrame(animationFrame);
    }, [cameraActive, modelsLoaded, capturePhase]);

    // Background Random Code
    useEffect(() => {
        const interval = setInterval(() => {
            setRandomCode(prev => {
                const newLines = [...prev, Math.random().toString(36).substring(7)];
                if (newLines.length > 20) newLines.shift();
                return newLines;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Simple parallax
        setMousePos({
            x: (e.clientX / window.innerWidth) - 0.5,
            y: (e.clientY / window.innerHeight) - 0.5
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.contact) {
            setStep('camera');
            startCamera();
        }
    };

    const startCamera = async () => {
        if (!modelsLoaded) {
            // If models aren't ready, wait a bit or show alert. 
            // In a real app we might disable the button until loaded.
            alert("System Initializing AI Models... Please wait 5 seconds and try again.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                // Important: wait for video to play to get dimensions
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(e => console.error("Play error", e));
                    setCameraActive(true);
                }
            }
        } catch (err) {
            console.error('Camera error:', err);
            setFeedbackMsg('Camera Access Denied');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    };

    const capturePhoto = async () => {
        const faceapi = faceApiRef.current;
        if (!videoRef.current || !faceDetected || !faceapi) return;

        // Visual feedback
        setFeedbackMsg('Scanning...');

        try {
            // Use SingleFaceDetector for the actual capture to get the descriptor
            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detection) {
                // Store embedding
                setCapturedDescriptors(prev => [...prev, detection.descriptor]);

                // Store visual snapshot only for the first center image for the UI display
                if (capturePhase === 'center' && canvasRef.current) {
                    const video = videoRef.current;
                    const canvas = canvasRef.current;
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.translate(canvas.width, 0); // Flip
                        ctx.scale(-1, 1);
                        ctx.drawImage(video, 0, 0);
                        setCapturedImage(canvas.toDataURL('image/jpeg'));
                    }
                }

                // Advance Logic
                if (capturePhase === 'center') {
                    setCapturePhase('left');
                } else if (capturePhase === 'left') {
                    setCapturePhase('right');
                } else if (capturePhase === 'right') {
                    setCapturePhase('complete');
                    stopCamera();
                    startScanning();
                }
            } else {
                setFeedbackMsg('Scan Failed. Try Again.');
            }
        } catch (error) {
            console.error("Capture error", error);
            setFeedbackMsg('System Error');
        }
    };

    const startScanning = () => {
        setStep('scanning');
        setScanProgress(0);
        // Simulate Match Progress
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // 100% chance of "match" for demo purposes, 
                        // optionally could use the descriptors to do a real math check if we had real DB vectors
                        setFoundPhotos(SAMPLE_PHOTOS);
                        setStep('results');
                    }, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white overflow-hidden" onMouseMove={handleMouseMove}>
            <Navigation />

            <main className="flex-1 relative flex items-center justify-center pt-20">
                <style jsx global>{`
                    @keyframes scan-vertical {
                        0% { top: 0%; opacity: 0; }
                        50% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    @keyframes orb-float {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(20px, -20px) scale(1.1); }
                    }
                    .tech-border {
                        position: relative;
                        background: rgba(255, 255, 255, 0.85);
                        backdrop-filter: blur(20px);
                    }
                    .tech-border::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05));
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        mask-composite: exclude;
                        pointer-events: none;
                    }
                `}</style>

                {/* ═══════════════════════════════════════════════════════════════
                    BACKGROUND LAYER & HUD
                ═══════════════════════════════════════════════════════════════ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Minimal Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
                        }}
                    />

                    {/* Floating Orbs - More Visible */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-[orb-float_10s_ease-in-out_infinite]" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-[orb-float_15s_ease-in-out_infinite_reverse]" />
                    </div>

                    {/* HUD: TOP LEFT - Network Status */}
                    <div className="hidden lg:block absolute top-32 left-10 w-48 font-mono text-xs">
                        <div className="flex items-center gap-2 mb-2 text-black/60">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="font-bold tracking-widest">NET_UPLINK</span>
                        </div>
                        <div className="h-1 bg-black/5 w-full overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-emerald-500"
                                animate={{ width: ["40%", "70%", "50%", "90%", "60%"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-[9px] text-black/40">
                            <span>LATENCY: 12ms</span>
                            <span>ENCRYPTED</span>
                        </div>
                    </div>

                    {/* HUD: LEFT SIDE - Data Stream */}
                    <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-40">
                        <div className="font-mono text-[9px] text-black/40 mb-2 border-b border-black/10 pb-1">PROCESS_LOG</div>
                        <div className="font-mono text-[10px] text-black/40 leading-relaxed opacity-70">
                            {randomCode.map((line, i) => (
                                <div key={i} className="flex justify-between">
                                    <span>{`> 0x${line.substring(0, 4)}`}</span>
                                    <span className="text-black/20">{line.substring(4)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HUD: BOTTOM LEFT - System Diagnostics */}
                    <div className="hidden lg:block absolute bottom-10 left-10">
                        <div className="flex gap-4">
                            {[1, 2, 3].map((bar) => (
                                <div key={bar} className="flex flex-col items-center gap-2">
                                    <div className="w-2 h-16 bg-black/5 rounded-full flex items-end overflow-hidden">
                                        <motion.div
                                            className="w-full bg-black/40"
                                            animate={{ height: ["20%", "60%", "40%", "80%"] }}
                                            transition={{ duration: 1 + bar, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                    <span className="text-[9px] font-mono text-black/40">CPU_{bar}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HUD: RIGHT SIDE - Big Status */}
                    <div className="hidden lg:block absolute right-10 top-1/2 -translate-x-6 -translate-y-1/2 text-right">
                        <motion.div
                            className="font-display text-[120px] leading-none text-black/10 font-bold tabular-nums"
                            animate={{ opacity: [0.1, 0.15, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            {step === 'registration' && '01'}
                            {step === 'camera' && '02'}
                            {step === 'scanning' && '03'}
                            {step === 'results' && '04'}
                        </motion.div>
                        <div className="flex flex-col items-end mt-4">
                            <div className="w-32 h-[1px] bg-black/20 mb-2" />
                            <div className="font-mono text-[12px] text-black/60 uppercase tracking-[0.3em]">
                                System Status
                            </div>
                            <div className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest mt-1">
                                ● Online & Ready
                            </div>
                        </div>
                    </div>

                    {/* HUD: BOTTOM RIGHT - Coordinates */}
                    <div className="hidden lg:block absolute bottom-10 right-10 font-mono text-[10px] text-right text-black/40 leading-loose">
                        <div>POS_X: {mousePos.x.toFixed(4)}</div>
                        <div>POS_Y: {mousePos.y.toFixed(4)}</div>
                        <div className="flex items-center justify-end gap-2 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
                            <span>TRK_ACTIVE</span>
                        </div>
                    </div>

                    {/* HUD: TOP RIGHT - Secure Badge */}
                    <div className="hidden lg:block absolute top-32 right-10">
                        <div className="border border-black/10 px-3 py-1 rounded-full flex items-center gap-2 bg-white/50 backdrop-blur-sm">
                            <svg className="w-3 h-3 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="font-sans text-[10px] font-bold text-black/40 uppercase tracking-wider">Secure Connection</span>
                        </div>
                    </div>
                </div>


                {/* ═══════════════════════════════════════════════════════════════
                    MAIN CONTENT 
                ═══════════════════════════════════════════════════════════════ */}
                <div className="relative z-10 w-full max-w-[1440px] px-6 h-full min-h-[80vh] flex flex-col items-center justify-center">

                    <AnimatePresence mode="wait">

                        {/* STATE 1: REGISTRATION */}
                        {step === 'registration' && (
                            <motion.div
                                key="reg"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                                className="w-full max-w-lg"
                            >
                                <div className="tech-border rounded-3xl p-10 md:p-14 shadow-2xl shadow-black/5">
                                    <div className="text-center mb-10">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6 shadow-glow">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <h1 className="font-display text-4xl text-black font-light mb-3">Identity Access</h1>
                                        <p className="font-sans text-black/40 text-sm">Enter detailed credentials to initiate scan protocol.</p>
                                    </div>

                                    <form onSubmit={handleFormSubmit} className="space-y-6">
                                        <div className="group">
                                            <label className="block font-mono text-[10px] uppercase text-black/40 mb-2 ml-1">Full Designation</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/[0.03] border-b border-black/10 px-4 py-4 font-sans text-lg focus:outline-none focus:border-black/50 focus:bg-black/[0.05] transition-all rounded-t-lg"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block font-mono text-[10px] uppercase text-black/40 mb-2 ml-1">Contact Frequency</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/[0.03] border-b border-black/10 px-4 py-4 font-sans text-lg focus:outline-none focus:border-black/50 focus:bg-black/[0.05] transition-all rounded-t-lg"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.contact}
                                                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white py-5 mt-4 rounded-xl font-mono text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <span>Initialize System</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {/* STATE 2: CAMERA */}
                        {step === 'camera' && (
                            <motion.div
                                key="cam"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="w-full max-w-4xl"
                            >
                                <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/10">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover transform scale-x-[-1] opacity-60"
                                        autoPlay
                                        playsInline
                                        muted
                                    />
                                    <canvas
                                        ref={overlayRef}
                                        className="absolute inset-0 w-full h-full transform scale-x-[-1]"
                                    />

                                    {/* Tech Overlay */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                        <div className="absolute top-8 left-8 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            <span className="font-mono text-xs text-white/60 tracking-widest">W/CAM_01 • LIVE FEED</span>
                                        </div>

                                        {/* Center Feedback */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] flex items-center justify-center border border-white/5 rounded-full">
                                            <div className="absolute inset-0 border-2 border-t-emerald-500/50 border-r-transparent border-b-emerald-500/50 border-l-transparent rounded-full animate-[spin_4s_linear_infinite]" />

                                            <div className="absolute -top-16 text-center w-full">
                                                <div className="font-display text-2xl text-white drop-shadow-md tracking-wider">
                                                    {feedbackMsg.toUpperCase()}
                                                </div>
                                                <div className="flex justify-center gap-3 mt-3">
                                                    <div className={`h-1 w-8 rounded-full transition-colors ${capturePhase === 'center' || capturePhase === 'left' || capturePhase === 'right' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                                    <div className={`h-1 w-8 rounded-full transition-colors ${capturePhase === 'left' || capturePhase === 'right' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                                    <div className={`h-1 w-8 rounded-full transition-colors ${capturePhase === 'right' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 right-8 text-right">
                                            <div className={`font-mono text-xs tracking-widest ${faceDetected ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {faceDetected ? '> TARGET_LOCKED' : '> SEARCHING...'}
                                            </div>
                                            <div className="font-mono text-[10px] text-white/40 mt-1">
                                                PHASE: {capturePhase.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-center gap-8 pointer-events-auto">
                                        <button onClick={() => setStep('registration')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>

                                        <button
                                            onClick={capturePhoto}
                                            disabled={!faceDetected}
                                            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                                             ${faceDetected ? 'scale-100 opacity-100' : 'scale-90 opacity-50 cursor-not-allowed'}
                                            `}
                                        >
                                            <span className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                                            <span className="relative w-full h-full bg-white rounded-full border-4 border-black/50 shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform" />
                                        </button>

                                        <div className="w-12 h-12" /> {/* Spacer */}
                                    </div>
                                </div>
                                <canvas ref={canvasRef} className="hidden" />
                            </motion.div>
                        )}


                        {/* STATE 3: SCANNING */}
                        {step === 'scanning' && (
                            <motion.div
                                key="scan"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full max-w-lg text-center"
                            >
                                <div className="relative w-64 h-64 mx-auto mb-12">
                                    {/* Central Spinning Rings */}
                                    <div className="absolute inset-0 border border-black/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-4 border border-black/10 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                                    <div className="absolute inset-8 border border-black/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />

                                    {/* Core Image */}
                                    <div className="absolute inset-12 rounded-full overflow-hidden bg-black ring-4 ring-black/5">
                                        {capturedImage && (
                                            <img src={capturedImage} className="w-full h-full object-cover opacity-50 blur-sm scale-110" />
                                        )}
                                        {/* Scanner Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent animate-[scan-vertical_1.5s_linear_infinite]" />
                                    </div>

                                    {/* Percentage */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl text-white font-bold drop-shadow-lg">
                                        {scanProgress}%
                                    </div>
                                </div>

                                <h2 className="font-display text-3xl font-light mb-2">Merging Biometrics</h2>
                                <p className="font-mono text-xs text-black/40 uppercase tracking-widest">
                                    Compiling 3-Angle Tensor Data... <br />
                                    Matching Vector Points... {scanProgress > 50 ? 'Complete' : 'Processing'}
                                </p>
                            </motion.div>
                        )}


                        {/* STATE 4: RESULTS */}
                        {step === 'results' && (
                            <motion.div
                                key="res"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full h-full flex flex-col pt-12"
                            >
                                <header className="flex justify-between items-end mb-10 w-full px-4 md:px-0">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="font-mono text-xs uppercase tracking-widest text-emerald-600">Match Confirmed</span>
                                        </div>
                                        <h2 className="font-display text-3xl md:text-4xl font-light">{foundPhotos.length} Photos Found</h2>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => { setStep('registration'); setCapturePhase('center'); setCapturedDescriptors([]); }} className="hidden md:block px-6 py-3 border border-black/10 rounded-full font-mono text-xs uppercase hover:bg-black hover:text-white transition-colors">
                                            New Scan
                                        </button>
                                        <button className="px-8 py-3 bg-black text-white rounded-full font-mono text-xs uppercase shadow-lg hover:bg-black/80 transition-all flex items-center gap-2">
                                            <span>Download All</span>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </button>
                                    </div>
                                </header>

                                {/* Masonry Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20 px-4 md:px-0 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                    {foundPhotos.map((photo, i) => (
                                        <motion.div
                                            key={photo.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                                        >
                                            <Image src={photo.url} alt={photo.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    <p className="font-display text-white text-xl">{photo.name}</p>
                                                    <p className="font-mono text-white/50 text-[10px] uppercase mt-1">{photo.date}</p>
                                                    <div className="flex justify-end mt-4">
                                                        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
