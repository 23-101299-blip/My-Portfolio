// All website content lives here. Edit this file to update text, add
// projects or fill in placeholders — the pages read from it automatically.

const A = '/assets';

export const profile = {
  name: 'ALY GAMEEL',
  role: 'UI/UX DESIGNER',
  tagline: 'UI/UX DESIGNER / PLAYER 01',
  location: 'Cairo, Egypt',
  // NOTE: copied from the Figma design — double-check the spelling of the address.
  email: 'ali.gameel.hussein@gmail.com',
  phones: ['01001056154', '01126070903'],
  portrait: `${A}/img/aly-portrait.webp`,
  intro: 'UI/UX designer solving problems through thoughtful, user-centered digital design.',
  bio: 'I’m a UI/UX designer with a passion for visual design and meaningful digital experiences. I turn ideas and problems into clean, engaging, easy-to-use interfaces. My background in Digital Arts & Design shapes a creative approach that balances aesthetics, functionality and the needs of the user.',
  social: [
    { label: 'LinkedIn', url: '' },
    { label: 'Instagram', url: '' },
    { label: 'Facebook', url: '' },
  ],
  // Put your CV PDF at public/assets/cv/Aly-Gameel-CV.pdf and set this to true.
  cvAvailable: false,
  cvPath: `${A}/cv/Aly-Gameel-CV.pdf`,
};

export const navItems = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'WORK', to: '/projects' },
  { label: 'WORLDS', to: '/categories' },
  { label: 'RESUME', to: '/resume' },
  { label: 'CONTACT', to: '/contact' },
];

// The 8 mandatory categories ("worlds").
export const categories = [
  {
    slug: 'brand-identity',
    title: 'Brand Identity Design',
    short: 'BRAND',
    desc: 'Visual identity and a coherent brand language.',
    color: 'yellow',
    icon: `${A}/pixel/cat-brand.svg`,
    iconSize: [64, 56],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX',
    short: 'UI/UX',
    desc: 'Thoughtful interfaces built around people.',
    color: 'sky',
    icon: `${A}/pixel/cat-uiux.svg`,
    iconSize: [64, 64],
  },
  {
    slug: 'micro-animation',
    title: 'Micro Animation',
    short: 'MOTION',
    desc: 'Small moments of movement and feedback.',
    color: 'red',
    icon: `${A}/pixel/cat-animation.svg`,
    iconSize: [64, 64],
  },
  {
    slug: 'contextual-research',
    title: 'Contextual Research',
    short: 'RESEARCH',
    desc: 'Understanding people, needs and context.',
    color: 'green',
    icon: `${A}/pixel/cat-research.svg`,
    iconSize: [64, 64],
  },
  {
    slug: 'game-ui-ux',
    title: 'Game UI/UX Design',
    short: 'GAME UI',
    desc: 'Playful navigation and player-focused interfaces.',
    color: 'red',
    icon: `${A}/pixel/cat-game.svg`,
    iconSize: [64, 48],
  },
  {
    slug: 'coding',
    title: 'Coding & Development',
    short: 'CODE',
    desc: 'Bringing digital ideas to life through code.',
    color: 'yellow',
    icon: `${A}/pixel/cat-code.svg`,
    iconSize: [64, 64],
  },
  {
    slug: 'interactive-3d',
    title: 'Interactive 3D Design',
    short: '3D',
    desc: 'Spatial ideas and interactive visual experiences.',
    color: 'green',
    icon: `${A}/pixel/cat-3d.svg`,
    iconSize: [64, 64],
  },
  {
    slug: 'xr-interaction',
    title: 'XR Interaction Design',
    short: 'XR',
    desc: 'Exploring interaction beyond the screen.',
    color: 'sky',
    icon: `${A}/pixel/cat-xr.svg`,
    iconSize: [64, 48],
  },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);

// Projects. `thumb` describes the card thumbnail; `caseStudy` links to a full case study.
export const projects = [
  {
    slug: 'mobile-ui',
    title: 'Mobile UI',
    kicker: 'UI/UX / MOBILE INTERFACE',
    tagline: 'A MOBILE INTERFACE PREVIEW.',
    summary: 'Mobile interface preview from Home.',
    label: 'Provisional descriptive label',
    description:
      'Mobile interface preview from the Home page. A full write-up of this project will be added once the case study is ready.',
    thumb: { type: 'image', src: `${A}/img/work-mobile.webp`, bg: 'sky', fit: 'cover' },
    categories: ['ui-ux'],
    role: '[Add your role]',
    tools: 'Figma',
    duration: '[Add duration]',
  },
  {
    slug: 'desktop-ui',
    title: 'Desktop UI',
    kicker: 'UI/UX / DESKTOP INTERFACE',
    tagline: 'A DESKTOP INTERFACE PREVIEW.',
    summary: 'Desktop interface preview from Home.',
    label: 'Provisional descriptive label',
    description:
      'Desktop interface preview from the Home page. A full write-up of this project will be added once the case study is ready.',
    thumb: { type: 'image', src: `${A}/img/work-desktop.webp`, bg: 'yellow', fit: 'cover' },
    categories: ['ui-ux'],
    role: '[Add your role]',
    tools: 'Figma',
    duration: '[Add duration]',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    kicker: 'BRAND / GRAPHIC DESIGN',
    tagline: 'SOCIAL & CAMPAIGN VISUALS.',
    summary: 'Graphic design preview from Home.',
    label: 'Provisional descriptive label',
    description:
      'Graphic design preview from the Home page. A full write-up of this project will be added once the case study is ready.',
    thumb: { type: 'image', src: `${A}/img/work-graphic.webp`, bg: 'red', fit: 'cover', position: 'left center' },
    categories: ['brand-identity'],
    role: 'Content Creator & Graphic Designer',
    tools: 'Photoshop, Illustrator, Canva',
    duration: '[Add duration]',
  },
  {
    slug: 'photography',
    title: 'Photography',
    kicker: 'CONTENT CREATION / PHOTOGRAPHY',
    tagline: 'MOMENTS, LIGHT AND PLACES.',
    summary: 'Photography preview from Home.',
    label: 'Provisional descriptive label',
    description:
      'Photography preview from the Home page. A full write-up of this project will be added once the case study is ready.',
    thumb: { type: 'image', src: `${A}/img/work-photo.webp`, bg: 'green', fit: 'cover', position: 'left center' },
    categories: [],
    role: 'Photographer & editor',
    tools: 'Lightroom, Photoshop',
    duration: '[Add duration]',
  },
  {
    slug: 'foodiq',
    title: 'FoodIQ',
    kicker: 'YEAR 3 / EDUCATIONAL WEBSITE',
    tagline: 'MAKING FOOD CHOICES EASIER TO UNDERSTAND.',
    summary: 'Interactive 3D food education website.',
    label: 'Year 3 / Educational project',
    description:
      'An educational interactive 3D website that presents food information through visual comparisons, healthy alternatives and simple tips, rather than overwhelming text or a shopping-first experience.',
    thumb: { type: 'foodiq', bg: 'cream' },
    categories: ['interactive-3d', 'ui-ux', 'coding'],
    role: 'Website & visual interaction design. Created the final four-page design with interactive 3D elements.',
    tools: 'Figma, VS Code, and 3D',
    duration: '[2 weeks]',
    objective:
      'Help people understand healthier food choices through accessible visual information. Designed for people seeking food and health education without complicated, overwhelming material.',
    created:
      'A four-page interactive 3D website: Home, About, Recipes and Gallery, with tips and tricks at the end of each page. The project brings together comparisons, Smart Swaps and playful learning.',
    caseStudy: true,
    related: ['desktop-ui', 'mobile-ui'],
  },
  {
    slug: 'creative-agency',
    title: 'Creative Agency',
    kicker: 'CONCEPT / CREATIVE SERVICES',
    tagline: 'CREATIVE SERVICES FOR STARTUPS.',
    summary: 'Creative services for startups.',
    label: 'Unnamed concept / Descriptive label',
    description:
      'A concept for a creative agency serving startups and remote creatives. Project name and full write-up to be added.',
    thumb: { type: 'agency', bg: 'red' },
    categories: ['brand-identity', 'ui-ux'],
    role: '[Add your role]',
    tools: 'Figma',
    duration: '[Add duration]',
  },
  {
    slug: 'mercedes-benz',
    title: 'Mercedes-Benz',
    kicker: 'SOLO PROJECT / 3D WEBSITE',
    tagline: 'AN AUTOMOTIVE EXPERIENCE IN A NEW DIMENSION.',
    summary: 'Automotive website with inspectable 3D cars.',
    label: 'Solo project / Design + development',
    description:
      'I designed, prototyped and developed this complete website independently—bringing the cars to life through interactive 3D elements visitors can inspect and zoom.',
    thumb: { type: 'image', src: `${A}/img/mb-hero.webp`, bg: 'navy', fit: 'cover' },
    categories: ['interactive-3d', 'ui-ux', 'coding'],
    role: 'Solo designer + developer',
    tools: 'Figma, VS Code, 3D',
    duration: '[Add duration]',
    caseStudy: true,
    related: ['foodiq', 'desktop-ui'],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Home "MY WORK" strip (matches the Figma home page).
export const featuredWork = ['mobile-ui', 'desktop-ui', 'graphic-design', 'photography'];

export const toolGroups = [
  {
    title: 'Design',
    color: 'sky',
    tools: [
      { name: 'Canva', icon: `${A}/icons/canva.svg` },
      { name: 'Figma', icon: `${A}/icons/figma.svg` },
      { name: 'Illustrator', icon: `${A}/icons/illustrator.svg` },
      { name: 'Photoshop', icon: `${A}/icons/photoshop.svg` },
    ],
  },
  {
    title: 'Web Development',
    color: 'yellow',
    tools: [
      { name: 'VS Code', icon: `${A}/icons/vscode.svg`, wide: true },
      { name: 'HTML', icon: `${A}/icons/html.svg` },
      { name: 'CSS', icon: `${A}/icons/css.svg` },
      { name: 'JavaScript', icon: `${A}/icons/javascript.svg` },
      { name: 'React', icon: `${A}/icons/react.svg` },
      { name: 'WordPress', icon: `${A}/icons/wordpress.svg`, logo: true },
    ],
  },
  {
    title: 'Content Creation',
    color: 'red',
    tools: [
      { name: 'Premiere Pro', icon: `${A}/icons/premiere.svg` },
      { name: 'Lightroom', icon: `${A}/icons/lightroom.svg` },
      { name: 'After Effects', icon: `${A}/icons/after-effects.svg` },
      { name: 'CapCut', icon: `${A}/icons/capcut.svg` },
    ],
  },
];

// Home "SKILLS" window — each skill uses its category's pixel icon and links to that world.
export const skills = [
  { name: 'UX/UI Design', slug: 'ui-ux' },
  { name: 'Micro Animation', slug: 'micro-animation' },
  { name: 'Contextual Research', slug: 'contextual-research' },
  { name: 'Coding & Development', slug: 'coding' },
  { name: 'Brand Identity Design', slug: 'brand-identity' },
  { name: 'Game UI/UX Design', slug: 'game-ui-ux' },
  { name: 'Interactive 3D Design', slug: 'interactive-3d' },
  { name: 'XR Interaction Design', slug: 'xr-interaction' },
];

export const clients = [
  { name: 'FamBam', src: `${A}/logos/fambam.svg` },
  { name: 'Blooms Egypt', src: `${A}/img/client-blooms.webp` },
  { name: 'City Boys Studio', src: `${A}/img/client-city.webp` },
  { name: 'Kay Holding Marketing Company', src: `${A}/img/client-kay.webp` },
];

export const experience = [
  { org: 'KAY HOLDING', role: 'UI/UX Designer', note: 'Marketing agency' },
  { org: 'FAMBAM', role: 'Content Creator & Graphic Designer', note: 'Mall in New Cairo' },
  { org: 'CITY BOYS STUDIO', role: 'Content Creator & Graphic Designer', note: 'Media production company' },
  { org: 'BLOOMS EGYPT', role: 'Content Creator & Graphic Designer', note: 'Summer camp' },
  { org: 'YOUTUBE CHANNELS', role: 'Thumbnail Design & Video Production', note: 'Designed thumbnails; shot and edited videos.' },
];

export const education = {
  title: 'Digital Arts & Design',
  text: 'Background in creative and visual approaches to digital design.',
  rows: [
    ['Institution', '[Add institution]'],
    ['Qualification', '[Add exact qualification]'],
    ['Dates', '[Add dates]'],
  ],
};
