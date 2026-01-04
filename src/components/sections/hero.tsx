import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative bg-[#B3B3B3] pt-[60px] pb-[120px] md:pt-[100px] md:pb-[160px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[60px]">
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <div className="mb-10">
              <h1 className="font-display text-[96px] font-light leading-[0.95] tracking-tight text-black mb-6">
                Image is everything.<sup className="text-[24px] align-top relative top-[15px] ml-1">TM</sup>
              </h1>
              <p className="font-sans text-[20px] leading-[1.4] text-black max-w-[480px]">
                When the image <i>is</i> the campaign, make it count. License authentic, relevant photos on <strong>Stills:</strong> stock photography redefined.
              </p>
            </div>
            
            <button className="bg-black text-white font-bold uppercase text-[12px] tracking-[2px] px-10 py-4 inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-80 rounded-none">
              Create Free Account
            </button>
          </div>

          {/* Overlapping Image Collage */}
          <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[600px] flex justify-center md:justify-end">
            <div className="relative w-full max-w-[540px]">
              {/* Main Underneath Image (Left) */}
              <div className="absolute top-0 left-0 w-[85%] aspect-[3/4] z-0 overflow-hidden shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/musicbed-marketing/image/upload/f_auto,q_auto:best,w_1400/stills/homepage/hero.webp" 
                  alt="Atmospheric landscape with car"
                  className="w-full h-full object-cover scale-110 -translate-x-10"
                />
              </div>

              {/* Top Overlapping Portrait Image */}
              <div className="absolute top-[-40px] right-[-20px] w-[55%] aspect-[4/5] z-20 overflow-hidden shadow-2xl border-white border-[1px]">
                 <img 
                  src="https://res.cloudinary.com/musicbed-marketing/image/upload/f_auto,q_auto:best,w_1400/stills/homepage/hero.webp" 
                  alt="Portrait of a man"
                  className="w-full h-full object-cover scale-[1.3] object-top translate-y-[-10%]"
                />
              </div>

              {/* Bottom Overlapping Red Tone Image */}
              <div className="absolute bottom-[10%] right-[10%] w-[45%] aspect-[1/1] z-30 overflow-hidden shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/musicbed-marketing/image/upload/f_auto,q_auto:best,w_1400/stills/homepage/hero.webp" 
                  alt="Abstract red textured artwork"
                  className="w-full h-full object-cover scale-[1.8] translate-x-10"
                />
              </div>

              {/* Edge Image (Right silhouette) */}
              <div className="absolute bottom-[-20px] right-[-40px] w-[50%] aspect-[4/5] z-10 overflow-hidden shadow-lg opacity-90 blur-[1px]">
                 <img 
                  src="https://res.cloudinary.com/musicbed-marketing/image/upload/f_auto,q_auto:best,w_1400/stills/homepage/hero.webp" 
                  alt="Silhouette by the sea"
                  className="w-full h-full object-cover scale-[1.2] translate-x-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay / Background texture subtlety */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
    </section>
  );
};

export default Hero;