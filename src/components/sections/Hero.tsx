import React from 'react';
import Image from 'next/image';

/**
 * Hero Section
 * 
 * Features a large editorial heading, description, and a stylized collage of images.
 * Adheres to the light theme with a mid-tone gray background (#B0B0B0).
 */
const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#B0B0B0] pt-[120px] pb-[80px] md:pt-[160px] md:pb-[120px]">
      <div className="container mx-auto px-10 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Text Content - Left Side */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start z-10">
            <div className="space-y-8">
              <h1 className="font-display font-light text-[64px] leading-[0.9] tracking-[-0.03em] text-black md:text-[96px] lg:text-[120px]">
                Image is everything.<sup className="text-[0.4em] align-top mt-[0.2em] inline-block font-sans font-semibold">TM</sup>
              </h1>
              
              <p className="font-sans text-[18px] leading-[1.5] text-[#4A4A4A] max-w-[480px]">
                When the image <i className="italic">is</i> the campaign, make it count. License authentic, relevant photos on <span className="font-bold text-black">Ambient Frames:</span> stock photography redefined.
              </p>
              
              <div className="pt-4">
                <button className="bg-black text-white px-8 py-5 font-sans font-bold text-[12px] tracking-[0.15em] uppercase transition-opacity hover:opacity-85 shadow-lg active:scale-[0.98]">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>

          {/* Image Collage - Right Side */}
          <div className="md:col-span-6 lg:col-span-7 relative flex justify-end items-center h-[500px] md:h-[700px]">
            <div className="relative w-full h-full max-w-[700px]">
              {/* Main Collage Image - Replicating the "hero-1.webp" structure */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full aspect-[1.1] z-0">
                <Image
                  src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop"
                  alt="Collage of images by Ambient Frames artists."
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Decorative elements to simulate the editorial overlapping collage feel if the single image doesn't cover the full aesthetic */}
              {/* Based on common editorial patterns in the screenshots */}
              <div className="hidden lg:block absolute -right-12 top-0 w-24 h-full bg-[#B0B0B0] opacity-20 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Background Subtle Gradient/Texture Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
    </section>
  );
};

export default HeroSection;