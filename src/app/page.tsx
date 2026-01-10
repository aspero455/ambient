import Navigation from "@/components/sections/Navigation";
import HeroEnhanced from "@/components/sections/HeroEnhanced";
import TextTicker from "@/components/sections/TextTicker";
import PhilosophySection from "@/components/sections/PhilosophySection";
import GlowingOrb from "@/components/sections/GlowingOrb";
import PremiumFeatures from "@/components/sections/PremiumFeatures";
import InteractiveProcess from "@/components/sections/InteractiveProcess";
import GalleryShowcase from "@/components/sections/GalleryShowcase";
import TestimonialsEnhanced from "@/components/sections/TestimonialsEnhanced";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CTAEnhanced from "@/components/sections/CTAEnhanced";
import Footer from "@/components/sections/Footer";

import FindPhotosCTA from "@/components/sections/FindPhotosCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main>
        {/* Enhanced Hero Section with animated text reveal and floating elements */}
        <HeroEnhanced />

        {/* Infinite scrolling text marquee */}
        <TextTicker />

        {/* Find Photos CTA Section */}
        <FindPhotosCTA />

        {/* Artistic Vision / Philosophy Section */}
        <PhilosophySection />

        {/* Ambient Light Orb */}
        <GlowingOrb />

        {/* Bento-grid premium features */}
        <PremiumFeatures />

        {/* Interactive step-by-step process */}
        <InteractiveProcess />

        {/* Filterable masonry gallery */}
        <GalleryShowcase />

        {/* Enhanced testimonials with featured card */}
        <TestimonialsEnhanced />

        {/* Interactive FAQ accordion */}
        <FAQSection />

        {/* Newsletter signup section */}
        <NewsletterSection />

        {/* Enhanced call to action section */}
        <CTAEnhanced />
      </main>
      <Footer />
    </div>
  );
}
