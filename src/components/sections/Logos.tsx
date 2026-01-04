import React from 'react';
import Image from 'next/image';

/**
 * Logos component featuring industry partners in a grayscale, minimal style.
 * Following the provided design system:
 * - Color: Grayscale (using opacity/filter)
 * - Layout: Static grid-like flex arrangement
 * - Background: Matches the page background (#B0B0B0)
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

const Logos: React.FC = () => {
  return (
    <section className="bg-[#B0B0B0] py-16 px-5 w-full flex justify-center border-t border-[#999999]/30">
      <div className="max-w-[1440px] w-full">
        {/*
          Using a flex-wrap container with generous gaps to match the "Trusted By Strip" layout.
          The logos are treated with grayscale and 0.7 opacity as per high-level design.
        */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12 transition-opacity duration-500">
          {LOGO_ASSETS.map((logo, index) => {
            const sizeClass = 
              logo.size === 'small' ? 'h-6' : 
              logo.size === 'medium' ? 'h-8' : 
              'h-10';

            return (
              <div 
                key={index} 
                className={`relative flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${sizeClass}`}
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
          })}
        </div>
      </div>
    </section>
  );
};

export default Logos;