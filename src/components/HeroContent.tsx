import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  onViewWork: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onViewWork }) => {
  return (
    <div
      id="aetheris-hero-content"
      className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-12 md:px-16 lg:px-20 max-w-4xl pt-24 pb-28 md:py-0 pointer-events-none select-none"
    >
      <div className="pointer-events-auto">
        {/* Main Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[92px] font-[300] tracking-[-0.035em] leading-[1.05] text-[#f7f6f2]"
        >
          <span className="block">Imagining</span>
          <span className="block text-[#ebe9e1]">beyond reality.</span>
        </motion.h1>

        {/* Minimal Horizontal Divider */}
        <motion.div
          id="hero-divider-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="w-11 sm:w-12 h-[1.5px] bg-white/45 my-6 sm:my-7 md:my-8"
        />

        {/* Description / Subtext */}
        <motion.p
          id="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] sm:text-[14px] md:text-[15px] font-light leading-[1.7] text-[#c2c7cf] max-w-[360px] sm:max-w-[420px] tracking-[0.015em]"
        >
          AETHERIS explores the boundary between imagination and reality, turning
          the impossible into visuals.
        </motion.p>

        {/* Interactive CTA: ( → ) VIEW OUR WORK */}
        <motion.div
          id="hero-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <button
            id="btn-view-our-work"
            onClick={onViewWork}
            className="group flex items-center gap-4 cursor-pointer focus:outline-none"
          >
            {/* Outlined Circular Arrow */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/45 flex items-center justify-center transition-all duration-400 group-hover:border-white group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <ArrowRight
                strokeWidth={1.25}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white/90 group-hover:text-[#0b0f14] transition-all duration-300 transform group-hover:translate-x-0.5"
              />
            </div>

            {/* CTA Label */}
            <span className="text-[11px] sm:text-[12px] md:text-[12.5px] uppercase tracking-[0.26em] font-medium text-white/80 group-hover:text-white transition-colors duration-300">
              VIEW OUR WORK
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
