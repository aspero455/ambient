import React from 'react';

/**
 * ArtistImagerySlider component
 * 
 * Clones the "New and noteworthy imagery" horizontal slider section.
 * Features artistic portraits/landscapes with artist names and locations.
 */

const artists = [
  {
    name: "Luke Davis",
    location: "POOLE, UNITED KINGDOM",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/1-5.png",
    alt: "A macro shot of a ladybug climbing on a leaf."
  },
  {
    name: "Liz Bretz",
    location: "LOS ANGELES, UNITED STATES",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/2-6.png",
    alt: "A retro image of a woman sitting at a table with a telephone wire wrapped around her."
  },
  {
    name: "Tanguy Troude",
    location: "PARIS, FRANCE",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/3-7.png",
    alt: "A silhouetted hand held up in front of the moon in the sky."
  },
  {
    name: "Joseph Saraceno",
    location: "TORONTO, CANADA",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/1-8.png",
    alt: "An array of vintage decor laying on a table."
  },
  {
    name: "Gianluca Mortarotti",
    location: "LONDON, UNITED KINGDOM",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/2-9.png",
    alt: "A elder man in a suit smoking a cigarette."
  },
  {
    name: "Aly Kula",
    location: "BROOKLYN, UNITED STATES",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/3-10.png",
    alt: "A young woman posing with a bright, red jacket hanging on her shoulder."
  }
];

const NewImagerySlider = () => {
  return (
    <section className="bg-[#B0B0B0] py-[120px] overflow-hidden">
      <div className="container mx-auto px-10 mb-12">
        <h4 className="font-display text-[32px] font-light leading-[1.1] tracking-tight text-black">
          New and noteworthy imagery.
        </h4>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto no-scrollbar gap-10 px-10 pb-4 snap-x snap-mandatory">
          {artists.map((artist, index) => (
            <div 
              key={artist.name + index} 
              className="flex-none w-[320px] md:w-[420px] snap-start"
            >
              <div className="aspect-[4/5] bg-neutral-300 overflow-hidden mb-6">
                <img
                  src={artist.image}
                  alt={artist.alt}
                  className="w-full h-full object-cover grayscale-0 transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-[12px] font-bold uppercase tracking-widest text-black">
                  {artist.name}
                </p>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]">
                  {artist.location}
                </p>
              </div>
            </div>
          ))}
          {/* Duplicate some for initial scroll feeling if needed, but the provided list is sufficient for the visual layout */}
          <div className="flex-none w-[420px] snap-start" />
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default NewImagerySlider;