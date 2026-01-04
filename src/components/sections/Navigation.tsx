import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="w-full flex flex-col sticky top-0 z-[100]">
      {/* Top Tier: Dark Brand Bar */}
      <div className="bg-[#1A1A1A] w-full py-[10px] px-6 md:px-10 flex justify-between items-center border-b border-[#333333]">
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.15em]">
          <Link href="https://www.musicbed.com/" className="text-white hover:opacity-70 transition-opacity">
            Musicbed
          </Link>
          <span className="text-[#4A4A4A]">|</span>
          <Link href="https://www.filmsupply.com/" className="text-white hover:opacity-70 transition-opacity">
            Filmsupply
          </Link>
          <span className="text-[#4A4A4A]">|</span>
          <Link href="/" className="text-white">
            Ambient Frames
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#999999]">
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="https://support.stills.com/" className="hover:text-white transition-colors">Support</Link>
          <Link href="tel:+1-888-417-5939" className="hover:text-white transition-colors">(888) 417-5939</Link>
        </div>
      </div>

      {/* Bottom Tier: Main Nav Bar */}
      <div className="bg-white/95 backdrop-blur-sm w-full h-[80px] px-6 md:px-10 flex justify-between items-center border-b border-[#E5E5E5]">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4">
            <span className="font-display text-[26px] tracking-tight font-light flex items-center">
              Ambient Frames
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
            <Link href="/stock-images" className="flex items-center gap-2 group">
              <Search size={16} className="text-[#4A4A4A] group-hover:text-black transition-colors" />
              <span className="text-black">Images</span>
            </Link>
            <Link href="/artists" className="text-[#4A4A4A] hover:text-black transition-colors">
              Artists
            </Link>
            <Link href="/categories" className="text-[#4A4A4A] hover:text-black transition-colors">
              Categories
            </Link>
            <Link href="/enterprise" className="text-[#4A4A4A] hover:text-black transition-colors">
              Enterprise
            </Link>
          </div>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-[13px] font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
          >
            Login
          </Link>
          <button className="bg-black text-white text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-[14px] hover:opacity-80 transition-all">
            Create Free Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;