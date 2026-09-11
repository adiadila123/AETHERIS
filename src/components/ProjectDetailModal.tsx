import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Check,
  Copy,
  Layers,
  Cpu,
  Palette,
  Eye,
  Calendar,
  User,
  Building2,
} from 'lucide-react';
import { ShowcaseProject, GalleryImage } from '../types';

interface ProjectDetailModalProps {
  project: ShowcaseProject | null;
  onClose: () => void;
  onSelectProject: (project: ShowcaseProject) => void;
  allProjects: ShowcaseProject[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'gallery' | 'palette'>('overview');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="project-detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#070a0e]/95 backdrop-blur-2xl p-2 sm:p-4 md:p-8 overflow-y-auto select-none"
      >
        {/* Main Detail Container */}
        <motion.div
          id="project-detail-panel"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[94vh] bg-[#0d121a] border border-white/15 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#0d121a]/90 backdrop-blur-md border-b border-white/10">
            {/* Back to works button */}
            <button
              id="btn-back-to-works"
              onClick={onClose}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider uppercase text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Works Archive</span>
            </button>

            {/* Previous / Next Navigator & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs text-white/70">
                <button
                  id="btn-prev-project"
                  onClick={() => onSelectProject(prevProject)}
                  className="px-2.5 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                  title={`Previous: ${prevProject.title}`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Previous</span>
                </button>
                <span className="text-white/20">|</span>
                <button
                  id="btn-next-project"
                  onClick={() => onSelectProject(nextProject)}
                  className="px-2.5 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                  title={`Next: ${nextProject.title}`}
                >
                  <span className="hidden md:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                id="btn-close-project-detail"
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 space-y-8 scrollbar-thin scrollbar-thumb-white/20">
            {/* Hero Artwork Section */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
              <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.96] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121a] via-[#0d121a]/25 to-transparent pointer-events-none" />

                {/* Fullscreen Button on Image */}
                <button
                  id="btn-open-fullscreen-artwork"
                  onClick={() => setLightboxImage(project.image)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#070a0e]/75 backdrop-blur-md border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Master View</span>
                </button>

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/15 text-[11px] font-medium tracking-widest text-[#e8a36e] uppercase">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/15 text-[11px] font-medium tracking-wider text-white/80">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Headline Bar below Artwork */}
              <div className="p-5 sm:p-7 bg-[#111722]/80 border-t border-white/10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                      {project.title}
                    </h1>
                    {project.subtitle && (
                      <p className="text-sm sm:text-base text-white/60 font-light mt-1.5 max-w-3xl leading-relaxed">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/65 pt-2 border-t md:border-t-0 border-white/10">
                    {project.role && (
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#e8a36e]" />
                        <span>{project.role}</span>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#e8a36e]" />
                        <span>{project.client}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs for Project Details */}
            <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar gap-1 sm:gap-2 pt-3">
              <button
                id="tab-detail-overview"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 cursor-pointer focus:outline-none ${
                  activeTab === 'overview'
                    ? 'border-[#e8a36e] text-white'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Concept & Narrative</span>
              </button>

              <button
                id="tab-detail-specs"
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 cursor-pointer focus:outline-none ${
                  activeTab === 'specs'
                    ? 'border-[#e8a36e] text-white'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Technical Specifications</span>
              </button>

              {project.gallery && project.gallery.length > 0 && (
                <button
                  id="tab-detail-gallery"
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 cursor-pointer focus:outline-none ${
                    activeTab === 'gallery'
                      ? 'border-[#e8a36e] text-white'
                      : 'border-transparent text-white/50 hover:text-white/80'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Camera Perspectives ({project.gallery.length})</span>
                </button>
              )}

              {project.palette && project.palette.length > 0 && (
                <button
                  id="tab-detail-palette"
                  onClick={() => setActiveTab('palette')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 cursor-pointer focus:outline-none ${
                    activeTab === 'palette'
                      ? 'border-[#e8a36e] text-white'
                      : 'border-transparent text-white/50 hover:text-white/80'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Colour Palette</span>
                </button>
              )}
            </div>

            {/* TAB 1: OVERVIEW & CONCEPT */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Philosophical Concept */}
                <div className="bg-[#111722]/60 border border-white/10 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#e8a36e] font-medium mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Artistic Vision & Spatial Narrative
                  </div>
                  <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                    {project.fullStory || project.description}
                  </p>
                </div>

                {/* Key Highlights */}
                {project.keyHighlights && project.keyHighlights.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-white/60 font-medium">
                      Architectural & Visual Hallmarks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.keyHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-lg bg-[#141b26]/70 border border-white/10"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#e8a36e]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a36e]" />
                          </div>
                          <span className="text-sm text-white/80 font-light leading-snug">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools Pipeline */}
                {project.tools && project.tools.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-white/60 font-medium">
                      Digital Pipeline & Toolchain
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg bg-[#131a24] border border-white/15 text-xs text-white/80 font-mono tracking-wider"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.specs?.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#111722]/80 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#e8a36e] font-medium">
                        {spec.label}
                      </span>
                      <span className="text-lg font-light text-white mt-2 font-mono">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Engineering Commentary */}
                <div className="p-6 rounded-xl bg-[#141b26]/50 border border-white/10 text-xs sm:text-sm text-white/70 leading-relaxed">
                  <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-2">
                    Engineering Commentary on Pipeline
                  </h4>
                  Each visual scene is rendered utilizing spectral photometric precision and physical fluid simulation. Dusk illumination is rigorously calibrated via Rayleigh-Mie atmospheric scattering, enabling subtle water caustics and horizon transitions to resolve without chromatic degradation.
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY & PERSPECTIVES */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery?.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(item)}
                      className="group bg-[#111722] border border-white/10 hover:border-white/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                        />
                        <div className="absolute bottom-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-white group-hover:text-[#e8a36e] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: COLOUR PALETTE */}
            {activeTab === 'palette' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 bg-[#111722]/80 border border-white/10 rounded-xl">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-[#e8a36e] font-medium mb-2">
                    Chromatic Harmony & Hexadecimal Swatches
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mb-6">
                    Select any swatch to copy the hexadecimal colour value to your clipboard.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {project.palette?.map((hex, idx) => {
                      const isCopied = copiedColor === hex;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleCopyColor(hex)}
                          className="group flex flex-col rounded-xl overflow-hidden border border-white/15 hover:border-white/40 cursor-pointer transition-all bg-[#0a0f16]"
                        >
                          <div
                            className="h-28 w-full transition-transform group-hover:scale-105 duration-300"
                            style={{ backgroundColor: hex }}
                          />
                          <div className="p-3 flex items-center justify-between">
                            <span className="text-xs font-mono tracking-wider text-white/80">
                              {hex.toUpperCase()}
                            </span>
                            {isCopied ? (
                              <span className="flex items-center gap-1 text-[10px] text-green-400">
                                <Check className="w-3 h-3" />
                                Copied!
                              </span>
                            ) : (
                              <Copy className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Project Navigation & Call to Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  id="btn-bottom-prev-project"
                  onClick={() => onSelectProject(prevProject)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs tracking-wider uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{prevProject.title}</span>
                </button>
                <button
                  id="btn-bottom-next-project"
                  onClick={() => onSelectProject(nextProject)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs tracking-wider uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{nextProject.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-white/40 tracking-widest uppercase">
                AETHERIS Digital Artistry Laboratory • {project.year}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxImage && (
          <div
            id="lightbox-container"
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={typeof lightboxImage === 'string' ? lightboxImage : lightboxImage.url}
              alt={typeof lightboxImage === 'string' ? project.title : lightboxImage.title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/15"
            />
            {typeof lightboxImage !== 'string' && (
              <div className="mt-4 text-center">
                <h5 className="text-white text-base font-medium">{lightboxImage.title}</h5>
                <p className="text-white/60 text-xs mt-1 max-w-xl">{lightboxImage.caption}</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
