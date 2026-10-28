import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  // Resize listener for scaling
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

  // IntersectionObserver for reveal animation
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
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Work', targetId: 'beforeafter' },
    { label: 'Services', targetId: 'services' },
    { label: 'About Us', targetId: 'about' },
    { label: 'Process', targetId: 'whychooseus' },
  ];

  const serviceLinks = [
    { label: 'Checkup & Cleaning', targetId: 'services' },
    { label: 'Root Canal', targetId: 'services' },
    { label: 'Braces & Aligners', targetId: 'services' },
    { label: 'Dental Implants', targetId: 'services' },
  ];

  const connectLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Behance', href: 'https://behance.net' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ];

  return (
    <footer
      ref={sectionRef}
      id="footer"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${745 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#0E776E',
        boxSizing: 'border-box',
        order: 10,
        flex: 'none',
        flexGrow: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */

        /* Frame 391: Copyright Row */
        .footer-copyright-row {
          position: absolute;
          width: 556px;
          height: 28px;
          left: 87px;
          top: 60px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 198px;
          box-sizing: border-box;
          z-index: 10;
        }

        .footer-copy-text {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 28px;
          text-transform: capitalize;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          user-select: none;
        }

        /* Frame 390: Navigation Columns Container */
        .footer-nav-container {
          position: absolute;
          width: 491px;
          height: 167px;
          left: 1023px;
          top: 60px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 85px;
          box-sizing: border-box;
          z-index: 10;
        }

        /* Column Heading */
        .footer-col-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 28px;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0 0 13px 0;
          white-space: nowrap;
          user-select: none;
        }

        /* Links List */
        .footer-links-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          box-sizing: border-box;
        }

        /* Link Item Row */
        .footer-link-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
          height: 24px;
          text-decoration: none;
          color: #FFFFFF;
          cursor: pointer;
          transition: transform 0.22s ease, opacity 0.22s ease;
          background: transparent;
          border: none;
          padding: 0;
        }

        .footer-link-item:hover {
          transform: translateX(4px);
          opacity: 0.88;
        }

        /* Bullet Square (Rectangle 40) */
        .footer-bullet {
          width: 8px;
          height: 8px;
          background: #FFFFFF;
          border-radius: 2px;
          flex: none;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .footer-link-item:hover .footer-bullet {
          transform: rotate(45deg) scale(1.15);
          background-color: #CDFAF0;
        }

        /* Link Text */
        .footer-link-label {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          text-transform: capitalize;
          color: #FFFFFF;
          white-space: nowrap;
          user-select: none;
        }

        /* Giant "DENTIS" Typography */
        .footer-giant-title {
          position: absolute;
          width: 1587px;
          height: 784px;
          left: calc(50% - 1587px/2 + 0.5px);
          top: 135px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 603.086px;
          line-height: 784px;
          text-transform: uppercase;
          color: #FFFFFF;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          margin: 0;
          letter-spacing: -6px;
          z-index: 1;
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .footer-mobile-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 60px 24px 0px;
          box-sizing: border-box;
          background: #0E776E;
          position: relative;
          overflow: hidden;
        }

        .footer-mobile-columns {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          max-width: 520px;
          gap: 36px 20px;
          margin-bottom: 40px;
        }

        .footer-mobile-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 130px;
        }

        .footer-mobile-copy-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 30px;
          text-align: center;
        }

        .footer-mobile-giant {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(96px, 24vw, 220px);
          line-height: 0.95;
          text-transform: uppercase;
          color: #FFFFFF;
          text-align: center;
          width: 100%;
          letter-spacing: -2px;
          margin: 0;
          user-select: none;
          pointer-events: none;
          padding-bottom: 10px;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '745px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#0E776E',
            overflow: 'hidden',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
          }}
        >
          {/* Frame 391: Copyright Row (Left) */}
          <motion.div
            className="footer-copyright-row"
            key={`foot-copy-${animKey}`}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="footer-copy-text">© 2026 Dentist</p>
            <p className="footer-copy-text">All Rights Reserved.</p>
          </motion.div>

          {/* Frame 390: Three Navigation Columns (Right) */}
          <div className="footer-nav-container">
            {/* Column 1: Navigation (Frame 387) */}
            <motion.div
              style={{ width: '87px', boxSizing: 'border-box' }}
              key={`foot-col1-${animKey}`}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="footer-col-heading">Navigation</h3>
              <div className="footer-links-list" style={{ width: '77px' }}>
                {navLinks.map((item, idx) => (
                  <button
                    key={idx}
                    className="footer-link-item"
                    onClick={() => scrollToSection(item.targetId)}
                  >
                    <span className="footer-bullet" />
                    <span
                      className="footer-link-label"
                      style={{ fontWeight: idx === 0 ? 500 : 400 }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Services (Frame 388) */}
            <motion.div
              style={{ width: '152px', boxSizing: 'border-box' }}
              key={`foot-col2-${animKey}`}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="footer-col-heading">Services</h3>
              <div className="footer-links-list" style={{ width: '152px' }}>
                {serviceLinks.map((item, idx) => (
                  <button
                    key={idx}
                    className="footer-link-item"
                    onClick={() => scrollToSection(item.targetId)}
                  >
                    <span className="footer-bullet" />
                    <span className="footer-link-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Connect (Frame 389) */}
            <motion.div
              style={{ width: '82px', boxSizing: 'border-box' }}
              key={`foot-col3-${animKey}`}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="footer-col-heading">Connect</h3>
              <div className="footer-links-list" style={{ width: '82px' }}>
                {connectLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-item"
                  >
                    <span className="footer-bullet" />
                    <span className="footer-link-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Giant "DENTIS" Typography (Layer: dentis) */}
          <motion.h1
            className="footer-giant-title"
            key={`foot-dentis-${animKey}`}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            DENTIS
          </motion.h1>
        </div>
      )}

      {/* ================= MOBILE VIEW (< 860px Responsive Fallback) ================= */}
      {isMobile && (
        <div className="footer-mobile-wrap" key={`foot-mob-${animKey}`}>
          <div className="footer-mobile-columns">
            {/* Mobile Nav Column */}
            <div className="footer-mobile-col">
              <h3 className="footer-col-heading">Navigation</h3>
              <div className="footer-links-list">
                {navLinks.map((item, idx) => (
                  <button
                    key={idx}
                    className="footer-link-item"
                    onClick={() => scrollToSection(item.targetId)}
                  >
                    <span className="footer-bullet" />
                    <span className="footer-link-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Services Column */}
            <div className="footer-mobile-col">
              <h3 className="footer-col-heading">Services</h3>
              <div className="footer-links-list">
                {serviceLinks.map((item, idx) => (
                  <button
                    key={idx}
                    className="footer-link-item"
                    onClick={() => scrollToSection(item.targetId)}
                  >
                    <span className="footer-bullet" />
                    <span className="footer-link-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Connect Column */}
            <div className="footer-mobile-col">
              <h3 className="footer-col-heading">Connect</h3>
              <div className="footer-links-list">
                {connectLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-item"
                  >
                    <span className="footer-bullet" />
                    <span className="footer-link-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-mobile-copy-row">
            <p className="footer-copy-text" style={{ fontSize: '15px' }}>
              © 2026 Dentist
            </p>
            <p className="footer-copy-text" style={{ fontSize: '15px' }}>
              All Rights Reserved.
            </p>
          </div>

          {/* Giant typography for mobile */}
          <motion.h1
            className="footer-mobile-giant"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            DENTIS
          </motion.h1>
        </div>
      )}
    </footer>
  );
};

export default Footer;
