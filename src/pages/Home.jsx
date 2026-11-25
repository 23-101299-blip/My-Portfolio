import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Window from '../components/Window';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import PlayerSprite from '../components/PlayerSprite';
import GameStage from '../components/GameStage';
import { profile, projects, featuredWork, toolGroups, skills, clients, getCategory } from '../data/site';

const workBg = { 'mobile-ui': 'sky', 'desktop-ui': 'yellow', 'graphic-design': 'red', photography: 'green' };

export default function Home() {
  const work = featuredWork.map((slug) => projects.find((p) => p.slug === slug));

  return (
    <Page title="Home" className="home">
      {/* ===== MY WORK ===== */}
      <section className="band band--sky home-work" aria-labelledby="work-title">
        <div className="perch perch--work" aria-hidden="true"><PlayerSprite className="sprite--bob" /></div>
        <div className="container">
          <h2 id="work-title" className="section-title">▶ MY WORK</h2>
          <div className="pathbar">
            <span className="pathbar__dots" aria-hidden="true"><i className="sq sq--green" /><i className="sq sq--sky" /><i className="sq sq--yellow" /></span>
            <span className="pixel">MY COMPUTER / PORTFOLIO / PROJECTS</span>
          </div>
          <div className="work-grid">
            {work.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to="/projects" className="work-tile">
                  <span className={`work-tile__img work-tile__img--${workBg[p.slug]}`}>
                    <img
                      src={p.thumb.src}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      className={p.thumb.fit === 'contain' ? 'is-contain' : ''}
                      style={p.thumb.position ? { objectPosition: p.thumb.position } : undefined}
                    />
                  </span>
                  <span className="work-tile__label pixel">{p.title}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="center">
            <Button to="/projects" color="red">VIEW ALL PROJECTS</Button>
          </div>
        </div>
      </section>

      {/* ===== PLAYER ONE (hero) ===== */}
      <section className="band band--cream home-hero">
        <div className="container hero-grid">
          <Reveal>
            <Window bar="red" title="Aly gameel.com" dots={['sky', 'green', 'yellow']} className="hero-main" bodyClassName="hero-main__body">
              <p className="pixel muted hero-kicker">▶ PLAYER ONE READY</p>
              <h1 className="pixel hero-name">{profile.name}</h1>
              <p className="pixel hero-role">{profile.role}</p>
              <p className="retro hero-intro">{profile.intro}</p>
              <div className="btn-row hero-btns">
                <Button to="/projects" color="red" font="retro">Start Portfolio</Button>
                <Button to="/contact" color="blue" font="retro">HIRE ME</Button>
              </div>
            </Window>
          </Reveal>
          <Reveal delay={0.1}>
            <Window bar="green" title="Aly Gameel.PNG" dots={['red', 'sky', 'yellow']} bg="yellow" className="portrait-win" bodyClassName="portrait-win__body">
              <img src={profile.portrait} alt="Portrait of Aly Gameel" width="374" height="437" />
              <p className="retro portrait-win__cap">{profile.location}</p>
            </Window>
          </Reveal>
        </div>
      </section>

      {/* ===== GAME: hit a block to enter a world ===== */}
      <section className="band band--sky home-game" aria-labelledby="game-title">
        <div className="container">
          <h2 id="game-title" className="section-title">▶ PRESS START / PICK A WORLD</h2>
          <p className="retro center home-game__lead">Walk, jump and hit a block to open one of the 8 portfolio worlds.</p>
          <Reveal><GameStage /></Reveal>
          <div className="center home-game__alt">
            <Link to="/categories" className="text-link">Prefer a list? Browse all worlds →</Link>
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section className="band band--green home-tools" aria-labelledby="tools-title">
        <div className="perch perch--tools" aria-hidden="true"><PlayerSprite className="sprite--bob" /></div>
        <div className="container">
          <h2 id="tools-title" className="section-title">▶ TOOLS</h2>
          <div className="tools-grid">
            {toolGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} className={`tool-box tool-box--${g.color}`}>
                <h3 className="pixel tool-box__head">{g.title}</h3>
                <ul className={`tool-box__icons ${g.tools.length > 4 ? 'tool-box__icons--dev' : ''}`}>
                  {g.tools.map((t) => (
                    <li key={t.name} className={t.wide ? 'is-wide' : t.logo ? 'is-logo' : ''} title={t.name}>
                      <img src={t.icon} alt={t.name} />
                      {t.wide && <span className="retro">VS CODE</span>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="band band--red home-skills" aria-labelledby="skills-title">
        <div className="perch perch--skills" aria-hidden="true"><PlayerSprite className="sprite--bob" facing="left" /></div>
        <div className="container">
          <h2 id="skills-title" className="section-title section-title--white">▶ SKILLS</h2>
          <Reveal>
            <Window bar="green" title="Skills.Aly" dots={['red', 'sky', 'yellow']} className="skills-win">
              <ul className="skills-grid">
                {skills.map((s) => {
                  const c = getCategory(s.slug);
                  return (
                    <li key={s.slug}>
                      <Link to={`/projects?category=${s.slug}`} className="skill">
                        <span className={`skill__icon bg-${c.color}`}>
                          <img src={c.icon} alt="" width={c.iconSize[0] * 0.75} height={c.iconSize[1] * 0.75} />
                        </span>
                        <span className="pixel skill__name">{s.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Window>
          </Reveal>
        </div>
      </section>

      {/* ===== CLIENTS ===== */}
      <section className="band band--cream home-clients" aria-labelledby="clients-title">
        <div className="container">
          <h2 id="clients-title" className="section-title">▶ I WORKED WITH</h2>
          <ul className="clients-grid">
            {clients.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 0.08}>
                <img src={c.src} alt={c.name} loading="lazy" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  );
}
