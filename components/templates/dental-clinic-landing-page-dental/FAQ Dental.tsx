import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Character-wise slide animation component for button (matching Header button effect)
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

export const FAQ: React.FC = () => {
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
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);

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

  // 100% Dental Clinic Category FAQs tailored to the landing page
  const faqs = [
    {
      id: 0,
      question: 'Does teeth whitening hurt or damage enamel?',
      answer:
        'Not at all. We use clinically approved, enamel-safe LED and laser technology with desensitizing agents to ensure a completely comfortable, pain-free whitening experience with instant results.',
    },
    {
      id: 1,
      question: 'How often should I get a dental checkup?',
      answer:
        'We recommend visiting every 6 months for a comprehensive oral examination and professional scaling to remove hardened tartar, prevent cavities, and maintain healthy pink gums.',
    },
    {
      id: 2,
      question: 'What is the difference between braces & aligners?',
      answer:
        'Traditional braces use fixed ceramic or metal brackets for complex bite corrections, whereas clear aligners are custom-molded transparent trays that you can easily remove while eating and brushing.',
    },
    {
      id: 3,
      question: 'How long do dental implants typically last?',
      answer:
        'With proper brushing, flossing, and regular clinical checkups, our medical-grade titanium dental implants are engineered to last a lifetime, functioning and looking identical to natural teeth.',
    },
    {
      id: 4,
      question: 'Do you offer same-day emergency appointments?',
      answer:
        'Yes, our clinic reserves priority slots daily for dental emergencies including severe toothaches, broken crowns, chipped enamel, and accidental trauma with gentle, immediate relief.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${708 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FAFBDC',
        boxSizing: 'border-box',
        order: 9,
        flex: 'none',
        flexGrow: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */

        /* Header Frame (Frame 2147226796) */
        .faq-header-box {
          position: absolute;
          width: 720px;
          height: 144px;
          left: calc(50% - 720px/2);
          top: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 20px;
          box-sizing: border-box;
          z-index: 10;
        }

        /* Pill Badge (Frame 2147226743) */
        .faq-badge-pill {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          min-width: 80px;
          height: 44px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          cursor: default;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-badge-pill:hover {
          background-color: rgba(15, 118, 110, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.12);
        }

        .faq-badge-text {
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #0F776F;
          white-space: nowrap;
          user-select: none;
        }

        /* Heading (Frequently Asked Questions) */
        .faq-heading-text {
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

        /* Two Cards Container (Frame 459) */
        .faq-main-row {
          position: absolute;
          width: 1092px;
          height: 364px;
          left: 264px;
          top: 264px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          box-sizing: border-box;
        }

        /* Left Card - Questions (Frame 455) */
        .faq-card-left {
          width: 536px;
          height: 364px;
          background: #0F776F;
          border-radius: 16px;
          position: relative;
          box-sizing: border-box;
          box-shadow: 0 16px 40px -10px rgba(15, 118, 110, 0.28);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .faq-card-left:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 50px -10px rgba(15, 118, 110, 0.38);
        }

        /* Label "Questions" */
        .faq-label-questions {
          position: absolute;
          left: 30px;
          top: 30px;
          width: 90px;
          height: 30px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #FFFEFE;
          margin: 0;
        }

        /* Questions List (Frame 457) */
        .faq-questions-list {
          position: absolute;
          left: 23px;
          top: 86px;
          width: 485px;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
          box-sizing: border-box;
        }

        /* Individual Question Item */
        .faq-q-item {
          width: 485px;
          height: 40px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 26px;
          line-height: 40px;
          color: #FFFEFE;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          padding-left: 8px;
          padding-right: 8px;
          border-radius: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-q-item.active {
          opacity: 1;
          transform: translateX(6px);
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
        }

        .faq-q-item:not(.active) {
          opacity: 0.72;
        }

        .faq-q-item:hover {
          opacity: 1;
          transform: translateX(4px);
        }

        /* Right Card - Answer (Frame 456) */
        .faq-card-right {
          width: 536px;
          height: 364px;
          background: #FFFEFE;
          border-radius: 16px;
          position: relative;
          box-sizing: border-box;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(15, 118, 110, 0.05);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .faq-card-right:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(15, 118, 110, 0.08);
        }

        /* Label "Answer" */
        .faq-label-answer {
          position: absolute;
          left: 30px;
          top: 30px;
          width: 60px;
          height: 30px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #0F776F;
          margin: 0;
        }

        /* Answer Content Group (Frame 458) */
        .faq-answer-group {
          position: absolute;
          left: 30px;
          top: 86px;
          width: 476px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .faq-answer-q-title {
          width: 476px;
          min-height: 38px;
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 27px;
          line-height: 36px;
          color: #0F776F;
          margin: 0;
        }

        .faq-answer-text {
          width: 476px;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          color: #0F776F;
          margin: 0;
        }

        /* Bottom Row In Right Card */
        .faq-cant-find {
          position: absolute;
          left: 30px;
          top: 299px;
          width: 260px;
          height: 26px;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          color: #0F776F;
          margin: 0;
          white-space: nowrap;
        }

        /* Book Now Button (Frame 126) */
        .faq-btn-book {
          position: absolute;
          left: 393px;
          top: 290px;
          width: 113px;
          height: 44px;
          border-radius: 9999px;
          background: #0F776F;
          color: #FFFEFE;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 26px;
          cursor: pointer;
          box-sizing: border-box;
          transition: background-color 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .faq-mobile-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 60px 18px 70px;
          box-sizing: border-box;
          background: #FAFBDC;
        }

        .faq-mobile-badge {
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
          color: #0F776F;
          margin-bottom: 16px;
        }

        .faq-mobile-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(32px, 8.5vw, 46px);
          line-height: 1.15;
          text-align: center;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0 0 28px 0;
          letter-spacing: -0.2px;
        }

        .faq-mobile-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 520px;
        }

        .faq-mobile-card-q {
          background: #0F776F;
          border-radius: 16px;
          padding: 24px 20px;
          box-sizing: border-box;
          color: #FFFEFE;
        }

        .faq-mobile-card-a {
          background: #FFFEFE;
          border-radius: 16px;
          padding: 24px 20px;
          box-sizing: border-box;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '708px',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: '#FAFBDC',
            overflow: 'hidden',
            fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
            boxSizing: 'border-box',
          }}
        >
          {/* Header Box (Frame 2147226796) */}
          <div className="faq-header-box" key={`faq-hdr-${animKey}`}>
            {/* Pill Badge (Frame 2147226743) */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="faq-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="faq-badge-text">FAQ</span>
              </motion.div>
            </div>

            {/* Heading (Frequently Asked Questions) */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="faq-heading-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Frequently Asked Questions
              </motion.h2>
            </div>
          </div>

          {/* Main Two Cards Row (Frame 459) */}
          <div className="faq-main-row">
            {/* Left Card - Questions (Frame 455) */}
            <motion.div
              className="faq-card-left"
              key={`faq-left-${animKey}`}
              initial={{ opacity: 0, y: 120 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="faq-label-questions">Questions</h3>

              <div className="faq-questions-list">
                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className={`faq-q-item ${selectedIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    <span>{faq.question}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Card - Answer (Frame 456) */}
            <motion.div
              className="faq-card-right"
              key={`faq-right-${animKey}`}
              initial={{ opacity: 0, y: 120 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="faq-label-answer">Answer</h3>

              <div className="faq-answer-group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 className="faq-answer-q-title">
                      {faqs[selectedIdx].question}
                    </h4>
                    <p className="faq-answer-text">
                      {faqs[selectedIdx].answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Support Callout */}
              <p className="faq-cant-find">Can't find what you're looking for?</p>

              {/* Book Now Button with Header-Style Rolling Text */}
              <motion.button
                className="faq-btn-book"
                style={{
                  backgroundColor: isBtnHovered ? '#14B9A7' : '#0F776F',
                  color: '#FFFEFE',
                  transform: isBtnHovered ? 'translateY(-2px)' : 'none',
                  boxShadow: isBtnHovered
                    ? '0 8px 22px rgba(20, 184, 166, 0.4)'
                    : '0 4px 14px rgba(15, 118, 110, 0.2)',
                }}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
              >
                <RollingText text="Book Now" isHovered={isBtnHovered} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (< 860px Responsive Fallback) ================= */}
      {isMobile && (
        <div className="faq-mobile-wrap" key={`faq-mob-${animKey}`}>
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              className="faq-mobile-badge"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              FAQ
            </motion.div>
          </div>

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.h2
              className="faq-mobile-heading"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="faq-mobile-stack">
            {/* Mobile Questions selector */}
            <div className="faq-mobile-card-q">
              <h3 style={{ margin: '0 0 14px', fontFamily: 'Instrument Serif', fontSize: '22px' }}>
                Questions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    onClick={() => setSelectedIdx(idx)}
                    style={{
                      fontFamily: 'Instrument Serif',
                      fontSize: '22px',
                      lineHeight: '30px',
                      cursor: 'pointer',
                      opacity: selectedIdx === idx ? 1 : 0.7,
                      fontWeight: selectedIdx === idx ? 600 : 400,
                      padding: '4px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {faq.question}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Answer Card */}
            <div className="faq-mobile-card-a">
              <h3 style={{ margin: 0, fontFamily: 'Instrument Serif', fontSize: '22px', color: '#0F776F' }}>
                Answer
              </h3>

              <div>
                <h4 style={{ margin: '0 0 8px', fontFamily: 'Instrument Serif', fontSize: '24px', color: '#0F776F' }}>
                  {faqs[selectedIdx].question}
                </h4>
                <p style={{ margin: 0, fontFamily: 'Inter Tight', fontSize: '15px', lineHeight: '24px', color: '#0F776F' }}>
                  {faqs[selectedIdx].answer}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(15, 118, 110, 0.15)' }}>
                <p style={{ margin: 0, fontFamily: 'Inter Tight', fontSize: '15px', color: '#0F776F' }}>
                  Can't find what you're looking for?
                </p>
                <button
                  style={{
                    height: '44px',
                    borderRadius: '9999px',
                    background: '#0F776F',
                    color: '#FFFEFE',
                    border: 'none',
                    fontFamily: 'Inter Tight',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    padding: '8px 24px',
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FAQ;
