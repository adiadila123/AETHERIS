import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface InfoModalProps {
  type: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const [submitted, setSubmitted] = React.useState(false);

  if (!type || type === 'works') return null;

  return (
    <AnimatePresence>
      <motion.div
        id="aetheris-info-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a0e]/85 backdrop-blur-xl p-4 sm:p-8"
      >
        <motion.div
          id="aetheris-info-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0d121a]/95 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#e8a36e] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              AETHERIS / {type.toUpperCase()}
            </span>
            <button
              id="close-info-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {type === 'services' && (
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-light text-white">Visual Synthesis & Spatial Craft</h2>
              <div className="space-y-4 text-sm text-white/70 leading-relaxed font-light">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <h3 className="text-white font-normal text-base mb-1">01. Conceptual Worldbuilding</h3>
                  <p>Architecting impossible spatial environments, celestial scale monuments, and hyperrealistic surreal horizons.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <h3 className="text-white font-normal text-base mb-1">02. Cinematic Keyframe Direction</h3>
                  <p>Guiding high-fidelity AI models to execute consistent lighting, atmospheric scattering, and photographic nuance.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <h3 className="text-white font-normal text-base mb-1">03. Brand Spatial Identity</h3>
                  <p>Crafting signature visual mythologies for forward-thinking architecture, film, and luxury entities.</p>
                </div>
              </div>
            </div>
          )}

          {type === 'stories' && (
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-light text-white">Reflections on Liminality</h2>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Every composition is an investigation into silence. By placing monolithic geometry at the threshold of water and celestial bodies, we explore how human observers confront the incomprehensible scale of time and space.
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                "The boundary between imagination and reality is not a barrier to cross, but a mirror to reflect upon."
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
