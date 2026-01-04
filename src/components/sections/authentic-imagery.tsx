import React from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Trendsetting Curation",
    description: "Make your project stand out with meticulously curated collections of authentic, relevant photos.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/auth_slide_1_desktop-27.jpg",
    alt: "Black and white image of horses in a field"
  },
  {
    id: 2,
    title: "Not Shot for Stock",
    description: "License relevant photos authentically captured by a roster of passionate photographers and artists.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/auth_slide_2_desktop-28.jpg",
    alt: "A silhouetted person standing in front of a golden sky"
  },
  {
    id: 3,
    title: "Rights Fully Cleared",
    description: "Impress your clients with pre-cleared, authentic imagery—immediately ready to license for all your projects.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/auth_slide_3_desktop-29.jpg",
    alt: "A look up and an illuminated-red person."
  }
];

export default function AuthenticImagery() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  // Auto-slide functionality (optional for clone accuracy)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#B3B3B3] py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          
          {/* Left Column: Image Carousel with Text Overlays */}
          <div className="relative aspect-[4/5] lg:aspect-square w-full">
            <div className="relative w-full h-full overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover grayscale"
                    priority={index === 0}
                  />
                  
                  {/* Text Overlay on Image */}
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 sm:p-12 text-white">
                    <div className="max-w-md">
                      {/* Swiper Pagination Style Dots */}
                      <div className="flex gap-2 mb-6">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i === activeSlide ? 'bg-white' : 'bg-white/40'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-8 h-[1px] bg-white mb-4" />
                        <h3 className="font-display text-[32px] md:text-[40px] leading-tight mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-[14px] md:text-[16px] leading-relaxed opacity-90 max-w-[320px]">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Descriptive Block */}
          <div className="flex flex-col justify-center">
            <div className="max-w-[500px]">
              <h2 className="font-display text-[48px] md:text-[64px] leading-[1.1] mb-8 tracking-tight text-black">
                Authentic imagery. All killer, no filler.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-black/80 font-sans">
                <span className="font-bold">Stills</span> is a highly curated licensing platform offering a collection of scroll-stopping imagery, pre-cleared and ready to use for campaigns.
              </p>
              
              <button 
                className="bg-black text-white px-8 py-4 font-bold uppercase text-[12px] tracking-[2px] transition-all hover:opacity-80 inline-block w-fit"
              >
                CREATE FREE ACCOUNT
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CSS for custom transitions if needed, otherwise tailwind handles it */}
      <style jsx global>{`
        /* Minimal responsive adjustments for Denton font scale if not perfectly matched by tailwind */
        h2 {
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
}