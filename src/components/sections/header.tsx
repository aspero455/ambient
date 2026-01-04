import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center bg-[#B3B3B3] z-[1000]">
      {/* Top Multi-Level Navigation Bar */}
      <div className="w-full h-[40px] bg-black text-white px-6 flex items-center justify-between border-b border-[#333333]">
        {/* Brand Links */}
        <div className="flex items-center gap-0">
          <a 
            href="https://www.musicbed.com/" 
            className="text-[11px] font-bold tracking-[1px] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            Musicbed
          </a>
          <span className="mx-3 opacity-30 text-[11px] font-normal">|</span>
          <a 
            href="https://www.filmsupply.com/" 
            className="text-[11px] font-bold tracking-[1px] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            Filmsupply
          </a>
          <span className="mx-3 opacity-30 text-[11px] font-normal">|</span>
          <a 
            href="/" 
            className="text-[11px] font-bold tracking-[1px] uppercase opacity-100"
          >
            Stills
          </a>
        </div>

        {/* Contact/Support Links */}
        <div className="flex items-center gap-6">
          <Link 
            href="/contact" 
            className="text-[11px] font-bold tracking-[0.5px] opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            Contact Us
          </Link>
          <a 
            href="https://support.stills.com/" 
            className="text-[11px] font-bold tracking-[0.5px] opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            Support
          </a>
          <a 
            href="tel:+1-888-417-5939" 
            className="text-[11px] font-bold tracking-[0.5px] opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            (888) 417-5939
          </a>
        </div>
      </div>

      {/* Primary Row Navigation */}
      <div className="w-full h-[80px] bg-[#B3B3B3] px-6 border-b border-[#999999] flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Menu Icon (Placeholder/Standard Layout) */}
          <div className="md:hidden mr-4">
            <svg 
              width="24" 
              height="20" 
              viewBox="0 0 24 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <rect width="24" height="2" fill="black" />
              <rect y="9" width="24" height="2" fill="black" />
              <rect y="18" width="24" height="2" fill="black" />
            </svg>
          </div>

          {/* Logo */}
          <Link href="/" className="mr-12 scale-110">
            <svg 
              viewBox="0 0 160 32" 
              className="h-8 w-auto fill-black"
              aria-label="Ambient Frames / Stills Logo"
            >
              <path d="M14.2 26.2c-2.3 0-4.2-.7-5.5-2.2-1.3-1.5-2-3.6-2-6.2 0-2.6.7-4.6 2-6.1 1.3-1.5 3.2-2.2 5.5-2.2s4.2.7 5.5 2.2c1.3 1.5 2 3.6 2 6.1 0 2.6-.7 4.7-2 6.2-1.3 1.5-3.2 2.2-5.5 2.2zm11 1.3c1.4-1.5 2.2-3.6 2.2-6.5h3.4c0 3.8-1.1 6.8-3.2 8.8s-5 3-8.8 3c-4.2 0-7.5-1.1-10-3.3s-3.7-5.2-3.7-9.2c0-3.8 1.2-6.8 3.5-9s5.6-3.3 9.8-3.3c3.8 0 7 1.1 9.4 3.3s3.6 5.5 3.6 9.8V22h-17.6c.1 2.3.6 4 1.5 5.2s2.2 1.8 3.9 1.8c2.1 0 3.8-status.5 4.9-1.5zM44.5 1h3.3v29.5h-3.3V1zM58 1h3.3v29.5H58V1zM78.2 31c-3.1 0-5.6-1-7.4-2.9-1.9-1.9-2.8-4.6-2.8-8V10.1h3.3v10.1c0 2.5.6 4.4 1.8 5.7 1.2 1.3 2.9 2 5.1 2 2.2 0 3.9-.7 5.1-2 1.2-1.3 1.8-3.2 1.8-5.7V10.1h3.3v20.4h-3.3V28.3c-.9 1-2 1.8-3.3 2.3-1.3.4-2.5.4-3.8.4zM102.3 31c-3.3 0-6.1-1-8.3-3.1-2.2-2.1-3.3-4.9-3.3-8.4 0-3.5 1.1-6.3 3.3-8.4 2.2-2.1 5-3.1 8.3-3.1 3.2 0 5.6 1 7.2 2.9v-2s0-4.3-.9-5.9c-.9-1.6-2.6-2.4-5.1-2.4-2.6 0-4.4.8-5.2 2.4l-2.6-1.5c1.4-2.7 4.1-4.2 7.8-4.2s6.5 1.2 8.1 3.7c1.6 2.5 1.6 6.1 1.6 11V31h-3.3v-2.3c-1.6 1.5-4 2.3-7.2 2.3zm.8-3.3c2.3 0 4.2-.7 5.5-2.2 1.3-1.5 2-3.6 2-6.1 0-2.6-.7-4.6-2-6.1-1.3-1.5-3.2-2.2-5.5-2.2s-4.2.7-5.5 2.2c-1.3 1.5-2 3.6-2 6.1 0 2.6.7 4.7 2 6.2s3.2 2.1 5.5 2.1zM128 31c-3.8 0-6.9-1.1-9.4-3.3-2.5-2.2-3.7-5.5-3.7-9.8 0-4.3 1.3-7.5 3.8-9.8s5.9-3.3 10-3.3c3.8 0 7 1.1 9.4 3.3s3.6 5.5 3.6 9.8V22h-17.6c.1 2.3.6 4 1.5 5.2 1 1.2 2.3 1.8 3.9 1.8 2.1 0 3.8-.5 4.9-1.5 1.1-1 1.9-2.5 1.9-4.5h3.4c-.1 2.9-.9 5.0-2.2 6.5-1.4 1.5-3.5 2.3-6.5 2.3c3.8-3.8 1-6.8-3.2-8.8s-5-3-8.8-3c.8-1.5 3.2-2.2 5.5-2.2s4.2.7 5.5 2.2c1.3 1.5 2 3.6 2 6.1 0 2.6-.7 4.7-2 6.2-1.3 1.5-3.2 2.2-5.5 2.2zM151.7 31c-3.2 0-5.7-1.1-7.4-3.3l2.2-2.3c1.3 1.6 3.1 2.4 5.2 2.4s3.7-.8 4.7-2.3c1-1.5 1.5-3.6 1.5-6.2l-.1-1.7V17c-.7 1.1-1.6 1.9-2.7 2.4-1.1.5-2.4.8-3.9.8-3 0-5.4-1-7.1-3.1-1.7-2.1-2.6-5-2.6-8.6 0-3.6.9-6.4 2.6-8.4 1.7-2.1 4.1-3.1 7.1-3.1 1.5 0 2.8.3 3.9.8s2 1.3 2.7 2.4V1h3.3v17c0 4.1-1.1 7.4-3.2 9.7-2.1 2.3-5 3.3-8.8 3.3zm-.1-14.7c2.3 0 4.2-.7 5.5-2.2 1.3-1.5 2-3.6 2-6.1s-.7-4.6-2-6.1c-1.3-1.5-3.2-2.2-5.5-2.2s-4.2.7-5.5 2.2c-1.3 1.5-2 3.5-2 6.1 0 2.5.7 4.6 2 6.1 1.3 1.5 3.2 2.2 5.5 2.2z" />
            </svg>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              href="/stock-images" 
              className="flex items-center gap-1.5 text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              <Search className="w-4 h-4" />
              Images
            </Link>
            <Link 
              href="/artists" 
              className="text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Artists
            </Link>
            <Link 
              href="/categories" 
              className="text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
            >
              Categories
            </Link>
            <div 
              className="text-[15px] font-medium text-black cursor-pointer hover:opacity-70 transition-opacity"
            >
              Enterprise
            </div>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
          <button 
            className="hidden md:block text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
          >
            Login
          </button>
          <button 
            className="bg-black text-white text-[12px] font-bold uppercase tracking-[1px] px-[22px] py-[14px] leading-tight hover:opacity-80 transition-all duration-300 whitespace-nowrap"
            id="registerClientSplash"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;