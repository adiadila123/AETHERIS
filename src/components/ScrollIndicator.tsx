import React from 'react';
import { motion } from 'motion/react';

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollClick }) => {
  return (
    <motion.div
      id="aetheris-scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      onClick={onScrollClick}
      className="fixed bottom-8 sm:bottom-10 md:bottom-12 left-6 sm:left-12 md:left-16 lg:left-20 z-30 flex flex-col items-start cursor-pointer select-none group"
    >
      {/* SCROLL Label */}
      <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-medium text-white/45 group-hover:text-white/80 transition-colors duration-300 mb-2.5">
        SCROLL
      </span>

      {/* Vertical Indicator Stem + Glowing Gold Dot */}
      <div className="relative w-[1px] h-11 sm:h-13 bg-white/20 overflow-visible flex flex-col justify-end items-center">
        {/* Animated downward subtle scan beam */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-white/70 to-amber-300 animate-scroll-bar" />

        {/* Glowing Golden / Amber Dot at the very bottom, exactly as in the image */}
        <div
          id="scroll-glow-point"
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#f6ad55] animate-glow-dot transition-transform duration-300 group-hover:scale-125"
        />
      </div>
    </motion.div>
  );
};
