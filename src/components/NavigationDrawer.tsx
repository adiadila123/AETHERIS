import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Compass, Sparkles, Mail, MapPin } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const menuItems = [
    { id: 'works', label: 'Works', sub: 'Curated visual worlds, architectural CGI & high-calibre spatial case studies' },
    { id: 'observatory', label: 'Observatory', sub: 'Real-time celestial physics, chromatic atmospheric phases & 432 Hz acoustic drone' },
    { id: 'synthesis', label: 'Synthesis Lab', sub: 'Speculative worldbuilding forge, monumental geometries & prompt architectural recipes' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="aetheris-nav-drawer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-[#070a0e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 overflow-y-auto"
        >
          {/* Top Bar inside drawer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#e8a36e] font-light flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                AETHERIS STUDIO DIRECTORY
              </span>
            </div>

            <button
              id="drawer-close-btn"
              onClick={onClose}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center navigation links */}
          <div className="py-12 my-auto max-w-4xl">
            <div className="flex flex-col gap-6 sm:gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                >
                  <button
                    id={`drawer-link-${item.id}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-6 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/70 group-hover:text-white transition-colors duration-300 tracking-tight flex items-center gap-3">
                      {item.label}
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#e8a36e]" />
                    </span>
                    <span className="text-xs sm:text-sm text-white/40 group-hover:text-white/70 transition-colors font-light tracking-wide">
                      {item.sub}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-xs text-white/50">
            <div>
              <span className="block uppercase tracking-[0.25em] text-[10px] text-white/40 mb-1">
                LOCATIONS
              </span>
              <p className="text-white/80 font-light flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e8a36e]" />
                Tokyo · London · Reykjavik
              </p>
            </div>

            <div>
              <span className="block uppercase tracking-[0.25em] text-[10px] text-white/40 mb-1">
                ENQUIRIES
              </span>
              <p className="text-white/80 font-light flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#e8a36e]" />
                commissions@aetheris.vision
              </p>
            </div>

            <div className="flex sm:justify-end items-end">
              <span className="text-[11px] tracking-widest text-white/30 uppercase">
                © 2026 AETHERIS. All rights reserved.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
