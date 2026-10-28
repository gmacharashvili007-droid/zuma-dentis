import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
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

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);
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

  // Trigger animation reliably on mount and viewport intersection
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

  const serviceItems = [
    {
      num: '01',
      title: 'General Checkup & Cleaning',
      desc: 'Regular exams and professional cleaning to keep your teeth and gums healthy.',
      img: 'https://cdn.jiro.build/Dentis/Image/s1.png',
    },
    {
      num: '02',
      title: 'Root Canal Treatment',
      desc: 'Save your natural tooth and relieve pain with gentle, modern root canal care.',
      img: 'https://cdn.jiro.build/Dentis/Image/s2.png',
    },
    {
      num: '03',
      title: 'Braces & Aligners',
      desc: 'Straighten your teeth with traditional braces or clear, nearly invisible aligners.',
      img: 'https://cdn.jiro.build/Dentis/Image/s3.png',
    },
    {
      num: '04',
      title: 'Dental Implants',
      desc: 'Replace missing teeth with strong, natural-looking implants that last for years.',
      img: 'https://cdn.jiro.build/Dentis/Image/s4.png',
    },
    {
      num: '05',
      title: 'Kids Dentistry',
      desc: 'Friendly, patient care that helps children feel safe and build healthy habits.',
      img: 'https://cdn.jiro.build/Dentis/Image/s5.png',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1423 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F0FDFA',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* Top Header Frame (Frame 318) */
        .ds-top-bar {
          position: absolute;
          width: 1440px;
          height: 118px;
          left: 80px;
          top: 80px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 17px;
          box-sizing: border-box;
        }

        .ds-top-row {
          width: 1440px;
          height: 100px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .ds-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 60px;
          line-height: 80px;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0;
          letter-spacing: -0.2px;
          will-change: transform, opacity;
        }

        .ds-tooth-icon {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }

        .ds-tooth-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 6px 12px rgba(15, 118, 110, 0.08));
        }

        .ds-divider-top {
          width: 1440px;
          height: 1px;
          background: rgba(73, 73, 73, 0.25);
          flex: none;
        }

        /* Services List (Frame 2147226752) */
        .ds-list-container {
          position: absolute;
          width: 1440px;
          height: 1125px;
          left: 80px;
          top: 218px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 40px;
        }

        /* Single Service Row */
        .ds-item-block {
          width: 1440px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
          box-sizing: border-box;
          border-radius: 8px;
          transition: background-color 0.25s ease;
          padding: 8px 12px;
          cursor: pointer;
        }

        .ds-item-block:hover {
          background-color: rgba(15, 118, 110, 0.025);
        }

        .ds-item-row {
          width: 1440px;
          height: 162px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        /* Left Info Column (Frame 314) */
        .ds-col-title {
          width: 380px;
          height: 162px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          flex: none;
        }

        .ds-meta-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
          width: 100%;
        }

        .ds-badge-num {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
        }

        .ds-num-dot {
          width: 8px;
          height: 8px;
          background: #15B8A6;
          border-radius: 2px;
          flex: none;
        }

        .ds-num-text {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          color: #00231F;
        }

        .ds-service-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 30px;
          line-height: 40px;
          text-transform: uppercase;
          color: #00231F;
          margin: 0;
          letter-spacing: -0.2px;
          transition: color 0.25s ease;
          will-change: transform, opacity;
        }

        .ds-item-block:hover .ds-service-title {
          color: #0F776F;
        }

        /* Bracketed Arrow [ ↗ ] (Frame 313) */
        .ds-arrow-bracket {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2px;
          width: 38px;
          height: 27px;
          font-family: 'Inter Tight', sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: #6B6A6B;
          transition: color 0.25s ease, transform 0.25s ease;
          will-change: transform, opacity;
        }

        .ds-arrow-bracket.active,
        .ds-item-block:hover .ds-arrow-bracket {
          color: #15B8A6;
          transform: translateX(4px);
        }

        .ds-arrow-bracket svg {
          transition: stroke 0.25s ease, transform 0.25s ease;
        }

        .ds-arrow-bracket.active svg,
        .ds-item-block:hover .ds-arrow-bracket svg {
          stroke: #15B8A6;
          transform: translate(2px, -2px);
        }

        /* Center Description Column */
        .ds-col-desc {
          width: 280px;
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: #00231F;
          margin: 0;
          flex: none;
          will-change: transform, opacity;
        }

        /* Right Image Column */
        .ds-col-image {
          width: 273px;
          height: 162px;
          border-radius: 12px;
          overflow: hidden;
          flex: none;
          box-shadow: 0 10px 24px rgba(0, 34, 31, 0.07);
          background-color: #E7F4F1;
          will-change: transform, opacity;
        }

        .ds-col-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ds-item-block:hover .ds-col-image img {
          transform: scale(1.05);
        }

        .ds-row-divider {
          width: 1440px;
          height: 1px;
          background: rgba(73, 73, 73, 0.25);
          flex: none;
          will-change: transform;
        }

        /* ================= MOBILE SERVICES STYLES ================= */
        .ds-mobile-wrapper {
          width: 100%;
          padding: 50px 18px 70px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ds-mobile-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(73, 73, 73, 0.25);
        }

        .ds-mobile-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 38px;
          line-height: 44px;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0;
        }

        .ds-mobile-tooth {
          width: 60px;
          height: 60px;
          flex: none;
        }
        .ds-mobile-tooth img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .ds-mobile-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(73, 73, 73, 0.2);
        }

        .ds-mobile-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .ds-mobile-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 26px;
          line-height: 32px;
          text-transform: uppercase;
          color: #00231F;
          margin: 0;
        }

        .ds-mobile-desc {
          font-family: 'Inter Tight', sans-serif;
          font-size: 15px;
          line-height: 22px;
          color: #00231F;
          margin: 0;
        }

        .ds-mobile-img {
          width: 100%;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 34, 31, 0.08);
        }
        .ds-mobile-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1423px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#F0FDFA',
            overflow: 'hidden',
            color: '#00231F',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {/* Top Header Bar with Bottom Reveal on Title */}
          <div className="ds-top-bar" key={`top-bar-${animKey}`}>
            <div className="ds-top-row">
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  className="ds-heading"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
                >
                  Our Services
                </motion.h2>
              </div>

              <motion.div
                className="ds-tooth-icon"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
              >
                <img src="/images/tooth_3d.jpg" alt="Healthy molar tooth 3D icon" />
              </motion.div>
            </div>
            <motion.div
              className="ds-divider-top"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Services List Rows with Bottom Reveal on All Texts */}
          <div className="ds-list-container" key={`list-${animKey}`}>
            {serviceItems.map((item, index) => {
              const isHovered = hoveredIdx === index;
              const delayBase = 0.2 + index * 0.12;

              return (
                <div
                  className="ds-item-block"
                  key={`srv-${index}`}
                  onMouseEnter={() => setHoveredIdx(index)}
                >
                  <div className="ds-item-row">
                    {/* Column 1: Number, Title & Arrow with Bottom Reveal */}
                    <div className="ds-col-title">
                      <div className="ds-meta-group">
                        {/* Number Badge with Bottom Reveal */}
                        <div style={{ overflow: 'hidden' }}>
                          <motion.div
                            className="ds-badge-num"
                            initial={{ y: '110%', opacity: 0 }}
                            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: delayBase,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <span className="ds-num-dot" />
                            <span className="ds-num-text">{item.num}</span>
                          </motion.div>
                        </div>

                        {/* Service Title with Bottom Reveal */}
                        <div style={{ overflow: 'hidden', width: '100%' }}>
                          <motion.h3
                            className="ds-service-title"
                            initial={{ y: '110%', opacity: 0 }}
                            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: delayBase + 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            {item.title}
                          </motion.h3>
                        </div>
                      </div>

                      {/* [ ↗ ] Indicator with Bottom Reveal */}
                      <div style={{ overflow: 'hidden' }}>
                        <motion.div
                          className={`ds-arrow-bracket ${isHovered ? 'active' : ''}`}
                          initial={{ y: '110%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: delayBase + 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <span>[</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isHovered ? '#15B8A6' : '#6B6A6B'}
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                          <span>]</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Column 2: Description with Bottom Reveal */}
                    <div style={{ overflow: 'hidden' }}>
                      <motion.p
                        className="ds-col-desc"
                        initial={{ y: '110%', opacity: 0 }}
                        animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: delayBase + 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {item.desc}
                      </motion.p>
                    </div>

                    {/* Column 3: Image Card with Bottom Entrance */}
                    <motion.div
                      className="ds-col-image"
                      initial={{ opacity: 0, y: 35 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                      transition={{
                        duration: 0.75,
                        delay: delayBase + 0.12,
                        ease: 'easeOut',
                      }}
                    >
                      <img src={item.img} alt={item.title} />
                    </motion.div>
                  </div>

                  {/* Horizontal Divider Line */}
                  <motion.div
                    className="ds-row-divider"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: delayBase + 0.15,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (Responsive Mobile Layout with Bottom Reveal) ================= */}
      {isMobile && (
        <div className="ds-mobile-wrapper" key={`mob-wrap-${animKey}`}>
          {/* Top Bar on Mobile */}
          <div className="ds-mobile-top-bar">
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="ds-mobile-heading"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                Our Services
              </motion.h2>
            </div>
            <div className="ds-mobile-tooth">
              <img src="/images/tooth_3d.jpg" alt="Tooth icon" />
            </div>
          </div>

          {/* Service Items on Mobile */}
          {serviceItems.map((item, index) => {
            const delayBase = 0.15 + index * 0.1;
            return (
              <div className="ds-mobile-item" key={`mob-srv-${index}`}>
                <div className="ds-mobile-meta">
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div
                      className="ds-badge-num"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                      transition={{ duration: 0.65, delay: delayBase, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="ds-num-dot" />
                      <span className="ds-num-text">{item.num}</span>
                    </motion.div>
                  </div>

                  <div className="ds-arrow-bracket active">
                    <span>[</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#15B8A6"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                    <span>]</span>
                  </div>
                </div>

                <div style={{ overflow: 'hidden' }}>
                  <motion.h3
                    className="ds-mobile-title"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    transition={{ duration: 0.75, delay: delayBase + 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.title}
                  </motion.h3>
                </div>

                <div style={{ overflow: 'hidden' }}>
                  <motion.p
                    className="ds-mobile-desc"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    transition={{ duration: 0.75, delay: delayBase + 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.desc}
                  </motion.p>
                </div>

                <motion.div
                  className="ds-mobile-img"
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                  transition={{ duration: 0.65, delay: delayBase + 0.12, ease: 'easeOut' }}
                >
                  <img src={item.img} alt={item.title} />
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Services;
