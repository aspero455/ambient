"use client";

import React from 'react';
import Image from 'next/image';

const UnforgettableCampaigns = () => {
  const assets = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"
  ];

  return (
    <section className="bg-[#B0B0B0] py-[120px] font-sans">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Content Side */}
          <div className="flex-1 max-w-[500px]">
            <div className="mb-20">
              <h2 className="font-display font-light text-[64px] leading-[1.0] tracking-[-0.02em] text-black mb-6">
                Photo licensing for unforgettable campaigns.
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-[1.5] mb-8">
                Streamline your creative process and save time and money with agency-friendly pricing options and exclusive team benefits.
              </p>
              <button className="bg-black text-white text-[12px] font-bold uppercase tracking-[0.15em] px-8 py-4 hover:opacity-80 transition-opacity">
                Create Free Account
              </button>
            </div>

            {/* Vertical Features List */}
            <div className="relative">
              {/* Vertical Progress Line Overlay (Visual Representation) */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-[#999999]/30">
                <div className="absolute left-0 top-0 w-[2px] h-[33%] bg-black" />
              </div>

              <div className="pl-10 space-y-16">
                {/* Feature 1 */}
                <div className="group">
                  <h4 className="font-display font-light text-[32px] mb-4 text-black">
                    Customized Set Rates
                  </h4>
                  <p className="text-[#4A4A4A] text-lg leading-[1.6]">
                    Lock in your team’s rate, so you can save time and license exactly what you need faster than ever.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="group opacity-50 transition-opacity hover:opacity-100">
                  <h4 className="font-display font-light text-[32px] mb-4 text-black">
                    Agency-Friendly Process
                  </h4>
                  <p className="text-[#4A4A4A] text-lg leading-[1.6]">
                    Streamline your process with exclusive agency benefits: watermark-free imagery, collaboration tools, and more.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="group opacity-50 transition-opacity hover:opacity-100">
                  <h4 className="font-display font-light text-[32px] mb-4 text-black">
                    Dedicated Service Team
                  </h4>
                  <p className="text-[#4A4A4A] text-lg leading-[1.6]">
                    Experience seamless onboarding and quick response times from our dedicated customer success team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Side (Scroll-linked feel) */}
          <div className="flex-1">
            <div className="sticky top-20 flex flex-col gap-10">
              {/* Feature images tied to the vertical scroll list */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl">
                <Image 
                  src={assets[0]} 
                  alt="A woman in a swimsuit walking out of a dark, wet cave."
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Hidden additional images to suggest depth - in a real implementation these would cross-fade on scroll */}
              <div className="hidden lg:block relative aspect-[4/5] w-2/3 ml-auto -mt-40 z-10 overflow-hidden shadow-2xl">
                 <Image 
                  src={assets[1]} 
                  alt="A black and white image of a person standing in a foggy field."
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden lg:block relative aspect-[4/5] w-1/2 -mt-60 -ml-10 z-20 overflow-hidden shadow-2xl">
                 <Image 
                  src={assets[2]} 
                  alt="A blurred image of bright yellow flowers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image Display (Fallback for stacked layout) */}
      <div className="lg:hidden mt-20 px-10 grid grid-cols-1 gap-10">
        <Image src={assets[1]} alt="Agency benefit visual" width={800} height={1000} className="w-full object-cover shadow-xl" />
        <Image src={assets[2]} alt="Dedicated team visual" width={800} height={1000} className="w-full object-cover shadow-xl" />
      </div>
    </section>
  );
};

export default UnforgettableCampaigns;