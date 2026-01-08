"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * WorkflowFeatures Component
 * 
 * Enhanced with staggered animations, parallax, and hover effects.
 */

const features = [
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    alt: "Team collaborating on images",
    title: "Seamless Collaboration",
    description: "Use Boards to build and share your creative vision with images you can actually license.",
    aspect: "4/3"
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    alt: "Expert assistance form",
    title: "Expert Assistance",
    description: "Our dedicated team of experts is ready to help you find the right image for any and every project.",
    aspect: "square"
  },
  {
    image: "https://images.unsplash.com/photo-1454165833767-131438959921?q=80&w=1200&auto=format&fit=crop",
    alt: "Streamlined search filters",
    title: "Streamlined Search",
    description: "Narrow down your search for the right imagery with intuitive search filters like composition, ratio, color, and more.",
    aspect: "4/5"
  }
];

const WorkflowFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section ref={sectionRef} className="bg-white py-[80px] md:py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-[1440px]">
        {/* Section Heading */}
        <h2
          className="font-display font-light text-[40px] md:text-[64px] leading-[1.0] tracking-[-0.02em] text-black mb-12 md:mb-16 text-center lg:text-left"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          Features designed to streamline your workflow.
        </h2>

        {/* Bento-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[40px] items-start">

          {/* Left Column */}
          <div className="flex flex-col gap-10 lg:gap-[40px]">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={feature.title}
                className="relative group hover-lift"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.8s ease ${index * 150 + 200}ms, transform 0.8s ease ${index * 150 + 200}ms`
                }}
              >
                <div className={`relative ${feature.aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden image-hover-zoom`}>
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-8 max-w-[400px]">
                  <h3 className="font-display font-light text-[28px] md:text-[32px] leading-[1.1] text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-[16px] md:text-[18px] leading-[1.5] text-[#4A4A4A]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 lg:gap-[40px]">
            {/* Feature 3 */}
            <div
              className="relative group hover-lift"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s'
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden image-hover-zoom">
                <Image
                  src={features[2].image}
                  alt={features[2].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-8 max-w-[400px]">
                <h3 className="font-display font-light text-[28px] md:text-[32px] leading-[1.1] text-black mb-4">
                  {features[2].title}
                </h3>
                <p className="font-sans text-[16px] md:text-[18px] leading-[1.5] text-[#4A4A4A]">
                  {features[2].description}
                </p>
              </div>
            </div>

            {/* Final CTA Block */}
            <div
              className="flex flex-col items-start justify-end h-full lg:min-h-[300px] mt-10 lg:mt-0 bg-white p-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s'
              }}
            >
              <h3 className="font-display font-light text-[28px] md:text-[32px] leading-[1.1] text-black mb-6 max-w-[350px]">
                Create career-defining work with Ambient Frames.
              </h3>
              <p className="font-sans text-[16px] leading-[1.5] text-[#4A4A4A] mb-8">
                Join thousands of creatives who trust us for their campaigns.
              </p>
              <a
                href="/register"
                className="group inline-flex items-center justify-center bg-black text-white px-8 py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] transition-all hover:opacity-80 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Create Free Account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-[#333333] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkflowFeatures;