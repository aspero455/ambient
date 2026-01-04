"use client";

import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-[80px] pb-[80px] md:pt-[120px] md:pb-[100px]">
      <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Left Side */}
          <div className="flex flex-col items-start z-10 order-2 lg:order-1">
            <div className="max-w-[600px]">
              <h1 className="font-serif text-[60px] md:text-[80px] lg:text-[100px] leading-[1] tracking-tight text-black mb-6">
                Image is<br />
                everything.<sup className="text-[0.4em] align-top mt-[0.2em] inline-block font-sans font-semibold">TM</sup>
              </h1>
              
              <p className="font-sans text-[18px] leading-[1.6] text-[#666] mb-8 max-w-[480px]">
                When the image <i className="italic">is</i> the campaign, make it count. License authentic, relevant photos on <span className="font-bold text-black">Ambient Frames:</span> stock photography redefined.
              </p>
              
              <div>
                <button className="bg-black text-white px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] uppercase transition-all hover:bg-[#333]">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>

          {/* Image Collage - Right Side */}
          <div className="relative h-[500px] md:h-[650px] order-1 lg:order-2">
            <div className="relative w-full h-full">
              {/* Main Vertical Image (Car/Night) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[65%] h-[90%] z-10 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                  alt="Atmospheric car at night"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Top Right Portrait */}
              <div className="absolute right-[5%] top-[0%] w-[45%] h-[45%] z-20 overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
                  alt="Portrait photography"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Center Right Red Image */}
              <div className="absolute right-[10%] top-[40%] w-[35%] h-[35%] z-30 overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                  alt="Creative editorial photography"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>

              {/* Bottom Right Water Image */}
              <div className="absolute right-[0%] bottom-[5%] w-[40%] h-[40%] z-10 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1505118380757-91f5f45d8de6?auto=format&fit=crop&q=80&w=600"
                  alt="Ocean waves photography"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
