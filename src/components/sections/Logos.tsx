"use client";

import React from 'react';

/**
 * Logos component featuring industry partners with infinite marquee animation.
 * Following the provided design system with smooth hover pause effect.
 */

const LOGO_ASSETS = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/google-1.svg", alt: "Google logo", size: 'large' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/netflix-2.svg", alt: "Netflix logo", size: 'large' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/verizon-3.svg", alt: "Verizon logo", size: 'large' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/bmw-4.svg", alt: "BMW logo", size: 'small' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/uber-5.svg", alt: "Uber logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/publicis_groupe-6.svg", alt: "Publicis Groupe logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/goop-7.svg", alt: "Goop logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/tbwa-8.svg", alt: "TBWA logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/mccann-9.svg", alt: "McCann logo", size: 'large' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/ogilvy-10.svg", alt: "Ogilvy logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/loreal-11.svg", alt: "LOreal logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/conde_nast-12.svg", alt: "Conde Nast logo", size: 'medium' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/aesop-13.svg", alt: "Aesop logo", size: 'large' },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/citizens_financial_group-14.svg", alt: "Citizens Financial Group logo", size: 'medium' }
];

const LogoItem: React.FC<{ logo: typeof LOGO_ASSETS[0] }> = ({ logo }) => {
  const sizeClass =
    logo.size === 'small' ? 'h-6' :
      logo.size === 'medium' ? 'h-8' :
        'h-10';

  return (
    <div
      className={`flex-shrink-0 flex items-center justify-center mx-8 md:mx-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${sizeClass}`}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          maxHeight: '100%',
          width: 'auto',
          objectFit: 'contain'
        }}
        className="block"
      />
    </div>
  );
};

const Logos: React.FC = () => {
  // Double the logos for seamless loop
  const allLogos = [...LOGO_ASSETS, ...LOGO_ASSETS];

  return (
    <section className="bg-white py-10 overflow-hidden border-t border-[#E5E5E5]">
      {/* Marquee Container */}
      <div className="relative flex items-center">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee */}
        <div className="animate-marquee flex items-center hover:[animation-play-state:paused]">
          {allLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`} logo={logo} />
          ))}
        </div>
        <div className="animate-marquee flex items-center absolute left-full hover:[animation-play-state:paused]">
          {allLogos.map((logo, index) => (
            <LogoItem key={`logo-dup-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;