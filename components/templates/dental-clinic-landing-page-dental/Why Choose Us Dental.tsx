import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const WhyChooseUs: React.FC = () => {
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  // IntersectionObserver on the section container + initial mount fallback
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

    // Scroll listener fallback for absolute responsiveness
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          setIsInView(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    { num: '01', title: 'Advanced Technology' },
    { num: '02', title: 'Certified Specialists' },
    { num: '03', title: 'Gentle & Painless' },
    { num: '04', title: 'Smiles That Last' },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1242 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#0E776E',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */

        /* Frame 340 (Top Left Headline Group) */
        .dw-top-group {
          position: absolute;
          width: 739px;
          height: 204px;
          left: 80px;
          top: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
          z-index: 10;
        }

        /* Frame 288 (Original Clean Badge - NO BOX) */
        .dw-badge-pill {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 6px;
          height: 24px;
          background: transparent;
          border: none;
        }

        .dw-dot-white {
          width: 8px;
          height: 8px;
          background: #FFFFFF;
          border-radius: 2px;
          flex: none;
          display: inline-block;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .dw-badge-text {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          text-transform: capitalize;
          color: #FFFFFF;
        }

        /* Main Headline (Instrument Serif) */
        .dw-headline-text {
          width: 739px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 60px;
          line-height: 80px;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }

        /* Frame 351 (Middle Row: Image + Right Features) */
        .dw-mid-row {
          position: absolute;
          width: 1229px;
          height: 503px;
          left: 80px;
          top: 344px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 0px;
          gap: 56px;
          box-sizing: border-box;
          z-index: 10;
        }

        /* w1 Image Container with Masked Bottom Reveal */
        .dw-image-mask-wrap {
          width: 776px;
          height: 498px;
          border-radius: 16px;
          overflow: hidden;
          flex: none;
          background-color: #0d5e58;
          position: relative;
        }

        .dw-image-card-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .dw-image-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dw-image-mask-wrap:hover .dw-image-card-inner img {
          transform: scale(1.04);
        }

        /* Frame 350 (Right Column) */
        .dw-right-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0px;
          width: 397px;
          height: 503px;
          flex: none;
          box-sizing: border-box;
        }

        .dw-right-title {
          width: 397px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 60px;
          line-height: 80px;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }

        /* Frame 349 (Features List) */
        .dw-features-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 12px;
          width: 260px;
        }

        /* Feature Row Item (Clean Original Style) */
        .dw-feature-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 4px 6px;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.25s ease;
          border-radius: 6px;
          background: transparent;
        }

        .dw-feature-item:hover {
          transform: translateX(6px);
          background-color: rgba(255, 255, 255, 0.06);
        }

        .dw-feature-num-group {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          flex: none;
        }

        .dw-feature-num {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          color: #FFFFFF;
          opacity: 0.95;
        }

        .dw-feature-title {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .dw-feature-item:hover .dw-feature-title {
          color: #A6F3D1;
        }

        /* Bottom Quote Statement */
        .dw-quote-container {
          position: absolute;
          width: 1416px;
          height: 252px;
          left: 80px;
          top: 907px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          z-index: 10;
        }

        .dw-quote-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 94.36px;
          line-height: 126px;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.5px;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .dw-mobile-wrapper {
          width: 100%;
          padding: 56px 20px 72px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 36px;
          background-color: #0E776E;
          color: #FFFFFF;
          overflow: hidden;
        }

        .dw-mobile-header {
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
        }

        .dw-mobile-headline-line {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(32px, 8.2vw, 44px);
          line-height: 1.15;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }

        .dw-mobile-img-wrap {
          width: 100%;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          background-color: #0d5e58;
          position: relative;
        }

        .dw-mobile-img-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .dw-mobile-img-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .dw-mobile-why-dental {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .dw-mobile-right-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(32px, 8vw, 42px);
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0;
          will-change: transform, opacity;
        }

        .dw-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 0px;
          width: 100%;
        }

        .dw-mobile-feature-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 13px 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          will-change: transform, opacity;
        }

        .dw-mobile-feature-title {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 26px;
          color: #FFFFFF;
          margin: 0;
        }

        .dw-mobile-quote-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          padding-top: 12px;
        }

        .dw-mobile-quote-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        .dw-mobile-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(28px, 6.8vw, 38px);
          line-height: 1.25;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1242px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#0E776E',
            overflow: 'hidden',
            color: '#FFFFFF',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {/* Top Left Headline Group (Frame 340) with Bottom-to-Top Masked Reveal */}
          <div className="dw-top-group" key={`dw-top-${animKey}`}>
            {/* Pill Badge - No Box, Exactly As Before */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="dw-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="dw-dot-white" />
                <span className="dw-badge-text">Why Choose Us</span>
                <span className="dw-dot-white" />
              </motion.div>
            </div>

            {/* Headline with 2 Masked Lines for Bottom-to-Top Reveal */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="dw-headline-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                MORE THAN A CHECKUP.
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="dw-headline-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                WE CREATE SMILES THAT LAST.
              </motion.h2>
            </div>
          </div>

          {/* Middle Row (Frame 351) with Image + Staggered Features */}
          <div className="dw-mid-row" key={`dw-mid-${animKey}`}>
            {/* Left Image Card (w1) with True Masked Bottom-Up Wipe & Zoom */}
            <div className="dw-image-mask-wrap">
              <motion.div
                className="dw-image-card-inner"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 0.92, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src="https://cdn.jiro.build/Dentis/Image/why.png"
                  alt="Modern dental clinic laboratory and team workspace"
                  initial={{ scale: 1.18, y: '-15%' }}
                  animate={isInView ? { scale: 1, y: '0%' } : { scale: 1.18, y: '-15%' }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </div>

            {/* Right Column (Frame 350) */}
            <div className="dw-right-col">
              {/* Top Title: Why Choose Dental with Masked Reveal */}
              <div style={{ overflow: 'hidden', width: '100%' }}>
                <motion.h3
                  className="dw-right-title"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={{ duration: 0.82, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  Why Choose Dental
                </motion.h3>
              </div>

              {/* Bottom List (Frame 349) with Staggered Bottom Entrance One by One */}
              <div className="dw-features-list">
                {features.map((item, idx) => (
                  <div key={idx} style={{ overflow: 'hidden', width: '100%' }}>
                    <motion.div
                      className="dw-feature-item"
                      initial={{ y: '120%', opacity: 0 }}
                      animate={isInView ? { y: '0%', opacity: 1 } : { y: '120%', opacity: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.32 + idx * 0.1, // Staggered one by one from bottom
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <div className="dw-feature-num-group">
                        <span
                          className="dw-dot-white"
                          style={{
                            backgroundColor: hoveredIdx === idx ? '#A6F3D1' : '#FFFFFF',
                            transform: hoveredIdx === idx ? 'scale(1.2)' : 'scale(1)',
                          }}
                        />
                        <span className="dw-feature-num">{item.num}</span>
                      </div>
                      <p className="dw-feature-title">{item.title}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Statement Quote with 2-Line Masked Bottom Reveal */}
          <div className="dw-quote-container" key={`dw-quote-${animKey}`}>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.p
                className="dw-quote-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                “WE TREAT EVERY PATIENT THE WAY WE’D
              </motion.p>
            </div>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.p
                className="dw-quote-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                WANT OUR OWN FAMILY TO BE TREATED.”
              </motion.p>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (< 860px Responsive Layout) ================= */}
      {isMobile && (
        <div className="dw-mobile-wrapper" key={`dw-mob-${animKey}`}>
          {/* Header */}
          <div className="dw-mobile-header">
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="dw-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="dw-dot-white" />
                <span className="dw-badge-text">Why Choose Us</span>
                <span className="dw-dot-white" />
              </motion.div>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="dw-mobile-headline-line"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                MORE THAN A CHECKUP.
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="dw-mobile-headline-line"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                WE CREATE SMILES THAT LAST.
              </motion.h2>
            </div>
          </div>

          {/* Middle Image Card with True Bottom Mask Reveal */}
          <div className="dw-mobile-img-wrap">
            <motion.div
              className="dw-mobile-img-inner"
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 0.88, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src="https://cdn.jiro.build/Dentis/Image/why.png"
                alt="Modern dental clinic laboratory and team workspace"
                initial={{ scale: 1.16, y: '-15%' }}
                animate={isInView ? { scale: 1, y: '0%' } : { scale: 1.16, y: '-15%' }}
                transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>

          {/* Why Choose Dental + Features with Staggered Bottom Entrance */}
          <div className="dw-mobile-why-dental">
            <div style={{ overflow: 'hidden' }}>
              <motion.h3
                className="dw-mobile-right-title"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.78, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Why Choose Dental
              </motion.h3>
            </div>

            <div className="dw-mobile-list">
              {features.map((item, idx) => (
                <div key={idx} style={{ overflow: 'hidden', width: '100%' }}>
                  <motion.div
                    className="dw-mobile-feature-item"
                    initial={{ y: '120%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '120%', opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="dw-feature-num-group">
                      <span className="dw-dot-white" />
                      <span className="dw-feature-num">{item.num}</span>
                    </div>
                    <p className="dw-mobile-feature-title">{item.title}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Bottom Quote */}
          <div className="dw-mobile-quote-box">
            <div className="dw-mobile-quote-divider" />
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                className="dw-mobile-quote"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                “WE TREAT EVERY PATIENT THE WAY WE’D WANT OUR OWN FAMILY TO BE TREATED.”
              </motion.p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
