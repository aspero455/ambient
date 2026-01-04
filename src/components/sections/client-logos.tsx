import React from 'react';
import Image from 'next/image';

const logos = [
  {
    name: "Google",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/google-1.svg",
    className: "w-[120px] h-auto"
  },
  {
    name: "Netflix",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/netflix-2.svg",
    className: "w-[110px] h-auto"
  },
  {
    name: "Verizon",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/verizon-3.svg",
    className: "w-[115px] h-auto"
  },
  {
    name: "BMW",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/bmw-4.svg",
    className: "w-[40px] h-auto"
  },
  {
    name: "Uber",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/uber-5.svg",
    className: "w-[85px] h-auto"
  },
  {
    name: "Publicis Groupe",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/publicis_groupe-6.svg",
    className: "w-[50px] h-auto"
  },
  {
    name: "Goop",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/goop-7.svg",
    className: "w-[85px] h-auto"
  },
  {
    name: "TBWA",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/tbwa-8.svg",
    className: "w-[85px] h-auto"
  },
  {
    name: "McCann",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/mccann-9.svg",
    className: "w-[110px] h-auto"
  },
  {
    name: "Ogilvy",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/ogilvy-10.svg",
    className: "w-[85px] h-auto"
  },
  {
    name: "L'Oréal",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/loreal-11.svg",
    className: "w-[125px] h-auto"
  },
  {
    name: "Condé Nast",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/conde_nast-12.svg",
    className: "w-[125px] h-auto"
  },
  {
    name: "Aesop",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/aesop-13.svg",
    className: "w-[105px] h-auto"
  },
  {
    name: "Citizens Financial Group",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/svgs/citizens_financial_group-14.svg",
    className: "w-[130px] h-auto"
  }
];

const ClientLogos = () => {
  return (
    <section 
      className="w-full bg-[#B3B3B3] overflow-hidden" 
      style={{ padding: '0 0 64px 0' }}
    >
      <div 
        className="flex flex-wrap items-center justify-center gap-x-[40px] gap-y-[40px] md:gap-x-[60px] md:gap-y-[48px] px-8 max-w-[1400px] mx-auto opacity-[0.45]"
        style={{ transition: 'opacity 0.3s ease' }}
      >
        {/* Row 1 */}
        <div className="flex flex-wrap justify-center items-center gap-x-[40px] md:gap-x-[60px] w-full">
          {logos.slice(0, 7).map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className={`${logo.className} grayscale contrast-125 hover:grayscale-0 transition-all duration-500`}
                style={{ filter: 'brightness(0)' }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-center items-center gap-x-[40px] md:gap-x-[60px] w-full">
          {logos.slice(7, 14).map((logo, index) => (
            <div 
              key={`${logo.name}-row2-${index}`} 
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className={`${logo.className} grayscale contrast-125 hover:grayscale-0 transition-all duration-500`}
                style={{ filter: 'brightness(0)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;