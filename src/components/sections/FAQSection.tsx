"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * FAQSection Component - Photography Business FAQ
 * 
 * Interactive FAQ accordion with smooth animations,
 * categorized questions for photography services.
 */

const faqs = [
    {
        category: "Booking",
        questions: [
            {
                q: "How far in advance should I book?",
                a: "For weddings and major events, we recommend booking 3-6 months in advance. For portrait sessions and smaller shoots, 2-4 weeks notice is usually sufficient. However, we sometimes have last-minute availability, so don't hesitate to reach out!"
            },
            {
                q: "What is the booking process?",
                a: "Start with a free consultation where we discuss your vision and requirements. Once we finalize the details, we'll send you a contract and invoice for the 50% advance payment: Your date is then secured. The remaining 50% is due on the day of the shoot."
            },
            {
                q: "Do you travel for destination shoots?",
                a: "Absolutely! We love destination weddings and shoots. We've covered events across India and internationally. Travel and accommodation costs are quoted separately based on the location."
            },
        ]
    },
    {
        category: "Pricing",
        questions: [
            {
                q: "What are your photography packages?",
                a: "Our packages vary based on the type of shoot. Wedding packages start from ₹75,000, portrait sessions from ₹15,000, and corporate events from ₹35,000. Each package includes a specific number of hours, edited photos, and deliverables. Contact us for a custom quote!"
            },
            {
                q: "Is there an additional cost for editing?",
                a: "No, professional editing is included in all our packages. This includes color correction, exposure adjustment, and light retouching. Advanced retouching or compositing for fashion/editorial work may have additional charges."
            },
        ]
    },
    {
        category: "Delivery",
        questions: [
            {
                q: "How long until I receive my photos?",
                a: "Portrait sessions and corporate events: 5-7 business days. Pre-wedding shoots: 10-14 days. Full wedding coverage: 3-4 weeks. We'll also share sneak peeks within 48 hours of your shoot!"
            },
            {
                q: "In what format will I receive the photos?",
                a: "You'll receive high-resolution JPEG files via a private online gallery, which you can download and share. We also provide web-optimized versions for social media. RAW files are available upon request for an additional fee."
            },
        ]
    },
];

const FAQSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(faqs[0].category);
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const currentFAQ = faqs.find(f => f.category === activeCategory);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#FAFAFA] py-24 md:py-40 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-black/[0.02] to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-black/[0.02] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Header */}
                    <div
                        className="lg:sticky lg:top-32 lg:self-start"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease',
                        }}
                    >
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/40 mb-6 block">
                            Got Questions?
                        </span>
                        <h2 className="font-display text-[48px] md:text-[72px] font-light text-black leading-[0.95] tracking-[-0.02em] mb-8">
                            We've got
                            <span className="block text-black/40">answers.</span>
                        </h2>
                        <p className="font-sans text-[18px] leading-[1.7] text-[#666] mb-10 max-w-[450px]">
                            Everything you need to know about booking a photo session with us. Can't find your answer?
                        </p>

                        {/* Contact CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group relative inline-flex items-center gap-3 bg-black text-white px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase overflow-hidden">
                                <span className="relative z-10">Contact Us</span>
                                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#555] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                            </button>
                            <button className="flex items-center gap-2 px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Us
                            </button>
                        </div>

                        {/* Category Tabs (Mobile) */}
                        <div className="mt-12 lg:hidden">
                            <div className="flex flex-wrap gap-2">
                                {faqs.map((faq) => (
                                    <button
                                        key={faq.category}
                                        onClick={() => {
                                            setActiveCategory(faq.category);
                                            setOpenQuestion(null);
                                        }}
                                        className={`px-5 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.1em] transition-all ${activeCategory === faq.category
                                            ? 'bg-black text-white'
                                            : 'bg-black/5 text-black/60 hover:bg-black/10'
                                            }`}
                                    >
                                        {faq.category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: FAQ Accordion */}
                    <div
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease 0.2s',
                        }}
                    >
                        {/* Category Tabs (Desktop) */}
                        <div className="hidden lg:flex gap-2 mb-8">
                            {faqs.map((faq) => (
                                <button
                                    key={faq.category}
                                    onClick={() => {
                                        setActiveCategory(faq.category);
                                        setOpenQuestion(null);
                                    }}
                                    className={`px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.1em] transition-all ${activeCategory === faq.category
                                        ? 'bg-black text-white'
                                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                                        }`}
                                >
                                    {faq.category}
                                </button>
                            ))}
                        </div>

                        {/* Questions */}
                        <div className="space-y-4">
                            {currentFAQ?.questions.map((item, index) => (
                                <div
                                    key={item.q}
                                    className="bg-white border border-black/5 overflow-hidden"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${index * 0.1 + 0.3}s`,
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors"
                                    >
                                        <span className="font-sans text-[16px] md:text-[18px] font-medium text-black pr-8">
                                            {item.q}
                                        </span>
                                        <div
                                            className={`flex-none w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openQuestion === item.q ? 'bg-black text-white rotate-180' : 'bg-black/5 text-black'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div
                                        className="overflow-hidden transition-all duration-500"
                                        style={{
                                            maxHeight: openQuestion === item.q ? '300px' : '0',
                                            opacity: openQuestion === item.q ? 1 : 0,
                                        }}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="font-sans text-[15px] leading-[1.7] text-[#666]">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Help Card */}
                        <div
                            className="mt-8 bg-gradient-to-br from-black to-[#1A1A1A] p-8 text-white"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transition: 'opacity 0.8s ease 0.6s',
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-none">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-display text-[24px] font-light mb-2">Ready to book?</h4>
                                    <p className="font-sans text-[14px] text-white/60 mb-4">
                                        Let's discuss your photography needs and create something beautiful together.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-2 font-sans text-[13px]">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +91 83569 53173
                                        </span>
                                        <span className="flex items-center gap-2 font-sans text-[13px]">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            hello@ambientframes.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
