import React from 'react';

/**
 * EnterpriseFeatures Component
 * 
 * A pixel-perfect clone of the "Photo licensing for unforgettable campaigns" section.
 * Features a vertical list of benefits with dynamic, large-scale image reveals.
 */

const features = [
  {
    id: 'rates',
    title: 'Customized Set Rates',
    description: "Lock in your team’s rate, so you can save time and license exactly what you need faster than ever.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/1-2.png",
    alt: "A woman in a swimsuit walking out of a dark, wet cave."
  },
  {
    id: 'agency',
    title: 'Agency-Friendly Process',
    description: "Streamline your process with exclusive agency benefits: watermark-free imagery, collaboration tools, and more.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/2-3.png",
    alt: "A black and white image of a person standing in a foggy field."
  },
  {
    id: 'service',
    title: 'Dedicated Service Team',
    description: "Experience seamless onboarding and quick response times from our dedicated customer success team.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/3-4.png",
    alt: "A blurred image of bright yellow flowers"
  }
];

export default function EnterpriseFeatures() {
  return (
    <section className="bg-[#B3B3B3] pt-[120px] pb-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header Content */}
        <div className="max-w-[700px] mb-[60px]">
          <h2 className="font-display text-[64px] font-normal leading-[1.1] mb-10 text-black">
            Photo licensing for unforgettable campaigns.
          </h2>
          <p className="font-sans text-[16px] leading-[1.6] text-black mb-10 max-w-[580px]">
            Streamline your creative process and save time and money with agency-friendly pricing options and exclusive team benefits.
          </p>
          <button className="bg-black text-white px-[24px] py-[12px] text-[12px] font-bold uppercase tracking-[1px] hover:opacity-80 transition-opacity">
            Create Free Account
          </button>
        </div>

        {/* Features Split Layout */}
        <div className="flex flex-col md:flex-row gap-x-[60px] items-start mt-[80px]">
          {/* Main Visual Image (Primary/Active reveal area) */}
          <div className="w-full md:w-1/2 relative overflow-hidden group mb-10 md:mb-0">
            <div className="aspect-[4/5] relative bg-black/5">
              {/* Note: In the original this is a dynamic interaction where images swap. 
                  For a clean clone we will display the stack or primary image focus */}
              <img 
                src={features[0].image} 
                alt={features[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vertical Feature List */}
          <div className="w-full md:w-1/2 flex flex-col items-start pt-4">
            <div className="relative">
              {/* Vertical path line */}
              <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-[#999999]/40" />
              
              <div className="space-y-[80px]">
                {features.map((feature, index) => (
                  <div key={feature.id} className="relative pl-[40px] group">
                    {/* Vertical dot/marker */}
                    <div className={`absolute left-0 top-3 w-[7px] h-[7px] border border-black rounded-full bg-transparent ${index === 0 ? 'bg-black' : ''}`} />
                    
                    <h4 className="font-display text-[24px] font-normal leading-[1.3] text-black mb-4">
                      {feature.title}
                    </h4>
                    <p className="font-sans text-[16px] leading-[1.6] text-[#555555] max-w-[420px]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[80px] md:hidden">
              <button className="bg-black text-white px-[24px] py-[12px] text-[12px] font-bold uppercase tracking-[1px]">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}