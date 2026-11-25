import { Link } from 'react-router-dom';
import { navItems, profile } from '../data/site';

export function PlatformStrip() {
  return <div className="platform-strip" aria-hidden="true" />;
}

export default function Footer({ compact = false }) {
  const links = navItems.filter((n) => n.to !== '/');
  return (
    <footer className="footer">
      {!compact && (
        <div className="container footer__top">
          <div>
            <p className="footer__title pixel">NEXT LEVEL?</p>
            <p className="footer__lead retro">Let&apos;s build something worth exploring.</p>
          </div>
          <div className="footer__cta">
            <Link to="/contact" className="btn btn--yellow btn--pixel btn--shadow">START A CONVERSATION →</Link>
            <a className="footer__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      )}
      <div className="container footer__bottom">
        <div>
          <p className="footer__sig pixel">ALY GAMEEL / UI/UX DESIGNER</p>
          <p className="retro footer__small">Cairo, Egypt / Designed with curiosity.</p>
        </div>
        <div>
          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
          <p className="retro footer__small">CHECKPOINT REACHED / KEEP EXPLORING</p>
        </div>
      </div>
      <PlatformStrip />
    </footer>
  );
}
