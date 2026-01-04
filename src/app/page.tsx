import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/Hero";
import Logos from "@/components/sections/Logos";
import AuthenticImagery from "@/components/sections/AuthenticImagery";
import UnforgettableCampaigns from "@/components/sections/UnforgettableCampaigns";
import NewImagerySlider from "@/components/sections/NewImagerySlider";
import WorkflowFeatures from "@/components/sections/WorkflowFeatures";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#B0B0B0]">
      <Navigation />
      <main>
        <HeroSection />
        <Logos />
        <AuthenticImagery />
        <UnforgettableCampaigns />
        <NewImagerySlider />
        <WorkflowFeatures />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
