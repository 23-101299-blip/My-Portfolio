import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems, profile } from '../data/site';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Aly Gameel — home">
          <span className="nav__name">{profile.name}</span>
          <span className="nav__tag">{profile.tagline}</span>
        </Link>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`burger ${open ? 'burger--open' : ''}`} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>

        <nav id="main-menu" className={`nav__menu ${open ? 'nav__menu--open' : ''}`} aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__status" aria-label="Status: online">
          <span className="nav__dot" aria-hidden="true" />
          ONLINE
        </div>
      </div>
    </header>
  );
}
