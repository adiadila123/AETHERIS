import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Compass,
  Radio,
  Volume2,
  VolumeX,
  Camera,
  RotateCcw,
  Check,
  Eye,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';
import { EnvironmentConfig, AtmospherePhase } from '../types';

interface ObservatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EnvironmentConfig;
  onChangeConfig: (newConfig: EnvironmentConfig) => void;
  onToggleAudio: () => void;
}

export const ObservatoryModal: React.FC<ObservatoryModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onToggleAudio,
}) => {
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [audioWaveform, setAudioWaveform] = useState<number[]>([12, 24, 18, 35, 45, 28, 60, 42, 30, 20]);

  // Animated telemetry waveform simulation
  useEffect(() => {
    if (!config.isAudioOn) return;
    const interval = setInterval(() => {
      setAudioWaveform((prev) =>
        prev.map(() => Math.floor(Math.random() * 50 + 15))
      );
    }, 150);
    return () => clearInterval(interval);
  }, [config.isAudioOn]);

  if (!isOpen) return null;

  const phases: Array<{
    id: AtmospherePhase;
    label: string;
    sub: string;
    time: string;
    color: string;
    temp: string;
    icon: any;
  }> = [
    {
      id: 'twilight',
      label: 'Twilight Ambre',
      sub: 'Amber Horizon & Indigo Sky',
      time: '20:45 UTC',
      color: '#e8a36e',
      temp: '3200 K',
      icon: Sun,
    },
    {
      id: 'eclipse',
      label: 'Annular Eclipse',
      sub: 'Corona Halo & Cosmic Void',
      time: '14:12 UTC',
      color: '#38bdf8',
      temp: '6500 K',
      icon: Moon,
    },
    {
      id: 'midnight',
      label: 'Midnight Aurora',
      sub: 'Aurora Ionosphere & Star Tide',
      time: '01:30 UTC',
      color: '#2dd4bf',
      temp: '9800 K',
      icon: Sparkles,
    },
    {
      id: 'dawn',
      label: 'Golden Dawn',
      sub: 'Radiant Crepuscular Ray Burst',
      time: '05:50 UTC',
      color: '#f59e0b',
      temp: '4800 K',
      icon: Zap,
    },
  ];

  const handlePhaseSelect = (phase: AtmospherePhase) => {
    let newBloom = config.bloom;
    let newRipple = config.rippleIntensity;
    let newStardust = config.stardustCount;
    let newFreq = config.audioDroneFreq;

    if (phase === 'twilight') {
      newBloom = 1.0;
      newRipple = 1.0;
      newStardust = 24;
      newFreq = 432;
    } else if (phase === 'eclipse') {
      newBloom = 1.5;
      newRipple = 0.6;
      newStardust = 40;
      newFreq = 108;
    } else if (phase === 'midnight') {
      newBloom = 0.9;
      newRipple = 1.3;
      newStardust = 52;
      newFreq = 528;
    } else if (phase === 'dawn') {
      newBloom = 1.8;
      newRipple = 1.1;
      newStardust = 30;
      newFreq = 396;
    }

    onChangeConfig({
      ...config,
      phase,
      bloom: newBloom,
      rippleIntensity: newRipple,
      stardustCount: newStardust,
      audioDroneFreq: newFreq,
    });
  };

  const handleReset = () => {
    onChangeConfig({
      phase: 'twilight',
      bloom: 1.0,
      rippleIntensity: 1.0,
      stardustCount: 24,
      ringTilt: -25,
      audioDroneFreq: 432,
      isAudioOn: config.isAudioOn,
    });
  };

  const handleCaptureSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  const currentPhaseData = phases.find((p) => p.id === config.phase) || phases[0];

  return (
    <AnimatePresence>
      <motion.div
        id="observatory-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a0e]/90 backdrop-blur-2xl p-3 sm:p-6 md:p-8 overflow-y-auto select-none"
      >
        <motion.div
          id="observatory-panel"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c1118] border border-white/15 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0c1118]/80 backdrop-blur-md gap-3">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#e8a36e] font-medium">
                <Compass className="w-3.5 h-3.5" />
                AETHERIS CELESTIAL OBSERVATORY & PORTAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-0.5">
                Atmospheric Simulation & Cosmic Physics
              </h2>
              <p className="text-xs text-white/50 font-light mt-0.5">
                Direct the real-time illumination, planetary ring inclination, water wave caustics, and acoustic resonance of the AETHERIS universe.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
              <button
                id="btn-observatory-reset"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Reset to default parameters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>

              <button
                id="btn-close-observatory"
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none"
                aria-label="Close observatory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-7 scrollbar-thin scrollbar-thumb-white/20">
            {/* Live Telemetry Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#121924] border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Temporal Phase</span>
                <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-0.5" style={{ color: currentPhaseData.color }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentPhaseData.color }} />
                  {currentPhaseData.label}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Coordinated Time</span>
                <span className="text-sm font-mono text-white/90 mt-0.5">{currentPhaseData.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Colour Temperature</span>
                <span className="text-sm font-mono text-white/90 mt-0.5">{currentPhaseData.temp}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Harmonic Resonance</span>
                <span className="text-sm font-mono text-[#e8a36e] mt-0.5">{config.audioDroneFreq} Hz</span>
              </div>
            </div>

            {/* Section 1: Choose Atmosphere & Sky Phase */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-[#e8a36e]" />
                  1. Choose Atmospheric Illumination & Sky Phase
                </h3>
                <span className="text-[11px] text-white/40 font-light">Instantaneously updates background</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {phases.map((phase) => {
                  const Icon = phase.icon;
                  const isSelected = config.phase === phase.id;
                  return (
                    <button
                      key={phase.id}
                      id={`btn-phase-${phase.id}`}
                      onClick={() => handlePhaseSelect(phase.id)}
                      className={`group p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 ${
                        isSelected
                          ? 'bg-[#182333] border-[#e8a36e] shadow-[0_0_20px_rgba(232,163,110,0.18)]'
                          : 'bg-[#111722] border-white/10 hover:border-white/30 hover:bg-[#141b27]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: isSelected ? `${phase.color}25` : 'rgba(255,255,255,0.05)',
                            color: phase.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase bg-[#e8a36e] text-[#070a0e]">
                            Active
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-white transition-colors">
                          {phase.label}
                        </div>
                        <div className="text-xs text-white/50 mt-0.5 font-light leading-tight">
                          {phase.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Celestial & Optical Sliders */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#e8a36e]" />
                2. Optical Calibration & Kinetic Dynamics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-[#111722]/80 border border-white/10">
                {/* Bloom & Volumetric Glow */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70 font-light flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#e8a36e]" />
                      Luminous Volume & Portal Bloom
                    </span>
                    <span className="font-mono text-[#e8a36e]">{config.bloom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.2"
                    step="0.1"
                    value={config.bloom}
                    onChange={(e) =>
                      onChangeConfig({ ...config, bloom: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8a36e]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Subtle / Discrete</span>
                    <span>Radiant / Intense</span>
                  </div>
                </div>

                {/* Water Ripple Dynamics */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70 font-light flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#e8a36e]" />
                      Water Wave Dynamics (Tidal Caustics)
                    </span>
                    <span className="font-mono text-[#e8a36e]">{config.rippleIntensity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.1"
                    value={config.rippleIntensity}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        rippleIntensity: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8a36e]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Glass Mirror</span>
                    <span>Agitated Swell</span>
                  </div>
                </div>

                {/* Stardust Cosmic Particles Density */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70 font-light flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#e8a36e]" />
                      Cosmic Stardust Density & Ethereal Mist
                    </span>
                    <span className="font-mono text-[#e8a36e]">{config.stardustCount} particles</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="65"
                    step="1"
                    value={config.stardustCount}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        stardustCount: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8a36e]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Minimal Purity</span>
                    <span>Dense Nebular Cloud</span>
                  </div>
                </div>

                {/* Planetary Ring Tilt */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70 font-light flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-[#e8a36e]" />
                      Planetary Ring Axial Inclination
                    </span>
                    <span className="font-mono text-[#e8a36e]">{config.ringTilt}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="15"
                    step="1"
                    value={config.ringTilt}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        ringTilt: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8a36e]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Descending Diagonal (-45°)</span>
                    <span>Equatorial Plane (+15°)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Soundscape Synthesiser & Frequencies */}
            <div className="p-5 rounded-xl bg-[#111722]/80 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-[#e8a36e]" />
                    3. Celestial Soundscape Synthesiser & 432 Hz Drone
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    Algorithmically synthesised soundscape powered by Web Audio oscillators in Pythagorean harmonic ratios.
                  </p>
                </div>

                <button
                  id="btn-observatory-audio-toggle"
                  onClick={onToggleAudio}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all cursor-pointer ${
                    config.isAudioOn
                      ? 'bg-[#e8a36e] text-[#070a0e] shadow-lg shadow-[#e8a36e]/25'
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {config.isAudioOn ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sound Active</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Initialise Soundscape</span>
                    </>
                  )}
                </button>
              </div>

              {/* Frequencies tuning buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { freq: 108, name: 'Cosmic Void Sub-Bass', note: '108 Hz' },
                  { freq: 396, name: 'Gravitational Liberation', note: '396 Hz' },
                  { freq: 432, name: 'Pythagorean Fundamental', note: '432 Hz' },
                  { freq: 528, name: 'Wandering Ice Crystals', note: '528 Hz' },
                ].map((item) => (
                  <button
                    key={item.freq}
                    onClick={() =>
                      onChangeConfig({ ...config, audioDroneFreq: item.freq })
                    }
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      config.audioDroneFreq === item.freq
                        ? 'bg-white/15 border-[#e8a36e] text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-[#e8a36e]">{item.note}</div>
                    <div className="text-xs font-light mt-0.5 leading-tight">{item.name}</div>
                  </button>
                ))}
              </div>

              {/* Live Simulated Waveform */}
              {config.isAudioOn && (
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Real-Time Waveform:</span>
                  <div className="flex items-end gap-1 h-6">
                    {audioWaveform.map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#e8a36e] rounded-full transition-all duration-150"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#e8a36e] ml-auto">Stable Sine Oscillator</span>
                </div>
              )}
            </div>

            {/* Action Buttons Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                id="btn-capture-snapshot"
                onClick={handleCaptureSnapshot}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
              >
                {snapshotTaken ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Telemetric Frame Recorded!</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 text-[#e8a36e]" />
                    <span>Record Telemetric Frame</span>
                  </>
                )}
              </button>

              <button
                id="btn-apply-and-view"
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-[#e8a36e] text-[#070a0e] text-xs uppercase tracking-widest font-semibold hover:bg-amber-300 transition-all cursor-pointer shadow-lg shadow-[#e8a36e]/20"
              >
                <Eye className="w-4 h-4" />
                <span>Apply & Experience Universe</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
