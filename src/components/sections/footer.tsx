import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#B3B3B3] pt-20 pb-8 px-6 md:px-12 font-sans border-t border-[#999999]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand/Help Section */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-[48px] leading-tight tracking-tight text-black mb-2">
              Need help finding the right images?
            </h2>
            <p className="text-[14px] text-black/80 font-normal">
              Our team is standing by for all your questions and needs
            </p>
            <a 
              href="/contact" 
              className="mt-4 bg-black text-white text-[12px] font-bold uppercase tracking-[1px] px-8 py-4 w-fit transition-opacity hover:opacity-80"
            >
              Get In Touch
            </a>
          </div>

          {/* This is Stills Section */}
          <div className="lg:ml-auto">
            <h3 className="text-[14px] font-bold text-black uppercase tracking-[1px] mb-8">
              This is Ambient Frames
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/artists" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  Our Artists
                </a>
              </li>
              <li>
                <a href="/articles" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <a href="/categories" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  All Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support Section */}
          <div className="lg:ml-auto">
            <h3 className="text-[14px] font-bold text-black uppercase tracking-[1px] mb-8">
              Help & Support
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/faq" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:support@ambientframes.com" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <a href="tel:+18884175939" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  +1-888-417-5939
                </a>
              </li>
              <li>
                <a href="/contribute" className="text-[14px] text-black/70 hover:text-black transition-colors">
                  Become a Contributor
                </a>
              </li>
            </ul>
          </div>

          {/* FM Family Section */}
          <div className="lg:ml-auto">
            <div className="mb-8">
              <p className="text-[14px] font-bold text-black uppercase tracking-[1px] mb-2 leading-tight">
                FM is a family of brands
              </p>
              <p className="text-[12px] text-black/70">
                dedicated to empowering the creative.
              </p>
            </div>
            <ul className="flex flex-col gap-6">
              <li>
                <a href="#" className="block group">
                  <span className="text-[14px] font-bold text-black block uppercase tracking-[1px]">Filmsupply</span>
                  <span className="text-[12px] text-black/70">Footage licensing for productions</span>
                </a>
              </li>
              <li>
                <a href="#" className="block group">
                  <span className="text-[14px] font-bold text-black block uppercase tracking-[1px]">Musicbed</span>
                  <span className="text-[12px] text-black/70">Music licensing for filmmakers</span>
                </a>
              </li>
              <li>
                <a href="#" className="block group">
                  <span className="text-[14px] font-bold text-black block uppercase tracking-[1px]">Ambient Frames</span>
                  <span className="text-[12px] text-black/70">Professional photography licensing</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <span className="text-[11px] text-black/60">©2026 FM LLC.</span>
            <a href="/privacy" className="text-[11px] text-black/60 hover:text-black">Privacy Policy</a>
            <a href="/license-terms" className="text-[11px] text-black/60 hover:text-black">License Terms</a>
            <a href="/terms" className="text-[11px] text-black/60 hover:text-black">Terms & Conditions</a>
            <a href="/careers" className="text-[11px] text-black/60 hover:text-black">Careers</a>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-black/60 hover:text-black transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-black/60 hover:text-black transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-black/60 hover:text-black transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-black/60 hover:text-black transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;