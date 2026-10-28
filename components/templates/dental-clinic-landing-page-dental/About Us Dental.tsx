import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
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

  // Trigger animation reliably on mount and every viewport intersection
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

  const stats = [
    { number: '15+', label: 'Years of Experience' },
    { number: '10K+', label: 'Happy Patients' },
    { number: '10+', label: 'Expert Dentists' },
    { number: '24/7', label: 'Emergency Care' },
  ];

  const headlineLines = [
    'FROM YOUR FIRST CHECKUP TO ADVANCED TREATMENTS LIKE',
    'IMPLANTS AND BRACES, WE TAKE TIME TO LISTEN, EXPLAIN EVERY STEP',
    'CLEARLY, AND CREATE A PLAN THAT FITS YOUR NEEDS AND BUDGET.',
    'MODERN EQUIPMENT, STRICT HYGIENE, AND A FRIENDLY TEAM MAKE',
    'EVERY VISIT COMFORTABLE.',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1430 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F0FDFA',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* Top Main Frame (Frame 2147226751) */
        .da-main-frame {
          position: absolute;
          width: 1274px;
          height: 645px;
          left: 163px;
          top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 40px;
          box-sizing: border-box;
        }

        /* Pill Badge (Frame 2147226743) */
        .da-badge-pill {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          width: 106px;
          height: 44px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          cursor: default;
          transition: all 0.25s ease;
        }

        .da-badge-pill:hover {
          background-color: rgba(15, 118, 110, 0.06);
          transform: translateY(-1px);
        }

        .da-badge-text {
          width: 64px;
          height: 22px;
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #0F776F;
        }

        /* Content Frame (Frame 2147226750) */
        .da-content-frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 90px;
          width: 1274px;
          height: 561px;
        }

        /* Big Statement Headline */
        .da-headline-box {
          width: 1422px;
          height: 330px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .da-headline-line-wrap {
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .da-headline-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 56px;
          line-height: 66px;
          text-align: center;
          text-transform: uppercase;
          color: #01504A;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }

        /* Stats Row (Frame 2147226749) */
        .da-stats-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0px;
          gap: 103px;
          width: 1234px;
          height: 141px;
        }

        .da-stat-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0px;
          gap: 2px;
          width: 136px;
          height: 141px;
          flex: none;
        }

        .da-stat-number {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 90px;
          line-height: 117px;
          text-align: center;
          color: #01504A;
          margin: 0;
          white-space: nowrap;
        }

        .da-stat-label {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #0F776F;
          white-space: nowrap;
          margin: 0;
        }

        /* Divider (Rectangle 5) */
        .da-divider {
          width: 2px;
          height: 102px;
          background: #A8E3D5;
          flex: none;
        }

        /* Big Banner Image (Rectangle 6) */
        .da-image-banner {
          position: absolute;
          width: 1434px;
          height: 600px;
          left: calc(50% - 1434px / 2);
          top: 776px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(0, 81, 74, 0.08);
          background-color: #E7F4F1;
        }

        .da-image-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .da-image-banner:hover img {
          transform: scale(1.025);
        }

        /* ================= MOBILE ABOUT STYLES ================= */
        .da-mobile-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 18px 72px;
          box-sizing: border-box;
          text-align: center;
        }

        .da-mobile-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 22px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          font-family: 'Inter Tight', sans-serif;
          font-size: 14px;
          color: #0F776F;
          margin-bottom: 24px;
        }

        .da-mobile-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(26px, 6.8vw, 36px);
          line-height: 1.25;
          text-align: center;
          text-transform: uppercase;
          color: #01504A;
          margin: 0 0 36px;
          max-width: 540px;
          letter-spacing: -0.2px;
        }

        .da-mobile-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 16px;
          width: 100%;
          max-width: 480px;
          padding: 24px 8px;
          border-top: 1px solid #A8E3D5;
          border-bottom: 1px solid #A8E3D5;
          margin-bottom: 36px;
        }

        .da-mobile-stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .da-mobile-stat-num {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(44px, 11vw, 54px);
          line-height: 1.05;
          color: #01504A;
          margin: 0;
        }

        .da-mobile-stat-lbl {
          font-family: 'Inter Tight', sans-serif;
          font-size: 14px;
          line-height: 18px;
          color: #0F776F;
          margin: 4px 0 0;
        }

        .da-mobile-img-banner {
          width: 100%;
          max-width: 540px;
          height: 250px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(0, 81, 74, 0.1);
        }

        .da-mobile-img-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1430px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#F0FDFA',
            overflow: 'hidden',
            color: '#01504A',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {/* Main Content Area */}
          <div className="da-main-frame">
            {/* Top Pill Badge */}
            <motion.div
              key={`badge-${animKey}`}
              className="da-badge-pill"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="da-badge-text">About Us</span>
            </motion.div>

            {/* Headline & Stats Group */}
            <div className="da-content-frame">
              {/* Headline with Staggered Line Top-Reveal */}
              <div className="da-headline-box" key={`headline-${animKey}`}>
                {headlineLines.map((line, idx) => (
                  <div key={idx} className="da-headline-line-wrap">
                    <motion.p
                      className="da-headline-text"
                      initial={{ y: '-110%', opacity: 0 }}
                      animate={isInView ? { y: '0%', opacity: 1 } : { y: '-110%', opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {line}
                    </motion.p>
                  </div>
                ))}
              </div>

              {/* Stats Row with Vertical Dividers */}
              <motion.div
                key={`stats-${animKey}`}
                className="da-stats-row"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              >
                {stats.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="da-stat-item">
                      <h3 className="da-stat-number">{item.number}</h3>
                      <p className="da-stat-label">{item.label}</p>
                    </div>
                    {index < stats.length - 1 && (
                      <motion.div
                        className="da-divider"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.08, ease: 'easeOut' }}
                        style={{ transformOrigin: 'center' }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Banner Image */}
          <motion.div
            key={`img-banner-${animKey}`}
            className="da-image-banner"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://cdn.jiro.build/Dentis/Image/a%201.png"
              alt="Doctor providing modern care in dental clinic operatory room"
            />
          </motion.div>
        </div>
      )}

      {/* ================= MOBILE VIEW (Fully Responsive Mobile Layout) ================= */}
      {isMobile && (
        <div className="da-mobile-wrapper">
          {/* Mobile Badge */}
          <div className="da-mobile-badge">
            <span>About Us</span>
          </div>

          {/* Mobile Statement Headline */}
          <h2 className="da-mobile-headline">
            From your first checkup to advanced treatments like implants and braces, we take time to listen, explain every step clearly, and create a plan that fits your needs and budget. Modern equipment, strict hygiene, and a friendly team make every visit comfortable.
          </h2>

          {/* Mobile 2x2 Stats Grid */}
          <div className="da-mobile-stats-grid">
            {stats.map((item, index) => (
              <div className="da-mobile-stat-box" key={`mob-stat-${index}`}>
                <h3 className="da-mobile-stat-num">{item.number}</h3>
                <p className="da-mobile-stat-lbl">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Mobile Banner Image */}
          <div className="da-mobile-img-banner">
            <img
              src="https://cdn.jiro.build/Dentis/Image/a%201.png"
              alt="Doctor providing modern care in dental clinic operatory room"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
