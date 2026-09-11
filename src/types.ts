export interface NavItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  caption: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  client?: string;
  role?: string;
  description: string;
  fullStory?: string;
  image: string;
  aspect: string;
  tools?: string[];
  specs?: ProjectSpec[];
  gallery?: GalleryImage[];
  palette?: string[];
  keyHighlights?: string[];
}

export type AtmospherePhase = 'twilight' | 'eclipse' | 'midnight' | 'dawn';

export interface EnvironmentConfig {
  phase: AtmospherePhase;
  bloom: number;
  rippleIntensity: number;
  stardustCount: number;
  ringTilt: number;
  audioDroneFreq: number;
  isAudioOn: boolean;
}

export interface SynthesisOption {
  id: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface SynthesisWorld {
  id: string;
  name: string;
  monolith: string;
  celestial: string;
  terrain: string;
  optics: string;
  image: string;
  promptExcerpt: string;
  coordinates: string;
  gravity: string;
  lightSpectrum: string;
  year: string;
}
