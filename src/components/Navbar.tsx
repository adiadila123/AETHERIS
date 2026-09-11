import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenMenu,
  isMenuOpen,
}) => {
  const navItems = [
    { id: 'works', label: 'WORKS' },
    { id: 'observatory', label: 'OBSERVATORY' },
    { id: 'synthesis', label: 'SYNTHESIS' },
  ];

  return (
    <header
      id="aetheris-navbar"
      className="fixed top-0 left-0 right-0 z-40 w-full px-6 sm:px-12 md:px-16 lg:px-20 py-7 md:py-9 flex items-center justify-between pointer-events-auto transition-all duration-500"
    >
      {/* Brand / Logo */}
      <a
        id="aetheris-brand-logo"
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('works');
        }}
        className="flex items-center gap-3.5 sm:gap-4 group cursor-pointer"
      >
        {/* Spectacular AETHERIS Celestial Arch & Singularity Emblem */}
        <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10">
          {/* Ambient Ethereal Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e8a36e]/30 via-[#38bdf8]/15 to-transparent blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
          >
            <defs>
              {/* Singularity Warm Gold Gradient */}
              <linearGradient id="aethSingularity" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="75%" stopColor="#e8a36e" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Brutalist Archway Monolith Gradient */}
              <linearGradient id="aethArch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              {/* Inclined Planetary Orbital Ring Gradient */}
              <linearGradient id="aethRing" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e8a36e" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
              </linearGradient>

              {/* Core Glow Filter */}
              <filter id="aethGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Zenith & Nadir Astronomical Alignment Crosshair */}
            <line x1="20" y1="2" x2="20" y2="4.5" stroke="#e8a36e" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
            <line x1="20" y1="36" x2="20" y2="38.5" stroke="#e8a36e" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
            <line x1="2.5" y1="20" x2="5" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
            <line x1="35" y1="20" x2="37.5" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />

            {/* Ground Basin Water Baseline & Mirror Shimmer */}
            <line x1="7" y1="33" x2="33" y2="33" stroke="white" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round" />
            <line x1="14" y1="35.5" x2="26" y2="35.5" stroke="#e8a36e" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />

            {/* Outer Brutalist Monolithic Arch Portal */}
            <path
              d="M 12 33 L 12 16.5 C 12 11 15.5 7 20 7 C 24.5 7 28 11 28 16.5 L 28 33"
              stroke="url(#aethArch)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Cantilevered Brutalist Slab Brow */}
            <line x1="8.5" y1="14" x2="31.5" y2="14" stroke="url(#aethArch)" strokeWidth="1.6" strokeLinecap="round" />

            {/* Inner Portal Void Chamber Line */}
            <path
              d="M 15.5 33 L 15.5 18 C 15.5 15 17.5 13 20 13 C 22.5 13 24.5 15 24.5 18 L 24.5 33"
              stroke="white"
              strokeWidth="0.9"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* Inclined Planetary Orbital Ring (Slicing through Portal) */}
            <ellipse
              cx="20"
              cy="20"
              rx="16.5"
              ry="6.2"
              transform="rotate(-26 20 20)"
              stroke="url(#aethRing)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="34 2 22 2"
            />

            {/* Secondary Faint Resonance Orbital Halo */}
            <ellipse
              cx="20"
              cy="20"
              rx="18.8"
              ry="7.4"
              transform="rotate(-26 20 20)"
              stroke="#e8a36e"
              strokeWidth="0.75"
              strokeOpacity="0.3"
              strokeDasharray="2 4"
            />

            {/* Singularity Corona Halo */}
            <circle
              cx="20"
              cy="20"
              r="4.8"
              stroke="#e8a36e"
              strokeWidth="0.8"
              strokeOpacity="0.55"
              strokeDasharray="2 2"
              className="group-hover:rotate-45 transition-transform duration-700"
              style={{ transformOrigin: '20px 20px' }}
            />

            {/* Radiant Celestial Singularity Core */}
            <circle
              cx="20"
              cy="20"
              r="2.8"
              fill="url(#aethSingularity)"
              filter="url(#aethGlow)"
            />

            {/* Starlight Diffraction Spikes */}
            <line x1="20" y1="15.5" x2="20" y2="17" stroke="#fffbeb" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="20" y1="23" x2="20" y2="24.5" stroke="#fffbeb" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="15.5" y1="20" x2="17" y2="20" stroke="#fffbeb" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="23" y1="20" x2="24.5" y2="20" stroke="#fffbeb" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Name & Architectural Atelier Typography */}
        <div className="flex flex-col select-none">
          <span className="text-[17px] md:text-[20px] tracking-[0.42em] font-light text-white uppercase transition-opacity duration-300 group-hover:opacity-90 leading-tight">
            AETHERIS
          </span>
          <span className="text-[7.5px] md:text-[8px] tracking-[0.32em] text-[#e8a36e]/75 uppercase font-normal -mt-0.5 hidden sm:block">
            Architectural Cinema
          </span>
        </div>
      </a>

      {/* Navigation Links + Menu */}
      <div className="flex items-center gap-8 md:gap-12 lg:gap-14">
        <nav id="aetheris-nav-links" className="hidden sm:flex items-center gap-7 md:gap-9 lg:gap-11">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className="relative flex flex-col items-center group py-1 cursor-pointer focus:outline-none"
              >
                <span
                  className={`text-[11px] md:text-[12px] font-normal tracking-[0.24em] transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

                {/* Subtle active dot underneath, matching the image under WORKS */}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-dot"
                    className="w-1.5 h-1.5 rounded-full bg-white/95 mt-1.5 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent mt-1.5 opacity-0 group-hover:opacity-40 group-hover:bg-white transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Hamburger Menu Toggle (2 lines exactly as in image) */}
        <button
          id="aetheris-menu-toggle-btn"
          onClick={onOpenMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="flex flex-col justify-center items-end gap-[5px] w-9 h-9 p-1 group cursor-pointer focus:outline-none"
        >
          <motion.span
            animate={
              isMenuOpen
                ? { rotate: 45, y: 3.5, width: 20 }
                : { rotate: 0, y: 0, width: 22 }
            }
            transition={{ duration: 0.25 }}
            className="h-[1.5px] bg-white rounded-full transition-colors"
          />
          <motion.span
            animate={
              isMenuOpen
                ? { rotate: -45, y: -3.5, width: 20 }
                : { rotate: 0, y: 0, width: 16 }
            }
            transition={{ duration: 0.25 }}
            className="h-[1.5px] bg-white rounded-full group-hover:w-[22px] transition-all"
          />
        </button>
      </div>
    </header>
  );
};
