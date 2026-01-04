import React from 'react';

/**
 * SocialProofCTA Component
 * 
 * Clones the final call-to-action section with the headline
 * "Authentic imagery trusted by industry-leading creatives"
 * on a clean gray background (#B3B3B3) with a "Create Free Account" button.
 */
const SocialProofCTA: React.FC = () => {
  return (
    <section 
      style={{
        backgroundColor: '#B3B3B3',
        padding: '120px 0',
        display: 'block',
        position: 'relative',
        width: '100%',
      }}
    >
      <div 
        className="container" 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div 
          style={{
            maxWidth: '850px',
          }}
        >
          {/* Main Heading */}
          <h2 
            style={{
              fontFamily: '"Denton", serif',
              fontSize: '64px',
              lineHeight: '1.1',
              fontWeight: '400',
              color: '#000000',
              marginBottom: '40px',
              letterSpacing: '-0.02em',
              textTransform: 'none',
            }}
          >
            Authentic imagery trusted by industry-leading creatives.
          </h2>

          {/* Subtext Body */}
          <p 
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              lineHeight: '1.6',
              fontWeight: '400',
              color: '#000000',
              marginBottom: '40px',
              maxWidth: '560px',
            }}
          >
            Join the world’s top agencies, brands, and creatives who turn to Stills for captivating, scroll-stopping imagery to license for their campaigns and projects.
          </p>

          {/* CTA Button */}
          <button 
            className="btn-primary"
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '1px',
              padding: '16px 32px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s ease',
              borderRadius: '0',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProofCTA;