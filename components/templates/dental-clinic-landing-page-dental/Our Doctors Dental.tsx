import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Doctors: React.FC = () => {
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

  // Reliable IntersectionObserver on sectionRef + initial mount timer so content is NEVER blank
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
    };
  }, []);

  const doctorsList = [
    {
      name: 'Dr. Ghusali',
      role: 'Chief Dental Surgeon',
      bio: 'Leads our clinic with 10+ years of experience in advanced and restorative dentistry. Specializes in braces and clear aligners for healthier smiles.',
      img: 'https://cdn.jiro.build/Dentis/Image/d1.png',
    },
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Orthodontics Specialist',
      bio: 'Specializes in modern clear aligners, orthodontic realignment, and aesthetic smile symmetry with over 8 years of clinical expertise.',
      img: 'https://cdn.jiro.build/Dentis/Image/d2.png',
    },
    {
      name: 'Dr. Marcus Vance',
      role: 'Implant & Surgical Care',
      bio: 'Board-certified oral surgeon specializing in dental implants, bone grafting, and gentle surgical restoration for complex cases.',
      img: 'https://cdn.jiro.build/Dentis/Image/d3.png',
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Pediatric Specialist',
      bio: 'Dedicated pediatric dentist skilled in gentle behavioral care, preventive treatments, and creating joyful experiences for young smiles.',
      img: 'https://cdn.jiro.build/Dentis/Image/d4.png',
    },
    {
      name: 'Dr. Julian Thorne',
      role: 'Cosmetic Dentist',
      bio: 'Renowned cosmetic dental specialist focused on bespoke porcelain veneers, digital smile design, and advanced whitening therapies.',
      img: 'https://cdn.jiro.build/Dentis/Image/d5.png',
    },
    {
      name: 'Dr. Sophia Rossi',
      role: 'Endodontics & Care',
      bio: 'Endodontic expert specializing in microscopic root canal therapies, emergency tooth relief, and saving natural teeth with zero pain.',
      img: 'https://cdn.jiro.build/Dentis/Image/d6.png',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="dentists"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1360 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F0FDFA',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */
        
        /* Top Header Frame (Frame 2147226796) */
        .dd-header-box {
          position: absolute;
          width: 451px;
          height: 224px;
          left: 575px;
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
        .dd-badge-pill {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          width: 126px;
          height: 44px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          cursor: default;
          transition: all 0.25s ease;
        }

        .dd-badge-pill:hover {
          background-color: rgba(15, 118, 110, 0.06);
          transform: translateY(-1px);
        }

        .dd-badge-text {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #0F776F;
        }

        /* Main Heading (Instrument Serif) */
        .dd-heading-text {
          width: 451px;
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
          will-change: transform, opacity;
        }

        /* Doctors Grid Container (6 Cards) */
        .dd-grid-container {
          position: absolute;
          width: 1320px;
          left: 140px;
          top: 364px;
          display: grid;
          grid-template-columns: repeat(3, 420px);
          grid-template-rows: repeat(2, 398px);
          gap: 30px 30px;
          box-sizing: border-box;
        }

        /* Fixed wrapper maintaining grid stability */
        .dd-card-wrapper {
          width: 420px;
          height: 398px;
          position: relative;
        }

        /* Doctor Card (Expands / Drops downwards on hover) */
        .dd-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 420px;
          background: #FFFEFE;
          border-radius: 30px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }

        .dd-card-wrapper:hover .dd-card {
          z-index: 50;
          transform: translateY(-4px);
        }

        /* Card Top Image Box */
        .dd-card-image-wrap {
          width: 420px;
          height: 302px;
          overflow: hidden;
          background-color: #E6F5F1;
          position: relative;
          flex: none;
        }

        .dd-card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dd-card-wrapper:hover .dd-card-image-wrap img {
          transform: scale(1.035);
        }

        /* Dropping Info Area */
        .dd-card-drop-panel {
          width: 420px;
          background: #FFFEFE;
          padding: 18px 24px 22px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        /* Expandable Bio Text */
        .dd-card-bio-wrap {
          max-height: 0px;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-8px);
          transition: max-height 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.35s ease,
                      transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                      margin 0.35s ease;
          margin-bottom: 0px;
        }

        .dd-card-wrapper:hover .dd-card-bio-wrap {
          max-height: 100px;
          opacity: 1;
          transform: translateY(0px);
          margin-bottom: 20px;
        }

        .dd-card-bio-text {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #010001;
          margin: 0;
        }

        /* Bottom Meta Row */
        .dd-card-meta-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .dd-doctor-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dd-doctor-name {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 28px;
          color: #010001;
          margin: 0;
          transition: color 0.25s ease;
        }

        .dd-card-wrapper:hover .dd-doctor-name {
          color: #0F776F;
        }

        .dd-doctor-role {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #010001;
          margin: 0;
        }

        .dd-book-btn {
          font-family: 'Inter Tight', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #0F776F;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 8px;
          transition: all 0.25s ease;
        }

        .dd-book-btn:hover {
          color: #01504B;
          background-color: rgba(15, 118, 110, 0.08);
          transform: translateX(3px);
        }

        .dd-book-btn svg {
          transition: transform 0.25s ease;
        }

        .dd-book-btn:hover svg {
          transform: translateX(2px);
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .dd-mobile-wrapper {
          width: 100%;
          padding: 56px 20px 72px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          background-color: #F0FDFA;
        }

        .dd-mobile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          width: 100%;
          max-width: 480px;
        }

        .dd-mobile-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(34px, 8.5vw, 48px);
          line-height: 1.12;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .dd-mobile-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          max-width: 440px;
        }

        .dd-mobile-card {
          width: 100%;
          background: #FFFEFE;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dd-mobile-card-img {
          width: 100%;
          height: 250px;
          overflow: hidden;
          background-color: #E6F5F1;
        }

        .dd-mobile-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }

        .dd-mobile-drop-panel {
          padding: 18px 20px 22px;
          display: flex;
          flex-direction: column;
          background: #FFFEFE;
        }

        .dd-mobile-bio-text {
          font-family: 'Inter Tight', sans-serif;
          font-size: 15px;
          line-height: 22px;
          color: #010001;
          margin: 0 0 16px 0;
        }

        .dd-mobile-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .dd-mobile-name {
          font-family: 'Inter Tight', sans-serif;
          font-size: 20px;
          font-weight: 500;
          color: #010001;
          margin: 0 0 2px;
        }

        .dd-mobile-role {
          font-family: 'Inter Tight', sans-serif;
          font-size: 14px;
          color: #010001;
          margin: 0;
        }

        .dd-mobile-book {
          font-family: 'Inter Tight', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #0F776F;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background-color: rgba(15, 118, 110, 0.08);
          border-radius: 8px;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1360px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#F0FDFA',
            overflow: 'hidden',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {/* Top Header Group with Bottom Reveal */}
          <div className="dd-header-box" key={`hdr-${animKey}`}>
            {/* Pill Badge */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="dd-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="dd-badge-text">Our Doctors</span>
              </motion.div>
            </div>

            {/* Headline with 2 Masked Lines for Bottom Reveal */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="dd-heading-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.82, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                MEET THE EXPERTS
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="dd-heading-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.82, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                BEHIND YOUR SMILE
              </motion.h2>
            </div>
          </div>

          {/* Doctors Grid with Interactive Downward Drop on Hover */}
          <div className="dd-grid-container" key={`grid-${animKey}`}>
            {doctorsList.map((doc, idx) => {
              const rowIndex = Math.floor(idx / 3);
              const colIndex = idx % 3;
              const delay = 0.15 + rowIndex * 0.15 + colIndex * 0.08;

              return (
                <motion.div
                  key={idx}
                  className="dd-card-wrapper"
                  initial={{ opacity: 0, y: 35 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                  transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dd-card">
                    {/* Photo Area */}
                    <div className="dd-card-image-wrap">
                      <img src={doc.img} alt={doc.name} />
                    </div>

                    {/* Dropping Info Area */}
                    <div className="dd-card-drop-panel">
                      {/* Bio Text (Drops down smoothly on hover) */}
                      <div className="dd-card-bio-wrap">
                        <p className="dd-card-bio-text">{doc.bio}</p>
                      </div>

                      {/* Bottom Meta Row */}
                      <div className="dd-card-meta-row">
                        <div className="dd-doctor-meta">
                          <h3 className="dd-doctor-name">{doc.name}</h3>
                          <p className="dd-doctor-role">{doc.role}</p>
                        </div>

                        <a href="#appointment" className="dd-book-btn">
                          <span>Book Now</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (Responsive Mobile Layout) ================= */}
      {isMobile && (
        <div className="dd-mobile-wrapper" key={`mob-wrap-${animKey}`}>
          {/* Mobile Header */}
          <div className="dd-mobile-header">
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="dd-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="dd-badge-text">Our Doctors</span>
              </motion.div>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="dd-mobile-title"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                MEET THE EXPERTS
                <br />
                BEHIND YOUR SMILE
              </motion.h2>
            </div>
          </div>

          {/* Mobile Doctors Grid (Clean Card Layout with Full Bio & Book Button) */}
          <div className="dd-mobile-grid" key={`mob-grid-${animKey}`}>
            {doctorsList.map((doc, idx) => {
              const delay = 0.1 + (idx % 3) * 0.08;
              return (
                <motion.div
                  key={idx}
                  className="dd-mobile-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                  transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dd-mobile-card-img">
                    <img src={doc.img} alt={doc.name} />
                  </div>

                  <div className="dd-mobile-drop-panel">
                    <p className="dd-mobile-bio-text">{doc.bio}</p>

                    <div className="dd-mobile-meta-row">
                      <div>
                        <h3 className="dd-mobile-name">{doc.name}</h3>
                        <p className="dd-mobile-role">{doc.role}</p>
                      </div>

                      <a href="#appointment" className="dd-mobile-book">
                        <span>Book Now</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;
