import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, Filter, Layers, ChevronDown } from 'lucide-react';
import { ShowcaseProject } from '../types';
import { PROJECTS } from '../data/projects';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: string;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFilterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'Spatial Architecture & CGI', label: 'Architecture & CGI' },
    { id: 'Visual Worldbuilding', label: 'Worldbuilding' },
    { id: 'Generative Environments', label: 'Generative Spaces' },
    { id: 'Cinematic Direction', label: 'Cinematography' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="aetheris-showcase-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a0e]/90 backdrop-blur-xl p-3 sm:p-6 md:p-10 overflow-y-auto"
          >
            {/* Main Modal Container */}
            <motion.div
              id="aetheris-showcase-panel"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[92vh] bg-[#0d121a] border border-white/15 rounded-2xl p-6 sm:p-9 flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-2 gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#e8a36e] font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    AETHERIS PORTFOLIO ARCHIVE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                    Curated Works & Spatial Explorations
                  </h2>
                  <p className="text-xs text-white/50 mt-1">
                    Select any commission to examine full narrative worldbuilding, engineering specifications, and camera studies.
                  </p>
                </div>

                <button
                  id="close-showcase-btn"
                  onClick={onClose}
                  className="self-end sm:self-center w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter: dropdown on mobile, pill tabs on sm+ */}
              <div className="pt-4 pb-4 mb-3">
                {/* Mobile dropdown */}
                <div className="relative sm:hidden" ref={filterDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen((v) => !v)}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer focus:outline-none ${
                      isFilterOpen
                        ? 'bg-white/10 border border-[#e8a36e]/50 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white/85 border border-white/15 hover:border-white/30'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <Filter className="w-3.5 h-3.5 text-[#e8a36e] shrink-0" />
                      <span className="truncate">
                        {categories.find((c) => c.id === activeFilter)?.label}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-white/50 shrink-0 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 mt-2 z-10 bg-[#0d121a] border border-white/15 rounded-2xl p-1.5 shadow-2xl"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setActiveFilter(cat.id);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all cursor-pointer focus:outline-none ${
                              activeFilter === cat.id
                                ? 'bg-[#e8a36e] text-[#070a0e] font-semibold'
                                : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop pill tabs */}
                <div className="hidden sm:flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                  <span className="text-xs text-white/50 flex items-center gap-1.5 mr-1.5 shrink-0 font-medium">
                    <Filter className="w-3.5 h-3.5 text-[#e8a36e]" />
                    <span>Filter:</span>
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer focus:outline-none ${
                        activeFilter === cat.id
                          ? 'bg-[#e8a36e] text-[#070a0e] font-semibold shadow-lg shadow-[#e8a36e]/20 scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-white/75 border border-white/15 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Grid */}
              <div className="overflow-y-auto pr-1 space-y-6 max-h-[62vh] scrollbar-thin scrollbar-thumb-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      id={`project-card-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="group relative bg-[#131922] border border-white/10 hover:border-[#e8a36e]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-video w-full overflow-hidden relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#131922] via-transparent to-transparent opacity-80" />
                          <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] tracking-wider text-white/80 uppercase">
                            {project.year}
                          </div>
                          {project.gallery && (
                            <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[9px] tracking-wider text-white/70 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-[#e8a36e]" />
                              <span>{project.gallery.length} frames</span>
                            </div>
                          )}
                        </div>

                        <div className="p-5">
                          <div className="text-[11px] tracking-[0.2em] uppercase text-[#e8a36e] font-medium">
                            {project.category}
                          </div>
                          <h3 className="text-lg font-light text-white group-hover:text-amber-200 transition-colors mt-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-white/60 line-clamp-2 mt-2 leading-relaxed font-light">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-0">
                        {/* Highlights chip */}
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tools.slice(0, 2).map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tools.length > 2 && (
                              <span className="text-[9px] px-1.5 py-0.5 text-white/40">
                                +{project.tools.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] tracking-widest text-[#e8a36e] group-hover:text-white font-medium uppercase transition-colors">
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer notice */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/45 gap-2">
                <span>AETHERIS Visual Laboratory • Transcendental Architecture & Cinematic Worldbuilding</span>
                <span className="tracking-widest uppercase text-[10px]">
                  {filteredProjects.length} Curated Commissions
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
          allProjects={PROJECTS}
        />
      )}
    </>
  );
};
