import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Character-wise slide animation component for buttons (keeps exact casing - do not capital)
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

export const Header: React.FC = () => {
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
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Resize listener to recalculate scale and detect mobile
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

  // Trigger animation reliably on mount, reload, and every viewport intersection
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsInView(true);
      setAnimKey((k) => k + 1);
    }, 50);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setAnimKey((k) => k + 1);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
    };
  }, []);

  const line1Words = ['YOUR', 'SMILE'];
  const line2Words = ['NEEDS', 'THE', 'BEST', 'CARE'];

  // Left & Right infinite vertical slider image datasets with all 7 requested CDN images
  const leftImages = [
    'https://cdn.jiro.build/Dentis/Image/h1.png',
    'https://cdn.jiro.build/Dentis/Image/h2.png',
    'https://cdn.jiro.build/Dentis/Image/h3.png',
    'https://cdn.jiro.build/Dentis/Image/h4.png',
    'https://cdn.jiro.build/Dentis/Image/h5.png',
    'https://cdn.jiro.build/Dentis/Image/h6.png',
    'https://cdn.jiro.build/Dentis/Image/h7.png',
  ];
  const duplicatedLeftImages = [...leftImages, ...leftImages];

  const rightImages = [
    'https://cdn.jiro.build/Dentis/Image/h5.png',
    'https://cdn.jiro.build/Dentis/Image/h6.png',
    'https://cdn.jiro.build/Dentis/Image/h7.png',
    'https://cdn.jiro.build/Dentis/Image/h1.png',
    'https://cdn.jiro.build/Dentis/Image/h2.png',
    'https://cdn.jiro.build/Dentis/Image/h3.png',
    'https://cdn.jiro.build/Dentis/Image/h4.png',
  ];
  const duplicatedRightImages = [...rightImages, ...rightImages];

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#0E776E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* Tooth Background Watermark */
        .dh-watermark {
          position: absolute;
          width: 764px;
          height: 764px;
          left: calc(50% - 764px / 2);
          top: calc(50% - 764px / 2);
          opacity: 0.04;
          pointer-events: none;
          z-index: 1;
        }

        /* Top Floating Navigation Pill */
        .dh-nav-pill {
          position: absolute;
          width: 384px;
          height: 46px;
          left: calc(50% - 384px / 2);
          top: 20px;
          background: #0D877F;
          border-radius: 8px;
          padding: 10px 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 34px;
          z-index: 35;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dh-logo-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 6px;
          text-decoration: none;
          cursor: pointer;
        }

        .dh-logo-icon {
          width: 22.43px;
          height: 22.43px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dh-logo-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 21px;
          line-height: 26px;
          color: #FFFEFE;
        }

        .dh-menu-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 0;
          transition: transform 0.2s ease;
        }

        .dh-menu-btn:hover {
          transform: scale(1.08);
        }

        .dh-menu-line {
          width: 23px;
          height: 2px;
          background: #FFFEFE;
          border-radius: 1px;
          transition: all 0.25s ease;
        }

        /* Dropdown Menu */
        .dh-dropdown {
          position: absolute;
          width: 384px;
          left: calc(50% - 384px / 2);
          top: 74px;
          background: rgba(12, 135, 126, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 14px 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 40;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(12px);
        }

        .dh-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 8px;
          color: #FFFEFE;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: background-color 0.2s ease, transform 0.15s ease;
          cursor: pointer;
        }

        .dh-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.14);
          transform: translateX(4px);
        }

        /* Left Column (Infinite Top-to-Bottom Slider) */
        .dh-col-left {
          position: absolute;
          width: 266px;
          left: 60px;
          top: -261px;
          z-index: 2;
          pointer-events: none;
        }

        /* Right Column (Infinite Bottom-to-Top Slider) */
        .dh-col-right {
          position: absolute;
          width: 266px;
          left: 1274px;
          top: -100px;
          z-index: 2;
          pointer-events: none;
        }

        .dh-slider-track {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          will-change: transform;
        }

        .dh-card {
          width: 266px;
          height: 302px;
          border-radius: 14px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.05);
          flex: none;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
        }

        .dh-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Center Content */
        .dh-center-group {
          position: absolute;
          width: 940px;
          height: 344px;
          left: calc(50% - 940px / 2);
          top: 186px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 30px;
          z-index: 10;
        }

        .dh-inner-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 40px;
          width: 940px;
          height: 344px;
        }

        .dh-text-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 14px;
          width: 940px;
          height: 260px;
        }

        /* Headline Containers for Top-to-Bottom Reveal Effect */
        .dh-title-line-wrap {
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          text-align: center;
          gap: 20px;
        }

        .dh-title-word-mask {
          display: inline-flex;
          overflow: hidden;
          vertical-align: top;
          margin: 0;
          flex-shrink: 0;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 101.311px;
          line-height: 101px;
        }

        .dh-title-word {
          display: inline-block;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 101.311px;
          line-height: 101px;
          text-align: center;
          text-transform: uppercase;
          color: #F0FDFB;
          margin: 0;
          letter-spacing: -0.5px;
          will-change: transform, opacity;
        }

        .dh-subtitle-wrap {
          overflow: hidden;
          display: flex;
          justify-content: center;
          width: 940px;
        }

        .dh-subtitle {
          width: 620px;
          height: 44px;
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #F0FDFB;
          margin: 0;
          will-change: transform, opacity;
        }

        /* Action Buttons */
        .dh-cta-group {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 0px;
          gap: 20px;
          width: 393px;
          height: 44px;
        }

        .dh-btn-primary {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          gap: 5px;
          width: 193px;
          height: 44px;
          border-radius: 9999px;
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 26px;
          text-decoration: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: background-color 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dh-btn-secondary {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          gap: 5px;
          width: 180px;
          height: 44px;
          border-radius: 9999px;
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 26px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Bottom Badges */
        .dh-badges {
          position: absolute;
          width: 577px;
          height: 22px;
          left: calc(50% - 577px / 2);
          bottom: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 20px;
          z-index: 10;
        }

        .dh-badge-item-1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 5px;
          width: 181px;
          height: 22px;
        }

        .dh-badge-item-2 {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 5px;
          width: 159px;
          height: 22px;
        }

        .dh-badge-item-3 {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 5px;
          width: 197px;
          height: 22px;
        }

        .dh-badge-text {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 18px;
          color: #FFFEFE;
        }

        .dh-check-icon {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ================= MOBILE LAYOUT STYLES ================= */
        .dh-mobile-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px 42px;
          box-sizing: border-box;
          position: relative;
          z-index: 5;
        }

        .dh-mobile-nav {
          width: 100%;
          max-width: 420px;
          height: 48px;
          background: #0D877F;
          border-radius: 10px;
          padding: 10px 16px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 40;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .dh-mobile-dropdown {
          position: absolute;
          width: 100%;
          top: 56px;
          left: 0;
          background: rgba(12, 135, 126, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          padding: 12px 14px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 50;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(14px);
        }

        .dh-mobile-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 22px;
          width: 100%;
          max-width: 480px;
          margin: 36px 0;
          z-index: 10;
        }

        .dh-mobile-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(40px, 10.5vw, 56px);
          line-height: 1.05;
          text-align: center;
          text-transform: uppercase;
          color: #F0FDFB;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .dh-mobile-subtitle {
          font-family: 'Inter Tight', sans-serif;
          font-size: 15px;
          line-height: 22px;
          text-align: center;
          color: #F0FDFB;
          opacity: 0.95;
          margin: 0;
          padding: 0 8px;
        }

        .dh-mobile-cta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 320px;
          align-items: center;
        }

        .dh-mobile-gallery {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          width: 100%;
          max-width: 480px;
          padding: 6px 4px 12px;
          margin-bottom: 24px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .dh-mobile-gallery::-webkit-scrollbar {
          display: none;
        }

        .dh-mobile-card {
          width: 116px;
          height: 136px;
          border-radius: 12px;
          overflow: hidden;
          flex: none;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
        }
        .dh-mobile-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .dh-mobile-badges {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          width: 100%;
          z-index: 10;
        }

        .dh-mobile-badge-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Inter Tight', sans-serif;
          font-size: 14px;
          color: #FFFEFE;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <header
          style={{
            width: '1600px',
            height: '770px',
            position: 'absolute',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            backgroundColor: '#0E776E',
            overflow: 'hidden',
            color: '#FFFEFE',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {/* Tooth Watermark Silhouette */}
          <svg
            className="dh-watermark"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M160,80 C110,80 70,130 70,200 C70,250 100,290 130,320 C155,345 160,390 180,450 C190,480 205,480 215,440 C230,380 240,320 250,320 C260,320 270,380 285,440 C295,480 310,480 320,450 C340,390 345,345 370,320 C400,290 430,250 430,200 C430,130 390,80 340,80 C290,80 265,115 250,115 C235,115 210,80 160,80 Z"
              stroke="#FFFEFE"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Top Floating Navigation Pill */}
          <motion.nav
            key={`nav-${animKey}`}
            className="dh-nav-pill"
            initial={{ opacity: 0, y: -25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <a href="#" className="dh-logo-wrap">
              <span className="dh-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 3C4.2 3 2 5.5 2 9C2 12.5 3.8 15 5.5 17.5C7.2 20 8.5 22 9.5 22C10.5 22 11.2 19 12 19C12.8 19 13.5 22 14.5 22C15.5 22 16.8 20 18.5 17.5C20.2 15 22 12.5 22 9C22 5.5 19.8 3 17 3C14.2 3 13 5.5 12 5.5C11 5.5 9.8 3 7 3Z"
                    fill="#FFFEFE"
                  />
                </svg>
              </span>
              <span className="dh-logo-text">Dental</span>
            </a>

            <button
              className="dh-menu-btn"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span
                className="dh-menu-line"
                style={{
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
                }}
              />
              <span
                className="dh-menu-line"
                style={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="dh-menu-line"
                style={{
                  transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
                }}
              />
            </button>
          </motion.nav>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="dh-dropdown"
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <a href="#services" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                  <span>Services & Treatments</span>
                  <span>→</span>
                </a>
                <a href="#about" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                  <span>About Our Clinic</span>
                  <span>→</span>
                </a>
                <a href="#dentists" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                  <span>Certified Doctors</span>
                  <span>→</span>
                </a>
                <a href="#reviews" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                  <span>Patient Reviews</span>
                  <span>→</span>
                </a>
                <a
                  href="#appointment"
                  className="dh-dropdown-item"
                  style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: 600 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Book Appointment</span>
                  <span>✦</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Column (Top-to-Bottom Infinite Slider) */}
          <div className="dh-col-left">
            <motion.div
              className="dh-slider-track"
              animate={{
                y: ['-50%', '0%'],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 35,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedLeftImages.map((src, index) => (
                <div className="dh-card" key={`left-card-${index}`}>
                  <img src={src} alt={`Dental clinic procedure ${index + 1}`} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (Bottom-to-Top Infinite Slider) */}
          <div className="dh-col-right">
            <motion.div
              className="dh-slider-track"
              animate={{
                y: ['0%', '-50%'],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 35,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedRightImages.map((src, index) => (
                <div className="dh-card" key={`right-card-${index}`}>
                  <img src={src} alt={`Dental patient care ${index + 1}`} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Center Content */}
          <div className="dh-center-group">
            <div className="dh-inner-content">
              <div className="dh-text-box" key={`text-box-${animKey}`}>
                <h1
                  style={{
                    margin: 0,
                    padding: 0,
                    fontWeight: 'normal',
                    fontSize: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {/* Line 1 */}
                  <span className="dh-title-line-wrap">
                    {line1Words.map((word, wIdx) => (
                      <span key={wIdx} className="dh-title-word-mask">
                        <motion.span
                          className="dh-title-word"
                          initial={{ y: '-120%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '-120%', opacity: 0 }}
                          transition={{
                            duration: 0.82,
                            delay: wIdx * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </span>

                  {/* Line 2 */}
                  <span className="dh-title-line-wrap">
                    {line2Words.map((word, wIdx) => (
                      <span key={wIdx} className="dh-title-word-mask">
                        <motion.span
                          className="dh-title-word"
                          initial={{ y: '-120%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '-120%', opacity: 0 }}
                          transition={{
                            duration: 0.82,
                            delay: 0.2 + wIdx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="dh-subtitle-wrap">
                  <motion.p
                    className="dh-subtitle"
                    initial={{ y: '-110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 0.95 } : { y: '-110%', opacity: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    From routine checkups to complete smile makeovers, our experienced dentists provide gentle, painless, and affordable treatment using modern technology.
                  </motion.p>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                key={`cta-${animKey}`}
                className="dh-cta-group"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
              >
                <a
                  href="#appointment"
                  className="dh-btn-primary"
                  style={{
                    backgroundColor: isPrimaryHovered ? '#15B8A7' : '#FFFEFE',
                    color: isPrimaryHovered ? '#FFFEFE' : '#15B8A7',
                    border: isPrimaryHovered ? '1px solid #FFFEFE' : '1px solid transparent',
                    transform: isPrimaryHovered ? 'translateY(-2px)' : 'none',
                    boxShadow: isPrimaryHovered ? '0 8px 22px rgba(0, 0, 0, 0.18)' : '0 4px 14px rgba(0, 0, 0, 0.08)',
                  }}
                  onMouseEnter={() => setIsPrimaryHovered(true)}
                  onMouseLeave={() => setIsPrimaryHovered(false)}
                >
                  <RollingText text="Book an Appointment" isHovered={isPrimaryHovered} />
                </a>

                <a
                  href="tel:+666890890890"
                  className="dh-btn-secondary"
                  style={{
                    backgroundColor: isSecondaryHovered ? '#FFFEFE' : 'transparent',
                    color: isSecondaryHovered ? '#15B8A7' : '#FFFEFE',
                    borderColor: '#FFFEFE',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    transform: isSecondaryHovered ? 'translateY(-2px)' : 'none',
                    boxShadow: isSecondaryHovered ? '0 8px 22px rgba(0, 0, 0, 0.18)' : 'none',
                  }}
                  onMouseEnter={() => setIsSecondaryHovered(true)}
                  onMouseLeave={() => setIsSecondaryHovered(false)}
                >
                  <RollingText text="+ 666 890 890 890" isHovered={isSecondaryHovered} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Badges */}
          <motion.div
            key={`badges-${animKey}`}
            className="dh-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          >
            <div className="dh-badge-item-1">
              <span className="dh-check-icon">
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="dh-badge-text">15+ Years of Experience</span>
            </div>

            <div className="dh-badge-item-2">
              <span className="dh-check-icon">
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="dh-badge-text">10k+ Happy Patients</span>
            </div>

            <div className="dh-badge-item-3">
              <span className="dh-check-icon">
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="dh-badge-text">Certified & Expert Dentists</span>
            </div>
          </motion.div>
        </header>
      )}

      {/* ================= MOBILE VIEW (Fully Responsive Mobile Layout) ================= */}
      {isMobile && (
        <div className="dh-mobile-wrapper">
          {/* Subtle Tooth Watermark */}
          <svg
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              left: 'calc(50% - 160px)',
              top: '180px',
              opacity: 0.04,
              pointerEvents: 'none',
              zIndex: 1,
            }}
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M160,80 C110,80 70,130 70,200 C70,250 100,290 130,320 C155,345 160,390 180,450 C190,480 205,480 215,440 C230,380 240,320 250,320 C260,320 270,380 285,440 C295,480 310,480 320,450 C340,390 345,345 370,320 C400,290 430,250 430,200 C430,130 390,80 340,80 C290,80 265,115 250,115 C235,115 210,80 160,80 Z"
              stroke="#FFFEFE"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Mobile Top Pill Nav */}
          <nav className="dh-mobile-nav">
            <a href="#" className="dh-logo-wrap">
              <span className="dh-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 3C4.2 3 2 5.5 2 9C2 12.5 3.8 15 5.5 17.5C7.2 20 8.5 22 9.5 22C10.5 22 11.2 19 12 19C12.8 19 13.5 22 14.5 22C15.5 22 16.8 20 18.5 17.5C20.2 15 22 12.5 22 9C22 5.5 19.8 3 17 3C14.2 3 13 5.5 12 5.5C11 5.5 9.8 3 7 3Z"
                    fill="#FFFEFE"
                  />
                </svg>
              </span>
              <span className="dh-logo-text">Dental</span>
            </a>

            <button
              className="dh-menu-btn"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span
                className="dh-menu-line"
                style={{
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
                }}
              />
              <span
                className="dh-menu-line"
                style={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="dh-menu-line"
                style={{
                  transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
                }}
              />
            </button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="dh-mobile-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#services" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    <span>Services & Treatments</span>
                    <span>→</span>
                  </a>
                  <a href="#about" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    <span>About Our Clinic</span>
                    <span>→</span>
                  </a>
                  <a href="#dentists" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    <span>Certified Doctors</span>
                    <span>→</span>
                  </a>
                  <a href="#reviews" className="dh-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    <span>Patient Reviews</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#appointment"
                    className="dh-dropdown-item"
                    style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: 600 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Book Appointment</span>
                    <span>✦</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Mobile Hero Content */}
          <div className="dh-mobile-hero">
            <h1 className="dh-mobile-title">
              YOUR SMILE<br />
              NEEDS THE BEST CARE
            </h1>

            <p className="dh-mobile-subtitle">
              From routine checkups to complete smile makeovers, our experienced dentists provide gentle, painless, and affordable treatment using modern technology.
            </p>

            {/* Mobile CTA Buttons */}
            <div className="dh-mobile-cta">
              <a
                href="#appointment"
                className="dh-btn-primary"
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: isPrimaryHovered ? '#15B8A7' : '#FFFEFE',
                  color: isPrimaryHovered ? '#FFFEFE' : '#15B8A7',
                  border: isPrimaryHovered ? '1px solid #FFFEFE' : '1px solid transparent',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
              >
                <RollingText text="Book an Appointment" isHovered={isPrimaryHovered} />
              </a>

              <a
                href="tel:+666890890890"
                className="dh-btn-secondary"
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: isSecondaryHovered ? '#FFFEFE' : 'transparent',
                  color: isSecondaryHovered ? '#15B8A7' : '#FFFEFE',
                  borderColor: '#FFFEFE',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
                onMouseEnter={() => setIsSecondaryHovered(true)}
                onMouseLeave={() => setIsSecondaryHovered(false)}
              >
                <RollingText text="+ 666 890 890 890" isHovered={isSecondaryHovered} />
              </a>
            </div>
          </div>

          {/* Mobile Image Gallery Cards Carousel */}
          <div className="dh-mobile-gallery">
            {leftImages.map((src, idx) => (
              <div className="dh-mobile-card" key={`mob-img-${idx}`}>
                <img src={src} alt="Dental care procedure" />
              </div>
            ))}
          </div>

          {/* Mobile Bottom Badges */}
          <div className="dh-mobile-badges">
            <div className="dh-mobile-badge-item">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>15+ Years of Experience</span>
            </div>

            <div className="dh-mobile-badge-item">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>10k+ Happy Patients</span>
            </div>

            <div className="dh-mobile-badge-item">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L5.5 10L13.5 2" stroke="#FFFEFE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Certified & Expert Dentists</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
