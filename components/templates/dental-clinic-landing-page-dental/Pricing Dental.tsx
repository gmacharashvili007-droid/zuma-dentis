import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Character-wise slide animation component for buttons (matching Header button effect)
const RollingText: React.FC<{ text: string; isHovered: boolean }> = ({ text, isHovered }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        height: '26px',
        lineHeight: '26px',
      }}
    >
      {text.split('').map((char, index) => {
        const isSpace = char === ' ';
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              height: '26px',
              lineHeight: '26px',
              width: isSpace ? '0.34em' : 'auto',
            }}
          >
            {/* Top primary character moving up on hover */}
            <motion.span
              style={{
                display: 'inline-block',
                willChange: 'transform',
              }}
              animate={{
                y: isHovered ? '-100%' : '0%',
              }}
              transition={{
                duration: 0.28,
                delay: index * 0.015,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {isSpace ? '\u00A0' : char}
            </motion.span>

            {/* Bottom duplicate character sliding up into view */}
            <motion.span
              style={{
                display: 'inline-block',
                position: 'absolute',
                left: 0,
                top: 0,
                willChange: 'transform',
              }}
              initial={{ y: '100%' }}
              animate={{
                y: isHovered ? '0%' : '100%',
              }}
              transition={{
                duration: 0.28,
                delay: index * 0.015,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {isSpace ? '\u00A0' : char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

export const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth / 1600;
    }
    return 1;
  });

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 860;
    }
    return false;
  });

  const [isInView, setIsInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [hoveredBtnId, setHoveredBtnId] = useState<string | null>(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScale(width / 1600);
      setIsMobile(width < 860);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver for reveal animation + fallback
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsInView(true);
      setAnimKey((k) => k + 1);
    }, 60);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setAnimKey((k) => k + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
    };
  }, []);

  const pricingTiers = [
    {
      id: 'basic-checkup',
      name: 'Basic Checkup',
      price: '$49',
      period: '/visit',
      description: 'Routine care to keep your teeth and gums healthy.',
      btnText: 'Book Now',
      isDark: false,
      btnWidth: '113px',
      features: [
        'Full oral examination',
        'Scaling and polishing',
        'Digital X-ray',
        'Personal care advice',
        '1 Content Calendar',
      ],
    },
    {
      id: 'family-care',
      name: 'Family Care',
      price: '$999',
      period: '/ Year',
      description: 'Year-round care for up to 4 family members.',
      btnText: 'Book Now',
      isDark: false,
      btnWidth: '113px',
      features: [
        'Fluoride care for kids',
        '10–15% off all treatments',
        'Digital X-rays',
        'Scaling and polishing',
        '2 checkups a year',
      ],
    },
    {
      id: 'smile-makeover',
      name: 'Smile Makeover',
      price: '$1999',
      period: '/ package',
      description: 'A brighter, more confident smile, start to finish.',
      btnText: 'Book an Appointment',
      isDark: true,
      btnWidth: '193px',
      features: [
        'Personal care advice',
        'Smile design consultation',
        'Scaling and polishing',
        'Professional teeth whitening',
        'Follow-up visit included',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1200 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F0FDFA',
        boxSizing: 'border-box',
        order: 7,
        flex: 'none',
        flexGrow: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */

        /* Header Frame (Frame 2147226796) */
        .pr-header-box {
          position: absolute;
          width: 340px;
          height: 144px;
          left: calc(50% - 340px/2 + 0.5px);
          top: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
          z-index: 5;
        }

        /* Pill Badge (Frame 2147226743) */
        .pr-badge-pill {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          width: 93px;
          height: 44px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          cursor: default;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pr-badge-pill:hover {
          background-color: rgba(15, 118, 110, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
        }

        .pr-badge-text {
          width: 51px;
          height: 22px;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #0F776F;
          white-space: nowrap;
          user-select: none;
        }

        /* Heading (Honest Prices) */
        .pr-heading-text {
          width: 340px;
          height: 80px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 60px;
          line-height: 80px;
          text-align: center;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0;
          letter-spacing: -0.2px;
          white-space: nowrap;
        }

        /* Stacked Cards Container (Frame 454) */
        .pr-cards-stack {
          position: absolute;
          width: 899px;
          height: 856px;
          left: calc(50% - 899px/2 + 0.5px);
          top: 264px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
        }

        /* Pricing Card */
        .pr-card {
          width: 899px;
          height: 272px;
          border-radius: 24px;
          position: relative;
          box-sizing: border-box;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pr-card-light {
          background: #FFFEFE;
          box-shadow: 0 8px 30px rgba(15, 118, 110, 0.05), 0 0 0 1px rgba(15, 118, 110, 0.04);
        }

        .pr-card-light:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px -10px rgba(15, 118, 110, 0.12), 0 0 0 1px rgba(15, 118, 110, 0.08);
        }

        .pr-card-dark {
          background: #0F776F;
          box-shadow: 0 16px 40px -10px rgba(15, 118, 110, 0.28);
        }

        .pr-card-dark:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 55px -10px rgba(15, 118, 110, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        /* Left Content Block (Frame 448) */
        .pr-left-block {
          position: absolute;
          left: 30px;
          top: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
        }

        .pr-tier-name {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
          text-transform: capitalize;
          margin: 0;
        }

        .pr-tier-name-light {
          color: #0F776F;
        }

        .pr-tier-name-dark {
          color: #FFFEFE;
        }

        /* Price & Description Group (Frame 447) */
        .pr-price-desc-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 16px;
        }

        /* Price Row (Frame 446) */
        .pr-price-row {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-end;
          padding: 0px;
          height: 50px;
        }

        .pr-amount {
          font-family: 'Goudy Old Style', 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 700;
          font-size: 40px;
          line-height: 50px;
          letter-spacing: -0.02em;
        }

        .pr-amount-light {
          color: #0F776F;
        }

        .pr-amount-dark {
          color: #FFFEFE;
        }

        .pr-period {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 6px;
          margin-left: 2px;
          text-transform: capitalize;
        }

        .pr-period-light {
          color: #688783;
        }

        .pr-period-dark {
          color: #A9C4C1;
        }

        .pr-desc {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          margin: 0;
        }

        .pr-desc-light {
          color: #0F776F;
        }

        .pr-desc-dark {
          color: #FFFEFE;
        }

        /* Action Buttons with Header-Style Rolling Animation (Frame 126 / Frame 454) */
        .pr-btn {
          position: absolute;
          left: 30px;
          top: 194px;
          height: 44px;
          border-radius: 9999px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          cursor: pointer;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 26px;
          text-decoration: none;
          box-sizing: border-box;
          transition: background-color 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Right Features Block (Frame 453) */
        .pr-right-block {
          position: absolute;
          left: 621px;
          top: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
        }

        .pr-included-title {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          text-transform: capitalize;
          margin: 0;
        }

        .pr-included-light {
          color: #0F776F;
        }

        .pr-included-dark {
          color: #FFFEFE;
        }

        /* Feature List (Frame 450) */
        .pr-features-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 6px;
        }

        .pr-feature-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 8px;
          height: 24px;
        }

        /* Rectangle 40 (Square Bullet) */
        .pr-bullet {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          flex: none;
        }

        .pr-bullet-light {
          background: #0F776F;
        }

        .pr-bullet-dark {
          background: #FFFEFE;
        }

        .pr-feature-text {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          white-space: nowrap;
        }

        .pr-feature-text-light {
          color: #0F776F;
        }

        .pr-feature-text-dark {
          color: #FFFEFE;
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .pr-mobile-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 60px 20px 80px;
          box-sizing: border-box;
        }

        .pr-mobile-badge {
          box-sizing: border-box;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 8px 18px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 15px;
          line-height: 20px;
          color: #0F776F;
          margin-bottom: 16px;
        }

        .pr-mobile-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(34px, 8.5vw, 48px);
          line-height: 1.15;
          text-align: center;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0 0 32px 0;
          letter-spacing: -0.2px;
        }

        .pr-mobile-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 500px;
        }

        .pr-mobile-card {
          width: 100%;
          border-radius: 20px;
          padding: 24px 22px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pr-mobile-card-light {
          background: #FFFEFE;
          box-shadow: 0 10px 30px rgba(15, 118, 110, 0.08);
        }

        .pr-mobile-card-dark {
          background: #0F776F;
          box-shadow: 0 14px 35px rgba(15, 118, 110, 0.28);
        }

        .pr-mobile-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin: 6px 0 8px;
        }

        .pr-mobile-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(15, 118, 110, 0.15);
        }

        .pr-mobile-features-dark {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pr-mobile-btn {
          height: 44px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 24px;
          font-family: 'Inter Tight', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          text-decoration: none;
          align-self: flex-start;
          margin-top: 6px;
          transition: background-color 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1200px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#F0FDFA',
            overflow: 'hidden',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
          }}
        >
          {/* Header Box (Frame 2147226796) */}
          <div className="pr-header-box" key={`pr-hdr-${animKey}`}>
            {/* Pill Badge (Frame 2147226743) - Bottom-Reveal */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="pr-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="pr-badge-text">Pricing</span>
              </motion.div>
            </div>

            {/* Honest Prices Title - Text Bottom-Reveal */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="pr-heading-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Honest Prices
              </motion.h2>
            </div>
          </div>

          {/* Stacked Cards Container (Frame 454) */}
          <div className="pr-cards-stack">
            {pricingTiers.map((tier, idx) => {
              const cardDelay = 0.22 + idx * 0.22;
              const isHovered = hoveredBtnId === tier.id;

              return (
                <motion.div
                  key={`pr-card-${tier.id}-${animKey}`}
                  className={`pr-card ${tier.isDark ? 'pr-card-dark' : 'pr-card-light'}`}
                  initial={{ opacity: 0, y: 140 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 140 }}
                  transition={{
                    duration: 0.85,
                    delay: cardDelay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Left Block (Frame 448) */}
                  <div className="pr-left-block">
                    {/* Tier Name with Reveal Mask */}
                    <div style={{ overflow: 'hidden' }}>
                      <motion.h3
                        className={`pr-tier-name ${
                          tier.isDark ? 'pr-tier-name-dark' : 'pr-tier-name-light'
                        }`}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                        transition={{
                          duration: 0.65,
                          delay: cardDelay + 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {tier.name}
                      </motion.h3>
                    </div>

                    <div className="pr-price-desc-group">
                      {/* Price Row with Reveal Mask */}
                      <div style={{ overflow: 'hidden' }}>
                        <motion.div
                          className="pr-price-row"
                          initial={{ y: '110%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: cardDelay + 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <span
                            className={`pr-amount ${
                              tier.isDark ? 'pr-amount-dark' : 'pr-amount-light'
                            }`}
                          >
                            {tier.price}
                          </span>
                          <span
                            className={`pr-period ${
                              tier.isDark ? 'pr-period-dark' : 'pr-period-light'
                            }`}
                          >
                            {tier.period}
                          </span>
                        </motion.div>
                      </div>

                      {/* Description with Reveal Mask */}
                      <div style={{ overflow: 'hidden' }}>
                        <motion.p
                          className={`pr-desc ${
                            tier.isDark ? 'pr-desc-dark' : 'pr-desc-light'
                          }`}
                          initial={{ y: '110%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: cardDelay + 0.24,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {tier.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button with Header-Style Rolling Text & Transitions */}
                  <motion.button
                    className="pr-btn"
                    style={{
                      width: tier.btnWidth,
                      backgroundColor: tier.isDark
                        ? isHovered
                          ? '#15B8A7'
                          : '#FFFEFE'
                        : isHovered
                        ? '#15B8A7'
                        : '#0F776F',
                      color: tier.isDark
                        ? isHovered
                          ? '#FFFEFE'
                          : '#15B8A7'
                        : '#FFFEFE',
                      border: tier.isDark
                        ? isHovered
                          ? '1px solid #FFFEFE'
                          : '1px solid transparent'
                        : '1px solid transparent',
                      transform: isHovered ? 'translateY(-2px)' : 'none',
                      boxShadow: tier.isDark
                        ? isHovered
                          ? '0 8px 22px rgba(0, 0, 0, 0.25)'
                          : '0 4px 14px rgba(0, 0, 0, 0.1)'
                        : isHovered
                        ? '0 8px 22px rgba(20, 184, 166, 0.4)'
                        : '0 4px 14px rgba(15, 118, 110, 0.2)',
                    }}
                    initial={{ opacity: 0, y: 15, scale: 0.94 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 15, scale: 0.94 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: cardDelay + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setHoveredBtnId(tier.id)}
                    onMouseLeave={() => setHoveredBtnId(null)}
                  >
                    <RollingText text={tier.btnText} isHovered={isHovered} />
                  </motion.button>

                  {/* Right Block (Frame 453) */}
                  <div className="pr-right-block">
                    {/* What's included Heading with Reveal */}
                    <div style={{ overflow: 'hidden' }}>
                      <motion.h4
                        className={`pr-included-title ${
                          tier.isDark ? 'pr-included-dark' : 'pr-included-light'
                        }`}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                        transition={{
                          duration: 0.65,
                          delay: cardDelay + 0.16,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        What’s included
                      </motion.h4>
                    </div>

                    <div className="pr-features-list">
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} style={{ overflow: 'hidden' }}>
                          <motion.div
                            className="pr-feature-item"
                            initial={{ y: '110%', opacity: 0 }}
                            animate={
                              isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }
                            }
                            transition={{
                              duration: 0.6,
                              delay: cardDelay + 0.22 + fIdx * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <span
                              className={`pr-bullet ${
                                tier.isDark ? 'pr-bullet-dark' : 'pr-bullet-light'
                              }`}
                            />
                            <span
                              className={`pr-feature-text ${
                                tier.isDark ? 'pr-feature-text-dark' : 'pr-feature-text-light'
                              }`}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (< 860px Responsive Fallback) ================= */}
      {isMobile && (
        <div className="pr-mobile-wrap" key={`pr-mob-${animKey}`}>
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              className="pr-mobile-badge"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Pricing
            </motion.div>
          </div>

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.h2
              className="pr-mobile-heading"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Honest Prices
            </motion.h2>
          </div>

          <div className="pr-mobile-stack">
            {pricingTiers.map((tier, idx) => {
              const cardDelay = 0.2 + idx * 0.2;
              const isHovered = hoveredBtnId === `mob-${tier.id}`;

              return (
                <motion.div
                  key={`pr-mob-card-${tier.id}-${animKey}`}
                  className={`pr-mobile-card ${
                    tier.isDark ? 'pr-mobile-card-dark' : 'pr-mobile-card-light'
                  }`}
                  initial={{ opacity: 0, y: 80 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{
                    duration: 0.75,
                    delay: cardDelay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div>
                    <h3
                      className={`pr-tier-name ${
                        tier.isDark ? 'pr-tier-name-dark' : 'pr-tier-name-light'
                      }`}
                    >
                      {tier.name}
                    </h3>

                    <div className="pr-mobile-price-row">
                      <span
                        className={`pr-amount ${
                          tier.isDark ? 'pr-amount-dark' : 'pr-amount-light'
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span
                        className={`pr-period ${
                          tier.isDark ? 'pr-period-dark' : 'pr-period-light'
                        }`}
                      >
                        {tier.period}
                      </span>
                    </div>

                    <p
                      className={`pr-desc ${
                        tier.isDark ? 'pr-desc-dark' : 'pr-desc-light'
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <div
                    className={`pr-mobile-features ${
                      tier.isDark ? 'pr-mobile-features-dark' : ''
                    }`}
                  >
                    <h4
                      className={`pr-included-title ${
                        tier.isDark ? 'pr-included-dark' : 'pr-included-light'
                      }`}
                      style={{ fontSize: '16px', marginBottom: '4px' }}
                    >
                      What’s included
                    </h4>

                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="pr-feature-item">
                        <span
                          className={`pr-bullet ${
                            tier.isDark ? 'pr-bullet-dark' : 'pr-bullet-light'
                          }`}
                        />
                        <span
                          className={`pr-feature-text ${
                            tier.isDark ? 'pr-feature-text-dark' : 'pr-feature-text-light'
                          }`}
                          style={{ fontSize: '15px' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="pr-mobile-btn"
                    style={{
                      backgroundColor: tier.isDark
                        ? isHovered
                          ? '#15B8A7'
                          : '#FFFEFE'
                        : isHovered
                        ? '#15B8A7'
                        : '#0F776F',
                      color: tier.isDark
                        ? isHovered
                          ? '#FFFEFE'
                          : '#15B8A7'
                        : '#FFFEFE',
                      border: tier.isDark
                        ? isHovered
                          ? '1px solid #FFFEFE'
                          : '1px solid transparent'
                        : '1px solid transparent',
                      transform: isHovered ? 'translateY(-2px)' : 'none',
                      boxShadow: tier.isDark
                        ? isHovered
                          ? '0 8px 20px rgba(0, 0, 0, 0.25)'
                          : '0 4px 12px rgba(0, 0, 0, 0.1)'
                        : isHovered
                        ? '0 8px 20px rgba(20, 184, 166, 0.4)'
                        : '0 4px 12px rgba(15, 118, 110, 0.2)',
                    }}
                    onMouseEnter={() => setHoveredBtnId(`mob-${tier.id}`)}
                    onMouseLeave={() => setHoveredBtnId(null)}
                  >
                    <RollingText text={tier.btnText} isHovered={isHovered} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
