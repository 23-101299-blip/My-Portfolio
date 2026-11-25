import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import PlayerSprite from './PlayerSprite';
import { getCategory, projects } from '../data/site';

// Pixel Aly walks visitors through the site. Each page has a few speech
// "lines"; a line may carry an action (a link, or scrolling to a section).
function linesFor(pathname, search) {
  if (pathname === '/') {
    return [
      { text: "Hey, I'm Aly! Welcome to my portfolio. I'll be your guide today." },
      { text: 'Scroll down to PRESS START: walk, jump and hit a block to enter one of my 8 worlds.', action: { label: 'Take me to the game', scroll: '#game-title' } },
      { text: 'In a hurry? All my work is in one place.', action: { label: 'Show all projects', to: '/projects' } },
    ];
  }
  if (pathname === '/about') {
    return [
      { text: 'This is my character bio: who I am and how I like to design.' },
      { text: "Like what you see? Let's work together.", action: { label: 'Hire me', to: '/contact' } },
    ];
  }
  if (pathname === '/projects') {
    const c = getCategory(new URLSearchParams(search).get('category'));
    if (c) {
      const count = projects.filter((p) => p.categories.includes(c.slug)).length;
      return [
        { text: `Welcome to the ${c.title} world!` },
        { text: count ? `There ${count === 1 ? 'is 1 level' : `are ${count} levels`} in here.` : 'This world is still being built. New levels are on the way!' },
        { text: 'Want to see everything again?', action: { label: 'All work', to: '/projects' } },
      ];
    }
    return [
      { text: "Every level I've cleared so far. Use Browse Categories to filter by world." },
      { text: 'The coloured tags on each card show which worlds a project belongs to.' },
    ];
  }
  if (pathname === '/categories') {
    return [
      { text: 'These are my 8 worlds: the disciplines I work in. Pick one to explore!' },
      { text: 'Fun shortcut: you can also jump into a world from the game on Home.', action: { label: 'Play the game', to: '/' } },
    ];
  }
  if (pathname === '/contact') {
    return [
      { text: 'Player two, is that you? Tell me about your idea.' },
      { text: 'Press Send and your email app opens with your message ready to go.' },
    ];
  }
  if (pathname === '/resume') {
    return [
      { text: 'My quest log: education, experience, skills and tools.' },
      { text: 'Want to talk about a role?', action: { label: 'Contact me', to: '/contact' } },
    ];
  }
  if (pathname === '/loading') {
    return [{ text: 'The loading screen! Wait for the bar to fill up, then press start.' }];
  }
  return [
    { text: "Oops, wrong turn! This level doesn't exist." },
    { text: "Don't worry, no progress lost.", action: { label: 'Take me home', to: '/' } },
  ];
}

const readPref = () => {
  try { return localStorage.getItem('aly-guide') === 'closed'; } catch { return false; }
};
const writePref = (closed) => {
  try { localStorage.setItem('aly-guide', closed ? 'closed' : 'open'); } catch { /* storage blocked */ }
};

export default function TourGuide({ hidden = false }) {
  const { pathname, search } = useLocation();
  const reduce = useReducedMotion();
  const lines = useMemo(() => linesFor(pathname, search), [pathname, search]);
  const [closed, setClosed] = useState(readPref);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [arriving, setArriving] = useState(true);
  const [waveUp, setWaveUp] = useState(false);
  const [tucked, setTucked] = useState(false);

  // New page: restart at the first line, walk in.
  useEffect(() => {
    setStep(0);
    setArriving(true);
    const t = window.setTimeout(() => setArriving(false), reduce ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [pathname, search, reduce]);

  const line = lines[Math.min(step, lines.length - 1)];

  // On small screens, tuck the bubble away once the visitor starts scrolling.
  useEffect(() => {
    setTucked(false);
    if (window.innerWidth >= 700) return undefined;
    const start = window.scrollY;
    const onScroll = () => { if (Math.abs(window.scrollY - start) > 160) setTucked(true); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Typewriter effect for the current line.
  useEffect(() => {
    if (closed || hidden || tucked) return undefined;
    if (reduce) { setTyped(line.text); return undefined; }
    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(line.text.slice(0, i));
      if (i >= line.text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [line, closed, hidden, tucked, reduce]);

  // Wave while talking.
  const talking = typed.length < line.text.length;
  useEffect(() => {
    if (!talking || reduce) { setWaveUp(false); return undefined; }
    const id = window.setInterval(() => setWaveUp((w) => !w), 260);
    return () => window.clearInterval(id);
  }, [talking, reduce]);

  if (hidden) return null;

  const close = () => { setClosed(true); writePref(true); };
  const open = () => { setClosed(false); setTucked(false); writePref(false); if (closed) setStep(0); };
  const isLast = step >= lines.length - 1;
  const doAction = () => {
    if (line.action?.scroll) {
      document.querySelector(line.action.scroll)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  if (closed || tucked) {
    return (
      <button type="button" className="guide-fab" onClick={open} aria-label="Open the tour guide">
        <PlayerSprite className="guide-fab__sprite" />
        <span className="pixel guide-fab__label">GUIDE</span>
      </button>
    );
  }

  const frame = arriving && !reduce ? 'walk1' : waveUp ? 'wave' : 'idle';

  return (
    <aside className={`guide ${arriving && !reduce ? 'guide--arriving' : ''}`} aria-label="Tour guide">
      <div className="guide__char" aria-hidden="true">
        <PlayerSprite frame={frame} className={!talking ? 'sprite--bob' : ''} />
      </div>
      <div className="guide__bubble" role="status" aria-live="polite">
        <div className="guide__head">
          <span className="pixel guide__name">ALY / GUIDE</span>
          <span className="retro guide__count">{step + 1}/{lines.length}</span>
          <button type="button" className="guide__x" onClick={close} aria-label="Hide the guide">×</button>
        </div>
        <p className="guide__text">
          <span className="visually-hidden">{line.text}</span>
          <span aria-hidden="true">{typed}<span className={`guide__caret ${talking ? '' : 'guide__caret--blink'}`}>▌</span></span>
        </p>
        <div className="guide__actions">
          {line.action?.to && <Link to={line.action.to} className="btn btn--red btn--pixel guide__btn">{line.action.label} →</Link>}
          {line.action?.scroll && <button type="button" className="btn btn--red btn--pixel guide__btn" onClick={doAction}>{line.action.label} ↓</button>}
          {!isLast ? (
            <button type="button" className="btn btn--yellow btn--pixel guide__btn" onClick={() => setStep((s) => s + 1)}>NEXT ▶</button>
          ) : (
            <button type="button" className="btn btn--white btn--pixel guide__btn" onClick={close}>GOT IT</button>
          )}
        </div>
      </div>
    </aside>
  );
}
