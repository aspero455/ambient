"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * AuthenticImagery Section
 * 
 * Featured section with auto-playing slider and scroll-reveal animations.
 */

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    alt: "Black and white image of horses in a field",
    title: "Trendsetting Curation",
    description: "Make your project stand out with meticulously curated collections of authentic, relevant photos."
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    alt: "A silhouetted person standing in front of a golden sky",
    title: "Not Shot for Stock",
    description: "License relevant photos authentically captured by a roster of passionate photographers and artists."
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    alt: "A look up and an illuminated-red person",
    title: "Rights Fully Cleared",
    description: "Impress your clients with pre-cleared, authentic imagery—immediately ready to license for all your projects."
  }
];

const AuthenticImagery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Intersection Observer for scroll reveal
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

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-[80px] md:py-[120px] overflow-hidden">
      <div className="container max-w-[1440px] px-6 md:px-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* Left Column: Image Slider */}
          <div
            className="w-full lg:w-1/2 flex flex-col"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            <div className="relative w-full aspect-square overflow-hidden mb-12">
              {sliderImages.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: currentSlide === index ? 1 : 0 }}
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Text Overlay on Image */}
                  <div className="absolute bottom-10 left-10 right-10 z-10">
                    <div className="w-8 h-[2px] bg-white mb-4 opacity-60"></div>
                    <h3 className="font-display text-white text-[32px] font-light leading-tight mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-white text-[16px] leading-relaxed max-w-[320px] opacity-90">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/40'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Line */}
            <div className="hidden lg:flex w-full">
              <div className="w-full h-[2px] bg-[#999999]/30 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
                  style={{ width: `${((currentSlide + 1) / sliderImages.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Context Typography */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center min-h-[400px] lg:pt-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >
            <div className="max-w-[480px]">
              <h2 className="font-display text-[48px] md:text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-black mb-8">
                Authentic imagery.<br />
                All killer, no filler.
              </h2>

              <p className="font-sans text-[18px] leading-[1.6] text-[#4A4A4A] mb-10">
                <strong className="text-black">Ambient Frames</strong> is a highly curated licensing platform offering a collection of scroll-stopping imagery, pre-cleared and ready to use for campaigns.
              </p>

              <button className="group bg-black text-white px-8 py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] hover:opacity-80 transition-all relative overflow-hidden">
                <span className="relative z-10">Create Free Account</span>
                <div className="absolute inset-0 bg-[#333333] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AuthenticImagery;