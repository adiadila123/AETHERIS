/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ShowcaseModal } from './components/ShowcaseModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { InfoModal } from './components/InfoModal';
import { HeroVideoBackground } from './components/HeroVideoBackground';
import { ObservatoryModal } from './components/ObservatoryModal';
import { SynthesisLabModal } from './components/SynthesisLabModal';
import { EnvironmentConfig } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('works');
  const [isShowcaseOpen, setIsShowcaseOpen] = useState<boolean>(false);
  const [isObservatoryOpen, setIsObservatoryOpen] = useState<boolean>(false);
  const [isSynthesisOpen, setIsSynthesisOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Real-time atmospheric & acoustic state
  const [envConfig, setEnvConfig] = useState<EnvironmentConfig>({
    phase: 'twilight',
    bloom: 1.0,
    rippleIntensity: 1.0,
    stardustCount: 24,
    ringTilt: -25,
    audioDroneFreq: 432,
    isAudioOn: false,
  });

  // Handle subtle interactive mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'works') {
      setIsShowcaseOpen(true);
    } else if (tabId === 'observatory') {
      setIsObservatoryOpen(true);
    } else if (tabId === 'synthesis') {
      setIsSynthesisOpen(true);
    } else {
      setInfoModalType(tabId);
    }
  };

  const handleOpenShowcase = () => {
    setIsShowcaseOpen(true);
  };

  const handleToggleAudio = () => {
    setEnvConfig((prev) => ({
      ...prev,
      isAudioOn: !prev.isAudioOn,
    }));
  };

  return (
    <main
      id="aetheris-hero-app"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#070a0e] text-white select-none"
    >
      {/* Infinite Video Background Layer with Dynamic Atmospheric Shading */}
      <HeroVideoBackground
        mousePos={mousePos}
        config={envConfig}
        onOpenObservatory={() => setIsObservatoryOpen(true)}
        onToggleAudioState={handleToggleAudio}
      />

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />

      {/* Main Hero Content (Headline, Subtitle, CTA) */}
      <HeroContent onViewWork={handleOpenShowcase} />

      {/* Bottom-left SCROLL Indicator */}
      <ScrollIndicator onScrollClick={handleOpenShowcase} />

      {/* Interactive Modal: Works Archive Showcase */}
      <ShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        activeCategory={activeTab}
      />

      {/* Spectacular Modal 1: Celestial Observatory & Atmosphere Portal */}
      <ObservatoryModal
        isOpen={isObservatoryOpen}
        onClose={() => setIsObservatoryOpen(false)}
        config={envConfig}
        onChangeConfig={setEnvConfig}
        onToggleAudio={handleToggleAudio}
      />

      {/* Spectacular Modal 2: Speculative Worldbuilding & Architecture Forge */}
      <SynthesisLabModal
        isOpen={isSynthesisOpen}
        onClose={() => setIsSynthesisOpen(false)}
      />

      {/* Full-screen Studio Directory Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectTab={handleSelectTab}
      />

      {/* Dialog for Services, Stories */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </main>
  );
}
