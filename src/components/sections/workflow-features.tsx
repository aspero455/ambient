import React from 'react';
import Image from 'next/image';

const WorkflowFeatures = () => {
  return (
    <section className="bg-[#B3B3B3] py-[120px] px-6">
      <div className="max-width-[1280px] mx-auto">
        <h2 className="text-[64px] font-display font-normal text-black leading-[1.1] text-center mb-[80px] max-w-[800px] mx-auto">
          Features designed to streamline your workflow.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[120px]">
          {/* Top Left: Seamless Collaboration (Boards) */}
          <div className="flex flex-col">
            <div className="relative mb-8 bg-[#C2C2C2]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/boards-24.png"
                alt="A collage of images from Stills images with controls to arrange the images"
                width={628}
                height={471}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="max-w-[440px]">
              <h3 className="text-[32px] font-display font-normal text-black mb-4">
                Seamless Collaboration
              </h3>
              <p className="text-[16px] font-sans text-black leading-relaxed">
                Use Boards to build and share your creative vision with images you can actually license.
              </p>
            </div>
          </div>

          {/* Top Right: Streamlined Search (Filters) */}
          <div className="flex flex-col md:mt-[120px]">
            <div className="relative mb-8 bg-[#C2C2C2]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/filters-26.png"
                alt="A search interface showing various filters for color and composition"
                width={628}
                height={471}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="max-w-[440px]">
              <h3 className="text-[32px] font-display font-normal text-black mb-4">
                Streamlined Search
              </h3>
              <p className="text-[16px] font-sans text-black leading-relaxed">
                Narrow down your search for the right imagery with intuitive search filters like composition, ratio, color, and more.
              </p>
            </div>
          </div>

          {/* Bottom Left: Expert Assistance (Contact Form UI Overlay on image) */}
          <div className="flex flex-col">
            <div className="relative mb-8 bg-[#C2C2C2]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/image-search-25.png"
                alt="A red textured background with a white contact form overlay"
                width={628}
                height={471}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="max-w-[440px]">
              <h3 className="text-[32px] font-display font-normal text-black mb-4">
                Expert Assistance
              </h3>
              <p className="text-[16px] font-sans text-black leading-relaxed">
                Our dedicated team of experts is ready to help you find the right image for any and every project.
              </p>
            </div>
          </div>

          {/* Bottom Right: Call to Action */}
          <div className="flex flex-col justify-end md:pb-8">
            <div className="max-w-[440px]">
              <h3 className="text-[32px] font-display font-normal text-black mb-8 leading-tight">
                Create career-defining work with Stills.
              </h3>
              <button className="bg-black text-white text-[12px] font-bold uppercase tracking-[1px] px-8 py-4 inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-80">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowFeatures;