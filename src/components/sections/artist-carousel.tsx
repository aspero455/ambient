import React from 'react';
import Image from 'next/image';

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
  },
  {
    name: "Fiifi Abban",
    location: "ACCRA, GHANA",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/4-11.png",
    alt: "A person posing in a green floral shirt and green, puffy scarf."
  },
  {
    name: "Lauren Withrow",
    location: "LOS ANGELES, UNITED STATES",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/5-12.png",
    alt: "A person in a a vintage suit standing in a rural, western yard."
  },
  {
    name: "Francesco Gioia",
    location: "LONDON, UNITED KINGDOM",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/6-13.png",
    alt: "A red-stoplight layered over an image of the queen of England in place of her eye."
  },
  {
    name: "Vijay Sarathy",
    location: "CHENNAI, INDIA",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/7-14.png",
    alt: "A woman in a bright, red dress in the distance in a field with a colorful sky."
  },
  {
    name: "Weekend Creative",
    location: "SAN JOSE, UNITED STATES",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/8-15.png",
    alt: "A glass of soda sitting on a pedestal in front of a vibrant purple background."
  },
  {
    name: "Nirav Patel",
    location: "SAN FRANCISCO, UNITED STATES",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4d6b9509-1c19-439f-97bd-4d6ee0783931-stills-com/assets/images/9-16.png",
    alt: "A woman leaning over with eye closed and a reflection of her."
  }
];

const ArtistCarousel = () => {
  return (
    <section className="bg-[#B3B3B3] py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <h4 className="font-display text-[24px] leading-[1.3] text-black">
          New and noteworthy imagery.
        </h4>
      </div>

      <div className="relative w-full">
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-4 -mr-[100vw]">
          {artists.map((artist, index) => (
            <div 
              key={index} 
              className="flex-none w-[320px] md:w-[480px] lg:w-[600px] cursor-pointer group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={artist.image}
                  alt={artist.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 480px, 600px"
                />
              </div>
              <div className="mt-4">
                <p className="text-[16px] font-sans font-medium text-black mb-1">
                  {artist.name}
                </p>
                <p className="text-[11px] font-sans font-medium uppercase text-[#555555] tracking-[0.05em]">
                  {artist.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ArtistCarousel;