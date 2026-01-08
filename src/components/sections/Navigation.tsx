"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Country flag emoji mapping
const countryFlags: { [key: string]: string } = {
  'IN': '🇮🇳',
  'US': '🇺🇸',
  'GB': '🇬🇧',
  'CA': '🇨🇦',
  'AU': '🇦🇺',
  'DE': '🇩🇪',
  'FR': '🇫🇷',
  'JP': '🇯🇵',
  'CN': '🇨🇳',
  'BR': '🇧🇷',
  'RU': '🇷🇺',
  'AE': '🇦🇪',
  'SG': '🇸🇬',
  'NL': '🇳🇱',
  'IT': '🇮🇹',
  'ES': '🇪🇸',
  'MX': '🇲🇽',
  'KR': '🇰🇷',
  'SA': '🇸🇦',
  'ZA': '🇿🇦',
};

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('India');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Detect country and update time
  useEffect(() => {
    // Try to detect country from timezone or use geolocation API
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setCountryCode(data.country_code);
          setCountryName(data.country_name || 'Unknown');
        }
      } catch {
        // Fallback to India if detection fails
        setCountryCode('IN');
        setCountryName('India');
      }
    };

    detectCountry();

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      };
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const flag = countryFlags[countryCode] || '🌍';

  return (
    <nav className="w-full flex flex-col sticky top-0 z-[100]">
      {/* Top Tier: Dark Brand Bar - Hidden on mobile to save space */}
      <div className="hidden md:flex bg-[#1A1A1A] w-full py-[10px] px-6 md:px-10 justify-between items-center border-b border-[#333333]">
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.15em]">
          <Link href="/blog" className="text-white hover:opacity-70 transition-opacity">
            Blog
          </Link>
          <span className="text-[#4A4A4A]">|</span>
          <Link href="https://www.filmsupply.com/" className="text-white hover:opacity-70 transition-opacity">
            Filmsupply
          </Link>
          <span className="text-[#4A4A4A]">|</span>
          <Link href="/" className="text-white hover:opacity-70 transition-opacity">
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[11px] font-semibold tracking-wide">Ambient Frames</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#999999]">
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="https://support.stills.com/" className="hover:text-white transition-colors">Support</Link>
          <Link href="tel:+918356953173" className="hover:text-white transition-colors">+91 83569 53173</Link>
        </div>
      </div>

      {/* Bottom Tier: Main Nav Bar */}
      <div className="bg-white/95 backdrop-blur-sm w-full h-[60px] md:h-[80px] px-6 md:px-10 flex justify-between items-center border-b border-[#E5E5E5] relative z-50">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black p-1 -ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[20px] md:text-[26px] font-bold tracking-wide text-black group-hover:text-black/70 transition-colors">
              Ambient Frames
            </span>
          </Link>

          {/* Desktop Nav Links - Left Side */}
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
            <Link href="/about" className="text-[#4A4A4A] hover:text-black transition-colors relative group">
              Our Story
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/projects" className="text-[#4A4A4A] hover:text-black transition-colors relative group">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/services" className="text-[#4A4A4A] hover:text-black transition-colors relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/gallery" className="text-[#4A4A4A] hover:text-black transition-colors relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Right Side - Join Us & Date/Time */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Date/Time with Country Flag - Desktop Only */}
          <div className="hidden md:flex items-center gap-3 text-[12px] text-[#4A4A4A]">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] rounded-sm">
              <span className="text-[16px]">{flag}</span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-semibold text-black">{currentTime}</span>
                <span className="text-[9px] text-[#666]">{currentDate}</span>
              </div>
            </div>
          </div>

          {/* Join Us Button */}
          <Link
            href="/join"
            className="bg-black text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-3 md:px-6 md:py-[14px] hover:bg-black/80 transition-all whitespace-nowrap"
          >
            Join Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 pt-[80px] px-6 transition-transform duration-500 ease-in-out md:hidden overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-8 py-8">
          <div className="space-y-6">
            <Link
              href="/about"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/projects"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/services"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/gallery"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="https://www.filmsupply.com/"
              className="block text-[24px] font-display font-light text-black border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Filmsupply
            </Link>
          </div>

          {/* Mobile Date/Time with Flag */}
          <div className="flex items-center gap-3 py-4 border-b border-gray-100">
            <span className="text-[24px]">{flag}</span>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-black">{currentTime}</span>
              <span className="text-[12px] text-[#666]">{currentDate} · {countryName}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/join"
              className="block w-full bg-black text-white text-center py-4 text-[14px] font-bold uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Us
            </Link>
            <Link
              href="/contact"
              className="block text-[14px] font-bold uppercase tracking-widest text-[#999999]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;