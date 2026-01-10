"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

/**
 * Footer Component
 * 
 * Enhanced with staggered animations and improved aesthetics.
 */

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-white text-black pt-[80px] md:pt-[120px] pb-10 border-t border-[#E5E5E5]">
      <div className="container mx-auto px-6 md:px-10">
        {/* Help Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-[80px] md:mb-[120px]">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            <h2 className="font-display font-light text-[40px] md:text-[64px] leading-[1.0] tracking-[-0.02em] mb-6">
              Need help finding the <br />right images?
            </h2>
            <p className="font-sans text-[18px] text-[#4A4A4A] mb-8">
              Our team is standing by for all your questions and needs
            </p>
            <button className="group bg-black text-white px-8 py-4 font-sans font-bold uppercase tracking-[0.15em] text-[12px] hover:opacity-80 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-[#333333] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >
            {/* This is Ambient Frames Column */}
            <div>
              <h4 className="font-sans font-semibold text-[14px] mb-6">This is Ambient Frames</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Our Story</Link></li>
                <li><Link href="/gallery" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Gallery</Link></li>
                <li><Link href="/blog" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="/services" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Services</Link></li>
              </ul>
            </div>

            {/* Help & Support Column */}
            <div>
              <h4 className="font-sans font-semibold text-[14px] mb-6">Help & Support</h4>
              <ul className="space-y-4">
                <li><a href="/faq" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">FAQ</a></li>
                <li><a href="/contact" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Email Us</a></li>
                <li><a href="tel:+918356953173" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">+91 83569 53173</a></li>
                <li><a href="/contributor" className="font-sans text-[14px] text-[#4A4A4A] hover:text-black transition-colors">Become a Contributor</a></li>
              </ul>
            </div>

            {/* FM Brands Column */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-sans text-[12px] text-[#4A4A4A] leading-relaxed mb-6">
                <strong className="text-black">FM</strong> is a family of brands dedicated to empowering the creative.
              </p>
              <div className="space-y-5">
                <Link href="/find-photos" className="group cursor-pointer block">
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-[#666666] transition-colors">Find Photos</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">AI-powered face detection & matching</p>
                </Link>
                <Link href="/blog" className="group cursor-pointer block">
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-[#666666] transition-colors">The Blog</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">Stories, insights & perspectives</p>
                </Link>
                <div className="group cursor-pointer">
                  <h5 className="font-sans font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-[#666666] transition-colors">Ambient Frames</h5>
                  <p className="font-sans text-[11px] text-[#4A4A4A]">Professional photography licensing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-10 border-t border-[#999999] flex flex-col md:flex-row justify-between items-center gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s'
          }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A]">©2026 FM LLC.</span>
            <a href="/privacy" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Privacy Policy</a>
            <a href="/license" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">License Terms</a>
            <a href="/terms" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Terms & Conditions</a>
            <a href="/careers" className="font-sans font-semibold text-[10px] tracking-widest text-[#4A4A4A] hover:text-black transition-colors">Careers</a>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://twitter.com" className="group text-[#4A4A4A] hover:text-black transition-colors p-2">
              <Twitter size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://facebook.com" className="group text-[#4A4A4A] hover:text-black transition-colors p-2">
              <Facebook size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/ambientframes.in/" target="_blank" rel="noopener noreferrer" className="group text-[#4A4A4A] hover:text-black transition-colors p-2">
              <Instagram size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com" className="group text-[#4A4A4A] hover:text-black transition-colors p-2">
              <Linkedin size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;