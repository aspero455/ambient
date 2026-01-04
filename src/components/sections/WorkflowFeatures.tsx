import React from 'react';
import Image from 'next/image';

/**
 * WorkflowFeatures Component
 * 
 * Clones the "Features designed to streamline your workflow" section from Stills.com.
 * Uses an asymmetrical grid with UI walkthroughs and overlaid product screenshots.
 */

const WorkflowFeatures = () => {
  return (
    <section className="bg-[#B0B0B0] py-[120px] overflow-hidden">
      <div className="container mx-auto px-10 max-w-[1440px]">
        {/* Section Heading */}
        <h2 className="font-display font-light text-[64px] leading-[1.0] tracking-[-0.02em] text-black mb-16 text-center lg:text-left transition-all duration-300">
          Features designed to streamline your workflow.
        </h2>

        {/* Bento-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[40px] items-start">
          
          {/* Left Column: Seamless Collaboration & Expert Assistance */}
          <div className="flex flex-col gap-10 lg:gap-[40px]">
            
            {/* Feature 1: Seamless Collaboration (Boards) */}
            <div className="relative group">
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="A collage of images from Ambient Frames images with controls to arrange the images"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-8 max-w-[400px]">
                <h3 className="font-display font-light text-[32px] leading-[1.1] text-black mb-4">
                  Seamless Collaboration
                </h3>
                <p className="font-sans text-[18px] leading-[1.5] text-[#4A4A4A]">
                  Use Boards to build and share your creative vision with images you can actually license.
                </p>
              </div>
            </div>

            {/* Feature 2: Expert Assistance (Search Form) */}
            <div className="relative group">
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
                  alt="A screenshot of a form to contact Ambient Frames for curated images"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-8 max-w-[400px]">
                <h3 className="font-display font-light text-[32px] leading-[1.1] text-black mb-4">
                  Expert Assistance
                </h3>
                <p className="font-sans text-[18px] leading-[1.5] text-[#4A4A4A]">
                  Our dedicated team of experts is ready to help you find the right image for any and every project.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Streamlined Search & CTA */}
          <div className="flex flex-col gap-10 lg:gap-[40px]">
            
            {/* Feature 3: Streamlined Search (Filters) */}
            <div className="relative group">
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/filters-26.png"
                  alt="A screenshot of intuitive search filters like composition, ratio, color, and more"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-8 max-w-[400px]">
                <h3 className="font-display font-light text-[32px] leading-[1.1] text-black mb-4">
                  Streamlined Search
                </h3>
                <p className="font-sans text-[18px] leading-[1.5] text-[#4A4A4A]">
                  Narrow down your search for the right imagery with intuitive search filters like composition, ratio, color, and more.
                </p>
              </div>
            </div>

            {/* Final CTA Block */}
            <div className="flex flex-col items-start justify-end h-full lg:min-h-[300px] mt-10 lg:mt-0">
              <h3 className="font-display font-light text-[32px] leading-[1.1] text-black mb-8 max-w-[350px]">
                Create career-defining work with Ambient Frames.
              </h3>
              <a 
                href="/register" 
                className="inline-flex items-center justify-center bg-black text-white px-8 py-4 font-sans font-bold text-[12px] uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
              >
                Create Free Account
              </a>
            </div>

          </div>

        </div>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1440px;
        }
      `}</style>
    </section>
  );
};

export default WorkflowFeatures;