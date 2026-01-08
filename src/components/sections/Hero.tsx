"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Hero Section
 * 
 * Features a large editorial heading with animated text reveal, description, 
 * and a stylized collage of images with parallax effects.
 */
const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-[24px] pb-[60px] md:pt-[32px] md:pb-[120px]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-[20%] left-[5%] w-20 h-20 rounded-full bg-black/5 animate-float hidden lg:block" />
      <div className="absolute bottom-[30%] right-[8%] w-14 h-14 rounded-full bg-black/5 animate-float-delay hidden lg:block" />
      <div className="absolute top-[60%] left-[15%] w-8 h-8 rounded-full bg-black/5 animate-float hidden lg:block" />

      <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Text Content - Left Side */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left z-10 order-2 md:order-1">
            <div className="space-y-8">
              {/* Animated Headline */}
              <h1
                className="font-display font-light text-[48px] sm:text-[56px] leading-[0.95] tracking-[-0.03em] text-black md:text-[80px] lg:text-[120px]"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                Frame your story beautifully.
              </h1>

              {/* Animated Description */}
              <p
                className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-[#4A4A4A] max-w-[480px] mx-auto md:mx-0"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s'
                }}
              >
                Discover premium photo frames crafted for moments that matter. Transform your cherished memories into timeless art with <span className="font-bold text-black">Ambient Frames.</span>
              </p>

              {/* Animated CTA Button */}
              <div
                className="pt-4"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
                }}
              >
                <button className="group bg-black text-white px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase transition-all hover:opacity-85 shadow-lg active:scale-[0.98] relative overflow-hidden">
                  <span className="relative z-10">Create Free Account</span>
                  <div className="absolute inset-0 bg-[#333333] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Collage - Right Side */}
          <div className="md:col-span-6 lg:col-span-7 relative flex justify-center md:justify-end items-center h-[300px] sm:h-[400px] md:h-[700px] order-1 md:order-2 mb-4 md:mb-0">
            <div
              className="relative w-full h-full max-w-[500px] md:max-w-[700px]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateX(0)' : 'translateX(60px)',
                transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s'
              }}
            >
              {/* Main Collage Image */}
              <div className="absolute inset-0 md:right-0 md:top-1/2 md:-translate-y-1/2 w-full h-full md:aspect-[1.1] z-0 group">
                <Image
                  src="/hero-collage.png"
                  alt="Collage of premium images by Ambient Frames artists."
                  fill
                  priority
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating accent cards */}
              <div
                className="absolute -left-8 top-[20%] bg-white p-4 shadow-2xl z-10 hidden lg:block animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-[11px] uppercase tracking-wider text-black">Curated Daily</p>
                    <p className="font-sans text-[10px] text-[#999999]">Fresh inspiration</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 bottom-[25%] bg-white p-4 shadow-2xl z-10 hidden lg:block animate-float-delay"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-[11px] uppercase tracking-wider text-black">Rights Cleared</p>
                    <p className="font-sans text-[10px] text-[#999999]">Ready to license</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

export default HeroSection;