"use client";

import React from 'react';
import Image from 'next/image';

/**
 * AuthenticImagery Section
 * 
 * Featured "Authentic imagery. All killer, no filler." section.
 * Features a split layout with a sliding image gallery/information blocks on the left
 * and typography-heavy brand content on the right.
 */

const AuthenticImagery = () => {
  // Assets from provided list
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

  return (
    <section className="bg-[#B0B0B0] py-[120px] overflow-hidden">
      <div className="container max-w-[1440px] px-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
          
          {/* Left Column: Image Slider & Info Blocks */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden mb-12">
              {/* Swiper simulation (static view of first slide as per design) */}
              <div className="w-full h-full relative">
                <Image
                  src={sliderImages[0].url}
                  alt={sliderImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                
                {/* Text Overlay on Image (Matched from screenshot) */}
                <div className="absolute bottom-10 left-10 right-10 z-10">
                  <div className="w-8 h-[2px] bg-white mb-4 opacity-60"></div>
                  <h3 className="font-display text-white text-[32px] font-light leading-tight mb-2">
                    {sliderImages[0].title}
                  </h3>
                  <p className="text-white text-[16px] leading-relaxed max-w-[320px] opacity-90">
                    {sliderImages[0].description}
                  </p>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Style Progress Line for Multi-step feel */}
            <div className="hidden lg:flex w-full mt-auto">
              {/* Vertical line structure found in computed styles logic */}
              <div className="w-full flex">
                <div className="w-full h-[1px] bg-[#999999] relative">
                  <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-black"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Context Typography */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center min-h-[400px] lg:pt-20">
            <div className="max-w-[480px]">
              <h2 className="font-display text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-black mb-8">
                Authentic imagery.<br />
                All killer, no filler.
              </h2>
              
              <p className="font-sans text-[18px] leading-[1.6] text-[#4A4A4A] mb-10">
                <strong className="text-black">Ambient Frames</strong> is a highly curated licensing platform offering a collection of scroll-stopping imagery, pre-cleared and ready to use for campaigns.
              </p>

              <button className="bg-black text-white px-8 py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] hover:opacity-80 transition-opacity">
                Create Free Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AuthenticImagery;