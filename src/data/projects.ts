import { ShowcaseProject } from '../types';

export const PROJECTS: ShowcaseProject[] = [
  {
    id: 'chronos-portal',
    title: 'The Monument of Chronos',
    subtitle: 'A Liminal Gateway at the Edge of Celestial Dusk',
    category: 'Spatial Architecture & CGI',
    year: '2026',
    client: 'AETHERIS Architectural Biennale',
    role: 'Lead Worldbuilder & Visual Director',
    description:
      'An exploration of liminal brutalist portals standing at the intersection of celestial orbits and reflective twilight horizons.',
    fullStory:
      'Conceived as an eternal threshold between human mortality and cosmological cycles, Chronos stands as a monumental cantilevered monolith. The structure pierces through calm, mirrored waters reflecting a low twilight sky, while an immense gas giant with crystalline rings drifts across the horizon. The lone observer provides an anchor of scale—emphasizing humanity’s fragile yet poetic contemplation before cosmic infinity.',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    aspect: '16/9',
    tools: [
      'SideFX Houdini 20',
      'Unreal Engine 5.4 Substrate',
      'DaVinci Resolve Studio',
      'Custom Latent Diffusion',
      'OctaneRender 2024',
    ],
    specs: [
      { label: 'Master Canvas', value: '8192 × 4608 (8K UHD)' },
      { label: 'Volumetric Precision', value: '0.02cm Voxel Grid' },
      { label: 'Atmosphere Model', value: 'Rayleigh-Mie Dual Phase' },
      { label: 'Harmonic Frequency', value: '432 Hz Pythagorean Fundamental' },
      { label: 'Sampling Quality', value: '16,384 SPP Adaptive' },
      { label: 'Colour Space', value: 'ACEScg 32-bit Float' },
    ],
    keyHighlights: [
      'Cantilevered monolithic archway engineered with micro-weathered basalt textures',
      'Physically accurate ring shadow projection onto planetary cloud decks',
      'Sub-surface water scattering simulating high-salinity twilight reflection',
      'Atmospheric depth grading balancing warm twilight amber and cold void navy',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
        title: 'Master Architectural Perspective',
        caption: 'The monolithic cantilever framing the rising celestial ring and twilight horizon.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
        title: 'Dawn Radiance & Volumetric Dust',
        caption: 'Detailed view of the portal opening as early amber rays pierce dense cloud banks.',
      },
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
        title: 'Orbital Ring Plane Alignment',
        caption: 'Macro astronomical view of the ice crystal ring intersecting the planet limb.',
      },
    ],
    palette: ['#070a0e', '#1c2636', '#e8a36e', '#f7c59f', '#f4ebd0'],
  },
  {
    id: 'planetary-resonance',
    title: 'Orbital Whispers',
    subtitle: 'Synthetic Resonance of Planetary Rings Over Glass Waters',
    category: 'Visual Worldbuilding',
    year: '2026',
    client: 'Deep Space Horizon Project',
    role: 'Synthetic Ecology & Lighting Lead',
    description:
      'Synthesizing synthetic planetary ring systems hovering over calm mirrored seas with solitary human silhouettes.',
    fullStory:
      'What if celestial rings were so close that their crystalline dust shimmered like evening mist? Orbital Whispers investigates the optical physics of extreme planetary proximity. The composition balances absolute stillness in the lower aquatic realm with the monumental kinetic drift of millions of ice particles overhead.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    aspect: '16/9',
    tools: [
      'Unreal Engine 5.4',
      'Cinema 4D S26',
      'Redshift GPU',
      'The Foundry Nuke 15',
      'Substance 3D Designer',
    ],
    specs: [
      { label: 'Dynamic Range', value: 'ACEScg 32-bit Float' },
      { label: 'Optical Simulation', value: 'Anamorphic 1.8x Oval Bokeh' },
      { label: 'Ring Particle Count', value: '12.4 Million Ice Voxels' },
      { label: 'Colour Space', value: 'DCI-P3 Cinema Standard' },
      { label: 'Focal Length', value: '35mm Panavision Ultra Prime' },
      { label: 'Horizon Elevation', value: '54% Perspective Shift' },
    ],
    keyHighlights: [
      'Anamorphic optical flare streaks tuned to stellar spectrum temperatures',
      'Procedural water surface with micro-capillary wave dispersion',
      'Multi-spectral ring reflections in hyper-saline tidal flats',
      'Integrated spatial sound design tuned to resonant low-frequency drones',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
        title: 'Planetary Core & Ionosphere Glow',
        caption: 'High-altitude perspective revealing the delicate auroral fringe along the terminator line.',
      },
      {
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
        title: 'Tidal Observer Point',
        caption: 'Ground perspective showing the lone human form against astronomical scale.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
        title: 'Eclipse Shadow Transition',
        caption: 'The moment the primary ring shadows the equatorial water basin.',
      },
    ],
    palette: ['#050811', '#0b2038', '#40798c', '#e8a36e', '#ffffff'],
  },
  {
    id: 'liminal-gateway',
    title: 'Gateway to the Infinite',
    subtitle: 'Monolithic Geometry and Golden Dawn Light',
    category: 'Generative Environments',
    year: '2025',
    client: 'Solitude Arts Pavilion',
    role: 'Procedural Modeller & Art Director',
    description:
      'Harmonising monolithic stone geometry with hyperrealistic atmospheric cloud layers and warm golden dawn light.',
    fullStory:
      'Gateway to the Infinite juxtaposes brutalist masonry with soft, transient cloud formations. The monolithic portal acts as an optical lens, filtering dawn light into razor-sharp volumetric rays that strike the mirror-like tide with blinding luminescence. The work explores the passage of time frozen in architectural weight.',
    image:
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    aspect: '16/9',
    tools: [
      'Blender 4.2 Cycles',
      'SideFX Houdini KineFX',
      'Substance 3D Designer',
      'PyTorch Latent Pipeline',
      'Adobe After Effects',
    ],
    specs: [
      { label: 'Volumetric Scattering', value: 'Anisotropy g = 0.72' },
      { label: 'Stone Displacement', value: '32-bit Vector Displacement' },
      { label: 'Texture Resolution', value: '16K UDIM Tiles' },
      { label: 'Sun Angle', value: '3.4° Glancing Dawn Horizon' },
      { label: 'Atmospheric Density', value: 'Exponential Height Fog' },
      { label: 'Shader Architecture', value: 'Custom Micro-roughness PBR' },
    ],
    keyHighlights: [
      'Procedurally aged stone edges with mineral precipitation stains',
      'Volumetric crepuscular ray marching with dust mote scattering',
      'Dual-layer cloud simulation blending high-altitude cirrus with low marine fog',
      'Pristine optical reflection on undisturbed morning tidewater',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
        title: 'Morning Crepuscular Light',
        caption: 'Volumetric rays pouring through the portal apex as dawn breaks across the bay.',
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
        title: 'Architectural Orthographic Silhouette',
        caption: 'The bold structural silhouette standing motionless in the calm coastal expanse.',
      },
    ],
    palette: ['#090d14', '#261c14', '#b36a3e', '#e8a36e', '#fdecd2'],
  },
  {
    id: 'celestial-arch',
    title: 'Solitude in Twilight',
    subtitle: 'Astronomical Majesty in Boundless Water Landscapes',
    category: 'Cinematic Direction',
    year: '2025',
    client: 'Celestial Cinema Series',
    role: 'Director & Concept Artist',
    description:
      'Visualising the poetic tension between human insignificance and astronomical majesty in boundless water landscapes.',
    fullStory:
      'A cinematic meditation on silence. As the last embers of daylight dissolve into cold indigo, the solitary figure observes the rising of a monumental planetary disc. The work explores the concept of psychological grounding through colossal cosmic perspective, evoking both reverence and tranquil solace.',
    image:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
    aspect: '16/9',
    tools: [
      'SideFX Houdini Oceans',
      'DaVinci Resolve Studio',
      'Chaos V-Ray 6 GPU',
      'FL Studio Audio Synth',
      'Adobe Photoshop Extended',
    ],
    specs: [
      { label: 'Aspect Ratio', value: '2.39:1 CinemaScope Native' },
      { label: 'Film Emulation', value: 'Kodak Vision3 500T 5219 LUT' },
      { label: 'Fluid Solver', value: 'FLIP Micro-Ripples Engine' },
      { label: 'Audio Frequency', value: '54Hz Sub-bass Cosmic Drone' },
      { label: 'Colour Palette Depth', value: '12-bit Rec.2020 High Precision' },
      { label: 'Depth of Field', value: 'f/2.8 Tilt-Shift Perspective' },
    ],
    keyHighlights: [
      'Physically accurate light falloff across immense bodies of water',
      'Subtle atmospheric haze blending the planet disc into the upper stratosphere',
      'Delicate ripple reflections reacting dynamically to tidal ocean currents',
      'Cinematic colour timing balancing warm terracotta amber with deep ultramarine',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
        title: 'Planetary Rise at Zenith',
        caption: 'The giant planetary crescent dominating the evening sky above calm waters.',
      },
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
        title: 'Specular Ring Highlight',
        caption: 'Glint of starlight illuminating the inner ice rings of the moon.',
      },
    ],
    palette: ['#04070d', '#14213d', '#3a506b', '#e8a36e', '#d9dcd6'],
  },
  {
    id: 'aeon-synthesis',
    title: 'The Whispering Horizon',
    subtitle: 'Tectonic Monoliths Under Twin Supermoons',
    category: 'Surreal Futurism',
    year: '2026',
    client: 'AETHERIS Permanent Collection',
    role: 'Creative Technologist',
    description:
      'An ethereal coastal expanse where geological time compresses into a single quiet twilight glance.',
    fullStory:
      'Two orbiting bodies generate complex gravitational tides along a calm, glassy shoreline. Ancient weathered slabs stand like sentinels of a forgotten civilisation, their shadows stretching infinitely into mirrored water while distant stellar clouds illuminate the night.',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    aspect: '16/9',
    tools: [
      'Unreal Engine 5.4',
      'Maxon ZBrush',
      'JangaFX EmberGen',
      'Adobe Premiere Pro',
      'Fab Filter Pro Audio',
    ],
    specs: [
      { label: 'Lighting Method', value: 'Lumen Software Raytracing' },
      { label: 'Tide Simulation', value: 'Shallow Water Equations (SWE)' },
      { label: 'Spatial Audio', value: 'Binaural Wind & Harmonic Drone' },
      { label: 'Render Target', value: '4K Native 60 FPS' },
      { label: 'Geological Detail', value: 'Nanite Virtualized Geometry' },
      { label: 'Exposure Range', value: '18 Stops HDR Dynamic Range' },
    ],
    keyHighlights: [
      'Twin celestial moons interacting with atmospheric twilight scattering',
      'Weathered basalt columns with procedural moss and mineral oxidation',
      'Low-angle reflection caustics shimmering across tidal sand flats',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
        title: 'Twin Moons Horizon',
        caption: 'The rare astronomical alignment casting dual specular reflections on the bay.',
      },
      {
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
        title: 'Geological Sentinel',
        caption: 'A solitary monolithic spire anchoring the infinite shoreline.',
      },
    ],
    palette: ['#070b12', '#18293f', '#4f6d7a', '#c0d6df', '#e8a36e'],
  },
];
