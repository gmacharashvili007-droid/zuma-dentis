import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export const BeforeAfter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  // Slider position in percentage (0 to 100). Default 50%
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

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

  // Calculate slider percentage from clientX
  const updatePosition = useCallback((clientX: number, target: HTMLDivElement | null) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  // Start dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, isMob: boolean) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    const target = isMob ? mobileCardRef.current : desktopCardRef.current;
    updatePosition(e.clientX, target);
  };

  // Global pointer move and up handlers so dragging is seamless even if cursor moves outside
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const target = isMobile ? mobileCardRef.current : desktopCardRef.current;
      updatePosition(e.clientX, target);
    };

    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [isMobile, updatePosition]);

  return (
    <section
      ref={sectionRef}
      id="before-after"
      style={{
        width: '100%',
        height: isMobile ? 'auto' : `${1180 * scale}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F0FDFA',
        boxSizing: 'border-box',
        order: 6,
        flex: 'none',
        flexGrow: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');

        /* ================= DESKTOP STYLES (Fixed 1600px Canvas) ================= */

        /* Top Header Frame (Frame 2147226796) */
        .ba-header-box {
          position: absolute;
          width: 631px;
          height: 144px;
          left: calc(50% - 631px/2 + 0.5px);
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
        .ba-badge-pill {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          width: 125px;
          height: 44px;
          border: 1px solid #0F776F;
          border-radius: 9999px;
          background: transparent;
          cursor: default;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ba-badge-pill:hover {
          background-color: rgba(15, 118, 110, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
        }

        .ba-badge-text {
          width: 83px;
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

        /* Heading (Smiles We’ve Transformed) */
        .ba-heading-text {
          width: 631px;
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

        /* Comparison Card (Frame 2147226833) */
        .ba-showcase-card {
          position: absolute;
          width: 1380.34px;
          height: 756px;
          left: calc(50% - 1380.34px/2);
          top: 264px;
          background: #FFFEFE;
          border-radius: 42.4719px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(15, 118, 110, 0.14), 0 0 0 1px rgba(15, 118, 110, 0.08);
          touch-action: none;
          user-select: none;
          cursor: ew-resize;
        }

        /* Teeth Comparison Images */
        .ba-img-base {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
          object-position: center;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .ba-img-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
          object-position: center;
          display: block;
          user-select: none;
          pointer-events: none;
          will-change: clip-path;
        }

        /* Draggable Divider Line */
        .ba-divider-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #FFFEFE;
          box-shadow: 0 0 12px rgba(0, 34, 31, 0.5), 0 0 4px rgba(255, 255, 255, 0.8);
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 20;
          will-change: left;
        }

        /* Draggable Center Arrow Handle */
        .ba-slider-handle {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #FFFEFE;
          border: 2.5px solid #0F776F;
          box-shadow: 0 8px 30px rgba(0, 34, 31, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: ew-resize;
          z-index: 25;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
          user-select: none;
          will-change: left, transform;
        }

        .ba-slider-handle:hover,
        .ba-slider-handle.ba-dragging {
          transform: translate(-50%, -50%) scale(1.12);
          box-shadow: 0 12px 35px rgba(0, 34, 31, 0.4), 0 0 0 6px rgba(15, 118, 110, 0.25);
        }

        /* Floating Luxury Status Badges */
        .ba-tag-pill {
          position: absolute;
          top: 28px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 24px rgba(0, 34, 31, 0.12);
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          z-index: 15;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }

        .ba-tag-before {
          left: 32px;
          color: #92410F;
        }
        .ba-tag-before .ba-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D97607;
          box-shadow: 0 0 8px rgba(217, 119, 6, 0.6);
        }

        .ba-tag-after {
          right: 32px;
          color: #0F776F;
        }
        .ba-tag-after .ba-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0F776F;
          box-shadow: 0 0 8px rgba(15, 118, 110, 0.6);
        }

        /* Bottom Floating Guidance Pill */
        .ba-drag-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 9999px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: rgba(15, 118, 110, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 25px rgba(15, 118, 110, 0.3);
          color: #FFFEFE;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          z-index: 15;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.3s ease;
        }

        /* ================= MOBILE STYLES (< 860px) ================= */
        .ba-mobile-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 60px 20px 80px;
          box-sizing: border-box;
        }

        .ba-mobile-badge {
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

        .ba-mobile-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(34px, 8.5vw, 48px);
          line-height: 1.15;
          text-align: center;
          text-transform: uppercase;
          color: #0F776F;
          margin: 0 0 28px 0;
          letter-spacing: -0.2px;
        }

        .ba-mobile-card {
          width: 100%;
          max-width: 620px;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #FFFEFE;
          box-shadow: 0 16px 40px -10px rgba(15, 118, 110, 0.16), 0 0 0 1px rgba(15, 118, 110, 0.08);
          aspect-ratio: 1380 / 756;
          touch-action: none;
          user-select: none;
          cursor: ew-resize;
        }

        .ba-mobile-tag {
          position: absolute;
          top: 14px;
          padding: 5px 12px;
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.6);
          font-family: 'Inter Tight', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          z-index: 15;
          pointer-events: none;
        }

        .ba-mobile-tag-before {
          left: 14px;
          color: #92410F;
        }

        .ba-mobile-tag-after {
          right: 14px;
          color: #0F776F;
        }

        .ba-mobile-handle {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFEFE;
          border: 2px solid #0F776F;
          box-shadow: 0 6px 20px rgba(0, 34, 31, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 25;
          pointer-events: none;
        }

        .ba-mobile-hint {
          margin-top: 14px;
          font-family: 'Inter Tight', sans-serif;
          font-size: 13px;
          color: #0F776F;
          font-weight: 500;
          letter-spacing: 0.3px;
          text-align: center;
        }

        /* Bottom Statement Text */
        .ba-footer-text-wrap {
          position: absolute;
          width: 860px;
          left: calc(50% - 860px / 2);
          top: 1045px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
          z-index: 5;
        }

        .ba-footer-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 34px;
          line-height: 46px;
          text-align: center;
          color: #0F776F;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .ba-mobile-footer-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(22px, 5.8vw, 28px);
          line-height: 1.35;
          text-align: center;
          color: #0F776F;
          margin: 22px 0 0;
          max-width: 520px;
        }
      `}</style>

      {/* ================= DESKTOP VIEW (Fixed 1600px Canvas + Dynamic Zoom Scale) ================= */}
      {!isMobile && (
        <div
          style={{
            width: '1600px',
            height: '1180px',
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
          <div className="ba-header-box" key={`ba-hdr-${animKey}`}>
            {/* Pill Badge (Frame 2147226743) */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="ba-badge-pill"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="ba-badge-text">Real Results</span>
              </motion.div>
            </div>

            {/* Smiles We’ve Transformed */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.h2
                className="ba-heading-text"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Smiles We’ve Transformed
              </motion.h2>
            </div>
          </div>

          {/* Interactive Drag Comparison Card (Frame 2147226833) */}
          <motion.div
            ref={desktopCardRef}
            className="ba-showcase-card"
            key={`ba-card-${animKey}`}
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 35, scale: 0.97 }
            }
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onPointerDown={(e) => handlePointerDown(e, false)}
          >
            {/* Base Image Layer: AFTER Whitening */}
            <img
              src="https://cdn.jiro.build/Dentis/Image/after.png"
              alt="After Dental Whitening"
              className="ba-img-base"
            />

            {/* Clipped Top Layer: BEFORE Whitening (Revealed from Left to Slider Position) */}
            <img
              src="https://cdn.jiro.build/Dentis/Image/before.png"
              alt="Before Dental Whitening"
              className="ba-img-overlay"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            />

            {/* Draggable Divider Line */}
            <div
              className="ba-divider-line"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Draggable Arrow Handle */}
            <div
              className={`ba-slider-handle ${isDragging ? 'ba-dragging' : ''}`}
              style={{ left: `${sliderPos}%` }}
              aria-label="Drag to compare before and after whitening"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F776F"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="8 7 3 12 8 17" />
                <polyline points="16 7 21 12 16 17" />
                <line x1="12" y1="5" x2="12" y2="19" stroke="#0F776F" strokeWidth="1.6" opacity="0.4" />
              </svg>
            </div>

            {/* Status Pills */}
            <div
              className="ba-tag-pill ba-tag-before"
              style={{ opacity: sliderPos < 12 ? 0 : 1 }}
            >
              <span className="ba-dot" />
              <span>Before</span>
            </div>

            <div
              className="ba-tag-pill ba-tag-after"
              style={{ opacity: sliderPos > 88 ? 0 : 1 }}
            >
              <span className="ba-dot" />
              <span>After</span>
            </div>

            {/* Floating Guidance Pill */}
            <div
              className="ba-drag-hint"
              style={{ opacity: isDragging ? 0.3 : 0.95 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Drag handle to compare Before &amp; After</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.div>

          {/* Bottom Statement Text Matching User Screenshot */}
          <div className="ba-footer-text-wrap" key={`ba-foot-text-${animKey}`}>
            <motion.p
              className="ba-footer-text"
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              See the difference gentle, expert care can make. Every<br />
              result below is from a real patient at our clinic.
            </motion.p>
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (< 860px Responsive Fallback) ================= */}
      {isMobile && (
        <div className="ba-mobile-wrap">
          <div className="ba-mobile-badge">Real Results</div>
          <h2 className="ba-mobile-heading">Smiles We’ve Transformed</h2>

          <div
            ref={mobileCardRef}
            className="ba-mobile-card"
            onPointerDown={(e) => handlePointerDown(e, true)}
          >
            {/* Base Image Layer: AFTER Whitening */}
            <img
              src="https://cdn.jiro.build/Dentis/Image/after.png"
              alt="After Dental Whitening"
              className="ba-img-base"
            />

            {/* Clipped Top Layer: BEFORE Whitening */}
            <img
              src="https://cdn.jiro.build/Dentis/Image/before.png"
              alt="Before Dental Whitening"
              className="ba-img-overlay"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            />

            {/* Draggable Divider Line */}
            <div
              className="ba-divider-line"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Draggable Handle */}
            <div
              className="ba-mobile-handle"
              style={{ left: `${sliderPos}%` }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F776F"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="8 7 3 12 8 17" />
                <polyline points="16 7 21 12 16 17" />
              </svg>
            </div>

            <div
              className="ba-mobile-tag ba-mobile-tag-before"
              style={{ opacity: sliderPos < 15 ? 0 : 1 }}
            >
              Before
            </div>
            <div
              className="ba-mobile-tag ba-mobile-tag-after"
              style={{ opacity: sliderPos > 85 ? 0 : 1 }}
            >
              After
            </div>
          </div>

          <div className="ba-mobile-hint">
            ◂ Drag handle to compare Before &amp; After ▸
          </div>

          {/* Mobile Bottom Statement Text */}
          <motion.p
            className="ba-mobile-footer-text"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            See the difference gentle, expert care can make. Every<br />
            result below is from a real patient at our clinic.
          </motion.p>
        </div>
      )}
    </section>
  );
};

export default BeforeAfter;
