"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * UnforgettableCampaigns Component
 * 
 * Enhanced with scroll-linked animations and parallax effects.
 */

const features = [
  {
    title: "Customized Set Rates",
    description: "Lock in your team's rate, so you can save time and license exactly what you need faster than ever."
  },
  {
    title: "Agency-Friendly Process",
    description: "Streamline your process with exclusive agency benefits: watermark-free imagery, collaboration tools, and more."
  },
  {
    title: "Dedicated Service Team",
    description: "Experience seamless onboarding and quick response times from our dedicated customer success team."
  }
];

const assets = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"
];

const UnforgettableCampaigns = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

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

  return (
    <section ref={sectionRef} className="bg-[#F8F8F8] py-[80px] md:py-[120px] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Content Side */}
          <div className="flex-1 max-w-[500px]">
            <div
              className="mb-12 md:mb-20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
            >
              <h2 className="font-display font-light text-[40px] md:text-[64px] leading-[1.0] tracking-[-0.02em] text-black mb-6">
                Photo licensing for unforgettable campaigns.
              </h2>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-[1.5] mb-8">
                Streamline your creative process and save time and money with agency-friendly pricing options and exclusive team benefits.
              </p>
              <button className="group bg-black text-white text-[12px] font-bold uppercase tracking-[0.15em] px-8 py-4 hover:opacity-80 transition-all relative overflow-hidden">
                <span className="relative z-10">Create Free Account</span>
                <div className="absolute inset-0 bg-[#333333] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
            </div>

            {/* Vertical Features List */}
            <div className="relative">
              {/* Animated Progress Line */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-[#999999]/30">
                <div
                  className="absolute left-0 top-0 w-[2px] bg-black transition-all duration-500 ease-out"
                  style={{ height: `${((activeFeature + 1) / features.length) * 100}%` }}
                />
              </div>

              <div className="pl-10 space-y-12">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`group cursor-pointer transition-all duration-500 ${activeFeature === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                      }`}
                    onMouseEnter={() => setActiveFeature(index)}
                    style={{
                      opacity: isVisible ? (activeFeature === index ? 1 : 0.4) : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `opacity 0.5s ease ${index * 100 + 300}ms, transform 0.5s ease ${index * 100 + 300}ms`
                    }}
                  >
                    <h4 className="font-display font-light text-[28px] md:text-[32px] mb-4 text-black leading-[1.1]">
                      {feature.title}
                    </h4>
                    <p className="text-[#4A4A4A] text-lg leading-[1.6]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="flex-1">
            <div
              className="sticky top-20 flex flex-col gap-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
              }}
            >
              {/* Stacked Images with Parallax Effect */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl image-hover-zoom">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: activeFeature === index ? 1 : 0 }}
                  >
                    <Image
                      src={asset}
                      alt={`Campaign visual ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Secondary floating images */}
              <div className="hidden lg:flex gap-4">
                <div className="relative aspect-square w-1/2 overflow-hidden shadow-xl image-hover-zoom">
                  <Image
                    src={assets[1]}
                    alt="Secondary campaign visual"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square w-1/2 overflow-hidden shadow-xl image-hover-zoom">
                  <Image
                    src={assets[2]}
                    alt="Tertiary campaign visual"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnforgettableCampaigns;