import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Wand2,
  Copy,
  Check,
  Compass,
  Cpu,
  RefreshCw,
  Maximize2,
  ArrowRight,
  Eye,
  Layers,
} from 'lucide-react';
import { SynthesisWorld } from '../types';

interface SynthesisLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_WORLDS: SynthesisWorld[] = [
  {
    id: 'world-chronos-prime',
    name: 'Chronos Prime: Gate of Eternal Cycles',
    monolith: 'Basaltic Cantilever Arch',
    celestial: 'Gas Giant with Ice-Crystal Rings',
    terrain: 'Salt Mirror Tidal Basin',
    optics: 'Panavision Anamorphic 35mm f/1.4',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    promptExcerpt: 'monumental cantilevered brutalist stone arch piercing mirrored twilight waters, colossal ringed planet rising on the horizon, lone contemplative human figure, ACEScg volumetric atmosphere, 8k cgi masterpiece',
    coordinates: 'EOS-482-α • Dec: -24°18’04"',
    gravity: '0.84 g (Earth-Calibrated)',
    lightSpectrum: 'Amber Twilight 3200K / Cosmic Void 6500K',
    year: '2026',
  },
  {
    id: 'world-aurora-torus',
    name: 'Midnight Torus Sanctuary',
    monolith: 'Black Obsidian Toroidal Portal',
    celestial: 'Supermoon with Emerald Ionospheric Aurora',
    terrain: 'Glacial Basin with Ice Refractions',
    optics: '65mm Large Format CinemaScope',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    promptExcerpt: 'colossal obsidian torus portal standing in frozen mirror fjord, emerald cosmic aurora borealis draping over twin ringed moons, atmospheric god-rays, hyperrealistic cinematic render',
    coordinates: 'AETHEL-990-β • Dec: +62°09’44"',
    gravity: '1.02 g',
    lightSpectrum: 'Teal Ionosphere 5200K / Spectral Aurora',
    year: '2026',
  },
  {
    id: 'world-solis-spire',
    name: 'The Solar Needle & Fire Wave',
    monolith: 'Slender Bifrost Spire with Titanium Chamfers',
    celestial: 'Binary Sunset with Dual Fire Stars',
    terrain: 'Volcanic Black Sand Shore with Luminescent Crests',
    optics: 'Kodak Vision3 500T 35mm Analog LUT',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    promptExcerpt: 'monumental needle spire reflecting twin crimson suns, ultra-fine dust scattering across volcanic black sand shores, hyper-detailed astronomical alignment, volumetric atmospheric fog',
    coordinates: 'SOLIS-117-γ • Dec: -02°33’19"',
    gravity: '0.91 g',
    lightSpectrum: 'Golden Radiation 2800K / Crimson Dusk',
    year: '2026',
  },
];

const MONOLITH_CHOICES = [
  { id: 'arc', name: 'Cantilever Basaltic Arch', desc: 'Colossal brutalist arch sculpted from meteoric stone' },
  { id: 'torus', name: 'Obsidian Torus Ring', desc: 'Gravitationally suspended toroidal gateway' },
  { id: 'spire', name: 'Celestial Bifrost Spire', desc: 'Slender monolith piercing atmospheric cloud layers' },
  { id: 'twin', name: 'Twin Horizon Sentinels', desc: 'Dual monolithic pillars reflected in calm deep water' },
];

const CELESTIAL_CHOICES = [
  { id: 'ringed', name: 'Ringed Gas Giant', desc: 'Fine orbital rings of pulverised ice and silicate dust' },
  { id: 'supermoon', name: 'Aurora Supermoon', desc: 'Colossal lunar disc bathed in emerald auroral curtains' },
  { id: 'binary', name: 'Dual Binary Sunset', desc: 'Twin stars descending along the oceanic horizon' },
  { id: 'nebula', name: 'Nebular Star Cluster', desc: 'Cosmic dust filaments and pulsating young stellar cores' },
];

const TERRAIN_CHOICES = [
  { id: 'mirror', name: 'Still Salt Flat Mirror', desc: 'Pristine glassy water with 100% optical horizon reflection' },
  { id: 'black_sand', name: 'Volcanic Basalt Shore', desc: 'Wet black sand with foaming low-tide swells' },
  { id: 'lagoon', name: 'Bioluminescent Lagoon', desc: 'Micro-algal photoluminescence responding to wave motion' },
];

export const SynthesisLabModal: React.FC<SynthesisLabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedMonolith, setSelectedMonolith] = useState(MONOLITH_CHOICES[0].name);
  const [selectedCelestial, setSelectedCelestial] = useState(CELESTIAL_CHOICES[0].name);
  const [selectedTerrain, setSelectedTerrain] = useState(TERRAIN_CHOICES[0].name);
  const [activeWorld, setActiveWorld] = useState<SynthesisWorld>(PRESET_WORLDS[0]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      // Pick or generate new world from presets
      const randomPreset = PRESET_WORLDS[Math.floor(Math.random() * PRESET_WORLDS.length)];
      const customWorld: SynthesisWorld = {
        id: `world-custom-${Date.now()}`,
        name: `Synthesis: ${selectedMonolith.split(' ')[0]} Over ${selectedCelestial.split(' ')[0]}`,
        monolith: selectedMonolith,
        celestial: selectedCelestial,
        terrain: selectedTerrain,
        optics: 'Panavision Ultra Prime 35mm ACEScg',
        image: randomPreset.image,
        promptExcerpt: `monumental ${selectedMonolith.toLowerCase()}, standing tall over ${selectedTerrain.toLowerCase()}, celestial ${selectedCelestial.toLowerCase()} looming in background, lone contemplative figure at the edge of the water, cinematic lighting, ultra-detailed 8k render, masterpiece`,
        coordinates: `EOS-${Math.floor(Math.random() * 800 + 100)}-${['α', 'β', 'γ', 'Ω'][Math.floor(Math.random() * 4)]} • Dec: ${Math.floor(Math.random() * 80 - 40)}°${Math.floor(Math.random() * 59)}'`,
        gravity: `${(Math.random() * 0.4 + 0.8).toFixed(2)} g`,
        lightSpectrum: 'Rayleigh-Mie Spectral Grading 3400K',
        year: '2026',
      };
      setActiveWorld(customWorld);
      setIsSynthesizing(false);
    }, 1200);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activeWorld.promptExcerpt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="synthesis-lab-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a0e]/92 backdrop-blur-2xl p-3 sm:p-6 md:p-8 overflow-y-auto select-none"
      >
        <motion.div
          id="synthesis-lab-panel"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c1118] border border-white/15 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0c1118]/80 backdrop-blur-md gap-3">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#e8a36e] font-medium">
                <Wand2 className="w-3.5 h-3.5" />
                AETHERIS SPECULATIVE SYNTHESIS FORGE
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-0.5">
                Worldbuilding & Architectural Synthesis Forge
              </h2>
              <p className="text-xs text-white/50 font-light mt-0.5">
                Harmonise monumental geometries, astronomical bodies, and cinematic optics to forge speculative spatial environments.
              </p>
            </div>

            <button
              id="btn-close-synthesis"
              onClick={onClose}
              className="self-end sm:self-center w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close synthesis forge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 scrollbar-thin scrollbar-thumb-white/20">
            {/* Split layout: Controls on left, Rendered World on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Generator Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Monolith Architecture */}
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8a36e] font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    1. Monolithic Architecture & Form
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MONOLITH_CHOICES.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedMonolith(item.name)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedMonolith === item.name
                            ? 'bg-[#192433] border-[#e8a36e] text-white'
                            : 'bg-[#111722] border-white/10 hover:border-white/25 text-white/70 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-medium text-white">{item.name}</div>
                        <div className="text-[10px] text-white/50 mt-0.5 leading-tight">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Celestial Body */}
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8a36e] font-medium flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    2. Celestial Body & Alignment
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CELESTIAL_CHOICES.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCelestial(item.name)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedCelestial === item.name
                            ? 'bg-[#192433] border-[#e8a36e] text-white'
                            : 'bg-[#111722] border-white/10 hover:border-white/25 text-white/70 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-medium text-white">{item.name}</div>
                        <div className="text-[10px] text-white/50 mt-0.5 leading-tight">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Aquatic Terrain */}
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8a36e] font-medium flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    3. Terrestrial Horizon & Aquatic Basin
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {TERRAIN_CHOICES.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedTerrain(item.name)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          selectedTerrain === item.name
                            ? 'bg-[#192433] border-[#e8a36e] text-white'
                            : 'bg-[#111722] border-white/10 hover:border-white/25 text-white/70 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-medium text-white">{item.name}</div>
                          <div className="text-[10px] text-white/50 mt-0.5">{item.desc}</div>
                        </div>
                        {selectedTerrain === item.name && (
                          <Check className="w-4 h-4 text-[#e8a36e] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Forge Button */}
                <button
                  id="btn-forge-world"
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e8a36e] via-[#f7c59f] to-[#e8a36e] text-[#070a0e] text-xs font-semibold uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-[#e8a36e]/20 disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Computing Voxels & Atmospheric Gradients...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Synthesise Speculative World</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Generated World Card & Telemetry (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#111722] shadow-2xl group">
                  {/* Artwork Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={activeWorld.image}
                      alt={activeWorld.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isSynthesizing ? 'filter blur-md scale-105 opacity-60' : 'filter brightness-95 group-hover:scale-[1.02]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent opacity-90" />

                    {/* Coordinates Chip */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/15 text-[10px] font-mono text-[#e8a36e] tracking-wider">
                      {activeWorld.coordinates}
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      id="btn-synthesis-fullscreen"
                      onClick={() => setFullscreenImage(activeWorld.image)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                      title="View at maximum resolution"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* World Telemetry & Details */}
                  <div className="p-6 space-y-5">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#e8a36e]">
                        <Sparkles className="w-3 h-3" />
                        ACESCG SYNTHESIS RESULT
                      </div>
                      <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1">
                        {activeWorld.name}
                      </h3>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40">Local Gravity</span>
                        <span className="font-mono text-white/90">{activeWorld.gravity}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40">Light Spectrum</span>
                        <span className="font-mono text-white/90">{activeWorld.lightSpectrum.split('/')[0]}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40">Lens Optics</span>
                        <span className="font-mono text-[#e8a36e]">{activeWorld.optics.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Prompt Architecture Block */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
                          Prompt Architecture & Visual Blueprint
                        </span>
                        <button
                          onClick={handleCopyPrompt}
                          className="flex items-center gap-1 text-[11px] text-[#e8a36e] hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedPrompt ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Blueprint</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/75 font-mono leading-relaxed select-text">
                        "{activeWorld.promptExcerpt}"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preset Worlds Carousel */}
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">
                    Recent Worlds from Synthesis Archive
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_WORLDS.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => setActiveWorld(w)}
                        className={`group p-2 rounded-xl border overflow-hidden cursor-pointer transition-all ${
                          activeWorld.id === w.id
                            ? 'bg-[#182333] border-[#e8a36e]'
                            : 'bg-[#111722] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                          <img
                            src={w.image}
                            alt={w.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="text-[10px] font-medium text-white/80 truncate mt-1.5 group-hover:text-[#e8a36e] transition-colors">
                          {w.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox */}
        {fullscreenImage && (
          <div
            id="synthesis-lightbox"
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={fullscreenImage}
              alt="Full view"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/20"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
