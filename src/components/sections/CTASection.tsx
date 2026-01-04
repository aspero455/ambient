"use client";

import React from 'react';

/**
 * CTASection Component
 * 
 * Clones the large dark-themed call-to-action section with the title:
 * "Authentic imagery trusted by industry-leading creatives."
 * 
 * Design characteristics:
 * - Background: Dark grey/matte charcoal (#B0B0B0 base, but this specific section is themed dark)
    Actually, looking at the hierarchy and high-level design:
    The "Trusted By" strip is on the grey background, but this specific CTA block 
    is a large section with Denton-Light typography.
 * - Typography: Denton for heading, Inter/Helvetica for body.
 * - Action: Single "Create Free Account" button (Black, 0px radius).
 */

const CTASection: React.FC = () => {
  return (
    <section className="bg-[#B0B0B0] py-[120px] px-10 flex flex-col items-center text-left">
      <div className="container max-w-[1440px] px-0">
        <div className="max-w-[1000px]">
          {/* Section Heading */}
          <h2 
            className="font-display font-light text-black mb-8 leading-[1.1] tracking-[-0.02em]"
            style={{ 
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: 300 
            }}
          >
            Authentic imagery trusted by industry-leading creatives.
          </h2>
          
          {/* Subtext */}
          <p 
            className="font-sans text-[#4A4A4A] mb-12 max-w-[650px]"
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.5' 
            }}
          >
            Join the world’s top agencies, brands, and creatives who turn to Ambient Frames for captivating, scroll-stopping imagery to license for their campaigns and projects.
          </p>

          {/* Primary CTA Button */}
          <button 
            className="btn btn-primary bg-black text-white px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            style={{ 
              borderRadius: '0px' 
            }}
          >
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;