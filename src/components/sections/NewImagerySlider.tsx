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
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    alt: "A macro shot of a ladybug climbing on a leaf."
  },
  {
    name: "Liz Bretz",
    location: "LOS ANGELES, UNITED STATES",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    alt: "A retro image of a woman sitting at a table with a telephone wire wrapped around her."
  },
  {
    name: "Tanguy Troude",
    location: "PARIS, FRANCE",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    alt: "A silhouetted hand held up in front of the moon in the sky."
  },
  {
    name: "Joseph Saraceno",
    location: "TORONTO, CANADA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    alt: "An array of vintage decor laying on a table."
  },
  {
    name: "Gianluca Mortarotti",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    alt: "A elder man in a suit smoking a cigarette."
  },
  {
    name: "Aly Kula",
    location: "BROOKLYN, UNITED STATES",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
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