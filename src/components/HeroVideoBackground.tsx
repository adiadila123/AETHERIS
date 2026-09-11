import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Compass } from 'lucide-react';
import heroPosterImage from '../assets/images/eosai_hero_bg_1789145920415.jpg';
import { EnvironmentConfig } from '../types';

interface HeroVideoBackgroundProps {
  mousePos: { x: number; y: number };
  config?: EnvironmentConfig;
  onOpenObservatory?: () => void;
  onToggleAudioState?: () => void;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  mousePos,
  config,
  onOpenObservatory,
  onToggleAudioState,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  // Attempt autoplay immediately with robust fallback handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case of browser autoplay policy restrictions, add one-time listener
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
          };
          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
      }
    }
  }, []);

  // Web Audio ethereal cosmic ambient sound generator (completely self-contained, no external mp3 needed)
  const toggleAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Base low celestial drone (harmonic base)
        const baseFreq = (config?.audioDroneFreq || 432) / 8;
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc1Ref.current = osc1;

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);
        osc2Ref.current = osc2;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, ctx.currentTime);

        const droneGain = ctx.createGain();
        droneGain.gain.setValueAtTime(0.6, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(masterGain);

        osc1.start();
        osc2.start();

        setIsAudioActive(true);
        if (onToggleAudioState && !config?.isAudioOn) {
          onToggleAudioState();
        }
      } catch (err) {
        console.warn('AudioContext initialization note:', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          osc1Ref.current = null;
          osc2Ref.current = null;
          setIsAudioActive(false);
          if (onToggleAudioState && config?.isAudioOn) {
            onToggleAudioState();
          }
        }, 800);
      } else {
        setIsAudioActive(false);
        if (onToggleAudioState && config?.isAudioOn) {
          onToggleAudioState();
        }
      }
    }
  };

  // Sync external audio request from config
  useEffect(() => {
    if (config?.isAudioOn !== undefined && config.isAudioOn !== isAudioActive) {
      toggleAudio();
    }
  }, [config?.isAudioOn]);

  // Dynamically update oscillator frequencies
  useEffect(() => {
    if (audioCtxRef.current && osc1Ref.current && osc2Ref.current && config?.audioDroneFreq) {
      const base = config.audioDroneFreq / 8;
      osc1Ref.current.frequency.setTargetAtTime(base, audioCtxRef.current.currentTime, 0.2);
      osc2Ref.current.frequency.setTargetAtTime(base * 2, audioCtxRef.current.currentTime, 0.2);
    }
  }, [config?.audioDroneFreq]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Canvas dynamic fluid ripples and floating cosmic stardust over the video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stardust floating particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: Math.random() * 0.01 + 0.005,
      isGold: Math.random() > 0.55,
    }));

    // Interactive water ripples
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }> = [];

    const handlePointerMove = (e: MouseEvent) => {
      const waterHorizon = height * 0.52;
      if (e.clientY > waterHorizon && Math.random() > 0.65) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.random() * 45 + 30,
          alpha: 0.35,
          speed: Math.random() * 0.6 + 0.4,
        });
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      const waterHorizon = height * 0.54;

      // 1. Volumetric light radiating through the monumental arch portal
      const archX = width * 0.51;
      const archY = height * 0.44;
      const glowMultiplier = config?.bloom ?? 1.0;
      const glowRadius = Math.min(width, height) * (0.28 * glowMultiplier);
      const archGlow = ctx.createRadialGradient(archX, archY, 5, archX, archY, glowRadius);
      const glowPulse = (0.038 + Math.sin(t * 0.8) * 0.018) * glowMultiplier;

      const [rG, gG, bG] =
        config?.phase === 'eclipse'
          ? [56, 189, 248]
          : config?.phase === 'midnight'
          ? [45, 212, 191]
          : config?.phase === 'dawn'
          ? [251, 191, 36]
          : [240, 150, 60];

      archGlow.addColorStop(0, `rgba(${Math.min(255, rG + 40)}, ${Math.min(255, gG + 40)}, ${Math.min(255, bG + 40)}, ${glowPulse * 1.5})`);
      archGlow.addColorStop(0.4, `rgba(${rG}, ${gG}, ${bG}, ${glowPulse})`);
      archGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = archGlow;
      ctx.beginPath();
      ctx.arc(archX, archY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Traveling specular glint across the celestial planetary ring
      const ringProgress = (t * 0.12) % 1;
      const ringStartX = width * 0.38;
      const ringStartY = height * 0.22;
      const ringEndX = width * 0.68;
      const ringEndY = height * 0.50;
      const glintX = ringStartX + (ringEndX - ringStartX) * ringProgress;
      const glintY = ringStartY + (ringEndY - ringStartY) * ringProgress;
      const glintGrad = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, 20);
      glintGrad.addColorStop(0, 'rgba(255, 250, 230, 0.45)');
      glintGrad.addColorStop(0.5, 'rgba(246, 173, 85, 0.18)');
      glintGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glintGrad;
      ctx.beginPath();
      ctx.arc(glintX, glintY, 20, 0, Math.PI * 2);
      ctx.fill();

      // 2. Subtle horizontal water light shimmers across the mirrored water surface
      const gradient = ctx.createLinearGradient(0, waterHorizon, 0, height);
      gradient.addColorStop(0, 'rgba(246, 173, 85, 0)');
      gradient.addColorStop(0.25, `rgba(246, 173, 85, ${0.025 + Math.sin(t) * 0.01})`);
      gradient.addColorStop(0.6, `rgba(214, 188, 150, ${0.018 + Math.cos(t * 0.8) * 0.008})`);
      gradient.addColorStop(1, 'rgba(7, 10, 14, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, waterHorizon, width, height - waterHorizon);

      // Micro undulating water ripple bands in the reflection
      ctx.save();
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const yOffset = waterHorizon + 40 + i * 55;
        if (yOffset > height - 30) break;
        const waveProgress = Math.sin(t * 1.2 + i * 1.4);
        const waveAlpha = (0.04 + waveProgress * 0.02) * (1 - i / 6);

        ctx.strokeStyle = `rgba(255, 235, 200, ${waveAlpha})`;
        ctx.beginPath();
        const startX = width * 0.35 - i * 30;
        const endX = width * 0.75 + i * 30;
        ctx.moveTo(startX, yOffset + Math.sin(t + i) * 2);
        ctx.bezierCurveTo(
          startX + (endX - startX) * 0.3,
          yOffset - 3 + Math.sin(t * 1.5 + i) * 2,
          startX + (endX - startX) * 0.7,
          yOffset + 3 + Math.cos(t * 1.5 + i) * 2,
          endX,
          yOffset + Math.sin(t + i) * 2
        );
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render user / ambient water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.97;

        if (r.alpha < 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        // Flattened ellipse for realistic water perspective
        ctx.ellipse(r.x, r.y, r.radius * 2.4, r.radius * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 240, 210, ${r.alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render floating ethereal celestial particles (stardust)
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isGold) {
          ctx.fillStyle = `rgba(246, 173, 85, ${p.alpha * 0.75})`;
          ctx.shadowColor = 'rgba(246, 173, 85, 0.6)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(230, 240, 255, ${p.alpha * 0.65})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <div
      id="hero-background-container"
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
    >
      {/* Native High-Definition Looping Video */}
      <video
        ref={videoRef}
        id="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={heroPosterImage}
        style={{
          transform: `scale(1.04) translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        className={`w-full h-full object-cover object-center transition-all duration-700 ${
          config?.phase === 'eclipse'
            ? 'filter brightness-[0.78] contrast-[1.28] hue-rotate-[190deg] saturate-[0.85]'
            : config?.phase === 'midnight'
            ? 'filter brightness-[0.84] contrast-[1.18] hue-rotate-[145deg] saturate-[1.35]'
            : config?.phase === 'dawn'
            ? 'filter brightness-[1.12] contrast-[1.06] hue-rotate-[22deg] saturate-[1.25]'
            : 'filter brightness-[0.98] contrast-[1.03] hue-rotate-[0deg]'
        }`}
      >
        <source src="/assets/videos/eosai_hero_loop.mp4?v=2" type="video/mp4" />
        {/* Fallback image if video cannot play */}
        <img
          src={heroPosterImage}
          alt="AETHERIS monumental surreal archway and celestial planetary twilight landscape"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Dynamic Canvas Layer (Water reflections & cosmic particle drift) */}
      <canvas
        ref={canvasRef}
        id="hero-fx-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
      />

      {/* Atmospheric Contrast Vignettes (Preserving exact visual composition & typography legibility) */}
      {/* Left-side subtle shadow for high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070a0e]/85 via-[#070a0e]/45 to-transparent w-full sm:w-[68%] pointer-events-none z-10" />

      {/* Top subtle vignette for crisp navbar visibility */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#070a0e]/80 via-[#070a0e]/30 to-transparent pointer-events-none z-10" />

      {/* Bottom subtle shadow for water reflection & scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070a0e]/85 via-[#070a0e]/30 to-transparent pointer-events-none z-10" />

      {/* Subtle Floating Media Controls (Bottom-right corner) */}
      <div
        id="hero-video-controls"
        className="fixed bottom-7 sm:bottom-10 right-6 sm:right-12 md:right-16 lg:right-20 z-30 flex items-center gap-3 bg-[#0d121a]/70 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 text-white/70 hover:border-white/30 transition-all duration-300"
      >
        {onOpenObservatory && (
          <>
            <button
              id="btn-open-observatory-shortcut"
              onClick={onOpenObservatory}
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase hover:text-[#e8a36e] transition-colors cursor-pointer focus:outline-none"
              title="Open Celestial Observatory"
            >
              <Compass className="w-3.5 h-3.5 text-[#e8a36e]" />
              <span className="hidden md:inline text-white/80">PORTAL</span>
            </button>
            <span className="w-[1px] h-3 bg-white/20" />
          </>
        )}

        <button
          id="btn-toggle-video-playback"
          onClick={togglePlay}
          className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase hover:text-white transition-colors cursor-pointer focus:outline-none"
          title={isPlaying ? 'Pause video loop' : 'Play video loop'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-white/90" />
              <span className="hidden sm:inline">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-white/90" />
              <span className="hidden sm:inline">PLAY</span>
            </>
          )}
        </button>

        <span className="w-[1px] h-3 bg-white/20" />

        <button
          id="btn-toggle-ambient-audio"
          onClick={toggleAudio}
          className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase hover:text-amber-200 transition-colors cursor-pointer focus:outline-none"
          title={isAudioActive ? 'Mute ambient sound' : 'Enable ambient soundscape'}
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline text-amber-200">SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
              <span className="hidden sm:inline">SOUND</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
