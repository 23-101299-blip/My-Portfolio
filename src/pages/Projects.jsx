import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Page from '../components/Page';
import Window from '../components/Window';
import ProjectCard from '../components/ProjectCard';
import { projects, categories, getCategory } from '../data/site';

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category');
  const activeCat = active ? getCategory(active) : null;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    const esc = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [menuOpen]);

  const list = activeCat ? projects.filter((p) => p.categories.includes(activeCat.slug)) : projects;
  const pick = (slug) => { setParams(slug ? { category: slug } : {}); setMenuOpen(false); };

  return (
    <Page title="All Projects">
      <section className="band band--sky">
        <div className="container">
          <h1 className="section-title">▶ ALL PROJECTS</h1>
          <Window bar="red" title="My Computer / Portfolio / Projects">
            <div className="filters">
              <button type="button" className={`chip ${activeCat ? 'chip--off' : ''}`} onClick={() => pick(null)} aria-pressed={!activeCat}>
                All Work
              </button>
              <div className="dropdown" ref={menuRef}>
                <button
                  type="button"
                  className={`chip ${activeCat ? '' : 'chip--off'} chip--wide`}
                  aria-haspopup="listbox"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                >
                  {activeCat ? activeCat.title : 'Browse Categories'} ↓
                </button>
                {menuOpen && (
                  <ul className="dropdown__menu" role="listbox" aria-label="Categories">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <button type="button" role="option" aria-selected={active === c.slug} onClick={() => pick(c.slug)}>
                          <img src={c.icon} alt="" width="24" height="24" /> {c.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {activeCat && (
                <button type="button" className="text-link as-button" onClick={() => pick(null)}>Clear filters</button>
              )}
            </div>
            <p className="filters__note">
              Selected material from the portfolio. Home preview labels are provisional; this is not a complete project inventory.
            </p>

            <motion.div layout className="cards-grid">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {list.length === 0 && (
              <div className="empty">
                <p className="pixel">LEVEL LOCKED</p>
                <p className="retro muted">No projects in this world yet — new work is on its way.</p>
              </div>
            )}

            <p className="retro muted grid-foot">
              {list.length} {list.length === 1 ? 'entry' : 'entries'} shown
              {activeCat ? ` / ${activeCat.title}` : ' / Home previews, FoodIQ, Mercedes-Benz and an unnamed creative agency concept'}
            </p>
          </Window>
        </div>
      </section>
    </Page>
  );
}
