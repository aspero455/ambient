"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * ArtistImagerySlider component
 * 
 * Enhanced with infinite auto-scroll animation and hover effects.
 */

const artists = [
  {
    name: "Luke Davis",
    location: "POOLE, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    alt: "A macro shot of a ladybug climbing on a leaf."
  },
  {
    name: "Liz Bretz",
    location: "LOS ANGELES, UNITED STATES",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    alt: "A retro image of a woman sitting at a table with a telephone wire wrapped around her."
  },
  {
    name: "Tanguy Troude",
    location: "PARIS, FRANCE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    alt: "A silhouetted hand held up in front of the moon in the sky."
  },
  {
    name: "Joseph Saraceno",
    location: "TORONTO, CANADA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    alt: "An array of vintage decor laying on a table."
  },
  {
    name: "Gianluca Mortarotti",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    alt: "A elder man in a suit smoking a cigarette."
  },
  {
    name: "Aly Kula",
    location: "BROOKLYN, UNITED STATES",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    alt: "A young woman posing with a bright, red jacket hanging on her shoulder."
  },
  {
    name: "Sofia Martinez",
    location: "BARCELONA, SPAIN",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    alt: "Portrait of a woman with natural lighting"
  },
  {
    name: "James Wilson",
    location: "MELBOURNE, AUSTRALIA",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    alt: "Portrait of a man with warm lighting"
  }
];

const NewImagerySlider = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Double artists for seamless loop
  const allArtists = [...artists, ...artists];

  return (
    <section ref={sectionRef} className="bg-white py-[80px] md:py-[120px] overflow-hidden">
      <div
        className="container mx-auto px-6 md:px-10 mb-10 md:mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <h4 className="font-display text-[28px] md:text-[40px] font-light leading-[1.1] tracking-tight text-black">
          New and noteworthy imagery.
        </h4>
      </div>

      {/* Infinite Scroll Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-8 px-10"
          style={{
            animation: 'marquee 40s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {allArtists.map((artist, index) => (
            <div
              key={`${artist.name}-${index}`}
              className="flex-none w-[300px] md:w-[380px] group"
            >
              <div className="aspect-[4/5] bg-neutral-300 overflow-hidden mb-6 relative image-hover-zoom">
                <img
                  src={artist.image}
                  alt={artist.alt}
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-[13px] font-bold uppercase tracking-widest text-black group-hover:text-[#666666] transition-colors">
                  {artist.name}
                </p>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]">
                  {artist.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="container mx-auto px-10 mt-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s'
        }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-[#999999]/30" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#999999]">
            Hover to pause • Scroll to explore
          </span>
          <div className="h-[1px] flex-1 bg-[#999999]/30" />
        </div>
      </div>
    </section>
  );
};

export default NewImagerySlider;