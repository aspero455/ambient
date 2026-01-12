'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import AnimatedCameraBackground from '@/components/ui/AnimatedCameraBackground';

// Country codes data
const COUNTRIES = [
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
    { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
    { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
    { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
    { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    eventType: string;
    eventDate: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    eventDate?: string;
}

export default function BookPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        countryCode: 'IN',
        eventType: '',
        eventDate: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const selectedCountry = COUNTRIES.find(c => c.code === formData.countryCode) || COUNTRIES[0];

    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{7,15}$/.test(formData.phone.replace(/\D/g, ''))) {
            errors.phone = 'Please enter a valid phone number';
        }

        if (!formData.eventType) {
            errors.eventType = 'Please select an event type';
        }

        if (!formData.eventDate) {
            errors.eventDate = 'Please select a date';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);

            try {
                const res = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    setIsSubmitted(true);
                } else {
                    console.error("Submission failed");
                    // Optionally handle error state
                }
            } catch (error) {
                console.error("Submission error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F5F5F5] relative overflow-hidden">
            {/* Animated Camera Background */}
            <AnimatedCameraBackground count={30} opacity={0.08} size={50} />

            <Navigation />

            <main className="flex-1 flex items-center py-24 md:py-32 relative z-10">
                <div className="container mx-auto px-6 md:px-10">
                    {!isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                        >
                            {/* Left Side - Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 mb-8">
                                    <span className="w-2 h-2 bg-black rounded-full" />
                                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
                                        Book a Session
                                    </span>
                                </div>

                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 leading-tight">
                                    Let's Capture<br />
                                    Your <span className="italic">Moments</span>
                                </h1>

                                <div className="w-16 h-[1px] bg-black/20 mb-6" />

                                <p className="font-sans text-lg text-black/50 mb-10 max-w-md">
                                    Fill in your details and we'll get back to you within 24 hours to discuss your event.
                                </p>

                                {/* Features */}
                                <div className="space-y-4">
                                    {[
                                        { icon: '📸', text: 'Professional event photography' },
                                        { icon: '⚡', text: 'AI-powered face recognition' },
                                        { icon: '📱', text: 'Instant photo delivery' },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="flex items-center gap-4"
                                        >
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="font-sans text-black/70">{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right Side - Form Card */}
                            <motion.div
                                className="bg-white border border-black/10 shadow-2xl"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {/* Card Header Line */}
                                <div className="h-1 bg-black" />

                                <div className="p-8 md:p-10">
                                    <form onSubmit={handleSubmit}>
                                        {/* Row 1: Name & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
                                            <div>
                                                <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.name ? 'border-red-400' : 'border-black/10 focus:border-black'} 
                                                        font-sans text-black text-lg focus:outline-none transition-colors bg-transparent`}
                                                    placeholder="Your full name"
                                                />
                                                {formErrors.name && (
                                                    <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.email ? 'border-red-400' : 'border-black/10 focus:border-black'} 
                                                        font-sans text-black text-lg focus:outline-none transition-colors bg-transparent`}
                                                    placeholder="your@email.com"
                                                />
                                                {formErrors.email && (
                                                    <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row 2: Phone with Country Selector */}
                                        <div className="mb-8">
                                            <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                Phone Number
                                            </label>
                                            <div className="flex gap-4">
                                                {/* Country Selector */}
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                        className="flex items-center gap-2 px-4 py-4 border-b-2 border-black/10 hover:border-black transition-colors bg-transparent min-w-[140px]"
                                                    >
                                                        <span className="text-xl">{selectedCountry.flag}</span>
                                                        <span className="font-sans text-black">{selectedCountry.dial}</span>
                                                        <svg className={`w-4 h-4 text-black/40 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>

                                                    {/* Dropdown */}
                                                    {showCountryDropdown && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="absolute top-full left-0 mt-2 w-64 bg-white border border-black/10 shadow-xl z-50 max-h-64 overflow-y-auto"
                                                        >
                                                            {COUNTRIES.map((country) => (
                                                                <button
                                                                    key={country.code}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, countryCode: country.code });
                                                                        setShowCountryDropdown(false);
                                                                    }}
                                                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 transition-colors text-left
                                                                        ${formData.countryCode === country.code ? 'bg-black/5' : ''}`}
                                                                >
                                                                    <span className="text-xl">{country.flag}</span>
                                                                    <span className="font-sans text-sm text-black">{country.name}</span>
                                                                    <span className="font-sans text-sm text-black/40 ml-auto">{country.dial}</span>
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Phone Input */}
                                                <div className="flex-1">
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.phone ? 'border-red-400' : 'border-black/10 focus:border-black'} 
                                                            font-sans text-black text-lg focus:outline-none transition-colors bg-transparent`}
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                            </div>
                                            {formErrors.phone && (
                                                <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.phone}</p>
                                            )}
                                        </div>

                                        {/* Row 3: Event Type & Date */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
                                            <div>
                                                <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                    Event Type
                                                </label>
                                                <select
                                                    value={formData.eventType}
                                                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                                    className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.eventType ? 'border-red-400' : 'border-black/10 focus:border-black'} 
                                                        font-sans text-black text-lg focus:outline-none transition-colors bg-transparent appearance-none cursor-pointer`}
                                                >
                                                    <option value="">Select event type</option>
                                                    <option value="wedding">Wedding</option>
                                                    <option value="corporate">Corporate Event</option>
                                                    <option value="birthday">Birthday Party</option>
                                                    <option value="graduation">Graduation</option>
                                                    <option value="conference">Conference</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {formErrors.eventType && (
                                                    <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.eventType}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                    Event Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.eventDate}
                                                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                                    className={`w-full px-0 py-4 border-0 border-b-2 ${formErrors.eventDate ? 'border-red-400' : 'border-black/10 focus:border-black'} 
                                                        font-sans text-black text-lg focus:outline-none transition-colors bg-transparent cursor-pointer`}
                                                />
                                                {formErrors.eventDate && (
                                                    <p className="mt-2 text-red-500 text-xs font-sans">{formErrors.eventDate}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row 4: Message */}
                                        <div className="mb-10">
                                            <label className="block font-sans text-[11px] uppercase tracking-[0.1em] text-black/60 mb-3">
                                                Additional Message <span className="text-black/30">(Optional)</span>
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={3}
                                                className="w-full px-0 py-4 border-0 border-b-2 border-black/10 focus:border-black 
                                                    font-sans text-black text-lg focus:outline-none transition-colors bg-transparent resize-none"
                                                placeholder="Tell us about your event..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full bg-black text-white py-5 font-sans font-bold text-[11px] tracking-[0.2em] uppercase
                                                hover:bg-black/90 transition-all relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {isSubmitting ? (
                                                    <>
                                                        <motion.div
                                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Book Your Session
                                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </form>

                                    {/* Footer Note */}
                                    <p className="text-center mt-8 font-sans text-[11px] text-black/30">
                                        We respect your privacy. Your information will never be shared.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                className="relative w-24 h-24 flex items-center justify-center mx-auto mb-8"
                            >
                                <div className="w-20 h-20 bg-black flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black" />
                            </motion.div>

                            <h2 className="font-display text-3xl md:text-4xl font-light text-black mb-4">
                                Booking <span className="italic">Received!</span>
                            </h2>
                            <div className="w-12 h-[1px] bg-black/20 mx-auto mb-6" />
                            <p className="font-sans text-lg text-black/50 mb-10 max-w-md mx-auto">
                                Thank you for your interest! We'll contact you within 24 hours to confirm your session.
                            </p>

                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({
                                        name: '',
                                        email: '',
                                        phone: '',
                                        countryCode: 'IN',
                                        eventType: '',
                                        eventDate: '',
                                        message: ''
                                    });
                                }}
                                className="inline-flex items-center gap-2 px-8 py-4 border border-black/20 text-black font-sans font-bold text-[11px] tracking-[0.15em] uppercase
                                    hover:border-black transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Book Another Session
                            </button>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
