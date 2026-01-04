import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#B0B0B0] text-black pt-[120px] pb-10 border-t border-[#999999]">
      <div className="container mx-auto px-10">
        {/* Help Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-[120px]">
          <div>
            <h2 className="font-display font-light text-[64px] leading-[1.0] tracking-[-0.02em] mb-6">
              Need help finding the <br /> right images?
            </h2>
            <p className="font-sans text-[18px] text-[#4A4A4A] mb-8">
              Our team is standing by for all your questions and needs
            </p>
            <button className="bg-black text-white px-8 py-4 font-sans font-bold uppercase tracking-[0.15em] text-[12px] hover:opacity-80 transition-all duration-300">
              Get in Touch
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* This is Stills Column */}
            <div>
              <h4 className="font-sans font-semibold text-[14px] mb-6">This is Stills</h4>
              <ul className="space-y-4">
                <li><a href="/artists" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Our Artists</a></li>
                <li><a href="/articles" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Articles</a></li>
                <li><a href="/categories" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">All Categories</a></li>
              </ul>
            </div>

            {/* Help & Support Column */}
            <div>
              <h4 className="font-sans font-semibold text-[14px] mb-6">Help & Support</h4>
              <ul className="space-y-4">
                <li><a href="https://support.stills.com" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">FAQ</a></li>
                <li><a href="/contact" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Email Us</a></li>
                <li><a href="tel:+1-888-417-5939" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">+1-888-417-5939</a></li>
                <li><a href="/contributor" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Become a Contributor</a></li>
              </ul>
            </div>

            {/* FM Brands Column */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-sans text-[12px] text-[#4A4A4A] leading-relaxed mb-6">
                <strong>FM</strong> is a family of brands dedicated to empowering the creative.
              </p>
              <div className="space-y-6">
                <div>
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1">Filmsupply</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">Footage licensing for productions</p>
                </div>
                <div>
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1">Musicbed</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">Music licensing for filmmakers</p>
                </div>
                <div>
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1">Stills</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">Professional photography licensing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#999999] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A]">©2026 FM LLC.</span>
            <a href="/privacy" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Privacy Policy</a>
            <a href="/license" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">License Terms</a>
            <a href="/terms" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Terms & Conditions</a>
            <a href="/careers" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Careers</a>
          </div>

          <div className="flex items-center gap-8">
            <a href="https://twitter.com" className="text-[#4A4A4A] hover:text-black transition-colors">
              <Twitter size={18} strokeWidth={2} />
            </a>
            <a href="https://facebook.com" className="text-[#4A4A4A] hover:text-black transition-colors">
              <Facebook size={18} strokeWidth={2} />
            </a>
            <a href="https://instagram.com" className="text-[#4A4A4A] hover:text-black transition-colors">
              <Instagram size={18} strokeWidth={2} />
            </a>
            <a href="https://linkedin.com" className="text-[#4A4A4A] hover:text-black transition-colors">
              <Linkedin size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;