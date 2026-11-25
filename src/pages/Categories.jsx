import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Window from '../components/Window';
import Reveal from '../components/Reveal';
import { categories } from '../data/site';

export default function Categories() {
  return (
    <Page title="Categories">
      <section className="band band--split-red" style={{ '--split': '38%' }}>
        <div className="container">
          <h1 className="section-title">▶ CATEGORIES</h1>
          <Window bar="green" title="My Computer / Portfolio / Categories">
            <div className="filters filters--spread">
              <span className="chip" aria-current="true">All Disciplines</span>
              <Link to="/projects" className="text-link">View All Projects →</Link>
              <p className="retro filters__hint">Choose a world to explore.</p>
            </div>
            <ul className="cat-grid">
              {categories.map((c, i) => (
                <Reveal as="li" key={c.slug} delay={(i % 4) * 0.06}>
                  <Link to={`/projects?category=${c.slug}`} className="cat-card">
                    <span className={`cat-card__icon bg-${c.color}`}>
                      <img src={c.icon} alt="" width={c.iconSize[0]} height={c.iconSize[1]} />
                    </span>
                    <span className="cat-card__body">
                      <span className="pixel cat-card__title">{c.title}</span>
                      <span className="cat-card__desc">{c.desc}</span>
                      <span className="retro muted cat-card__go">Explore world →</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <p className="retro muted grid-foot">8 creative disciplines / One connected design practice</p>
          </Window>
        </div>
      </section>
    </Page>
  );
}
