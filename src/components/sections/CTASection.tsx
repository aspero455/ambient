"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * CTASection Component
 * 
 * Enhanced with gradient animation, floating shapes, and text animations.
 */

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className="relative bg-black py-[100px] md:py-[180px] px-6 md:px-10 flex flex-col items-center overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #333333 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #222222 0%, transparent 50%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite'
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full border border-white/10 animate-float" />
      <div className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-full border border-white/5 animate-float-delay" />
      <div className="absolute top-[60%] left-[5%] w-16 h-16 rounded-full bg-white/5 animate-float" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container max-w-[1440px] px-0 relative z-10">
        <div className="max-w-[900px]">
          {/* Section Heading */}
          <h2
            className="font-display font-light text-white mb-6 md:mb-8 leading-[1.05] tracking-[-0.02em] text-center"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            Authentic imagery trusted by industry-leading creatives.
          </h2>

          {/* Subtext */}
          <p
            className="font-sans text-[#999999] mb-12 max-w-[650px]"
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s'
            }}
          >
            Join the world's top agencies, brands, and creatives who turn to Ambient Frames for captivating, scroll-stopping imagery to license for their campaigns and projects.
          </p>

          {/* Primary CTA Button */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
            }}
          >
            <button
              className="group bg-white text-black px-10 py-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#F5F5F5] animate-pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10">Create Free Account</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 flex flex-wrap items-center gap-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.5s'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-sans text-[13px] text-white/70">No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-sans text-[13px] text-white/70">Set up in 2 minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-sans text-[13px] text-white/70">Loved by 10,000+ creatives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;