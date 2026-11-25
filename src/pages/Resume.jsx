import Page from '../components/Page';
import Window from '../components/Window';
import Reveal from '../components/Reveal';
import { profile, experience, education, categories, toolGroups } from '../data/site';

export default function Resume() {
  return (
    <Page title="Resume">
      <section className="band band--split" style={{ '--split': '55%' }}>
        <div className="container">
          <h1 className="section-title">▶ RESUME</h1>

          <Reveal>
            <Window bar="red" title="My Computer / Portfolio / Resume" bodyClassName="cv-head">
              <div>
                <p className="pixel cv-name">{profile.name}</p>
                <p className="retro cv-role">UI/UX DESIGNER / {profile.location}</p>
                <p className="cv-contact">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <span>{profile.phones.join(' / ')}</span>
                </p>
              </div>
              <div className="cv-dl">
                <div className="cv-dl__row">
                  <img src="/assets/pixel/download.svg" alt="" width="40" height="40" />
                  {profile.cvAvailable ? (
                    <a className="btn btn--red btn--retro" href={profile.cvPath} download>Download CV ↓</a>
                  ) : (
                    <a className="btn btn--red btn--retro" href="#cv" aria-disabled="true" onClick={(e) => e.preventDefault()}>Download CV ↓</a>
                  )}
                </div>
                {!profile.cvAvailable && <p className="small muted" id="cv">[CV file to be added] Static download button preview.</p>}
              </div>
            </Window>
          </Reveal>

          <div className="cv-grid">
            <Reveal className="cv-col">
              <Window bar="sky" title="Education.Aly" dots={['red', 'green', 'yellow']} bodyClassName="edu">
                <h2 className="pixel">{education.title}</h2>
                <p>{education.text}</p>
                <dl>
                  {education.rows.map(([k, v]) => (
                    <div key={k}><dt className="retro">{k}</dt><dd className="muted">{v}</dd></div>
                  ))}
                </dl>
              </Window>
              <Window bar="red" title="Skills.Aly" dots={['sky', 'red', 'yellow']} className="mt-48 cv-skills" bodyClassName="list-body">
                <ul className="plain">
                  {categories.map((c) => <li key={c.slug}>{c.title}</li>)}
                </ul>
              </Window>
            </Reveal>

            <Reveal className="cv-col" delay={0.1}>
              <Window bar="yellow" title="Experience / Quest log" bodyClassName="quests">
                <ol>
                  {experience.map((q, i) => (
                    <li key={q.org}>
                      <span className="quest-num pixel">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="pixel quest-org">{q.org}</p>
                        <p className="retro quest-role">{q.role}</p>
                        <p className="muted quest-note">{q.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Window>
              <Window bar="green" title="Tools.Aly" className="mt-48" bodyClassName="list-body">
                {toolGroups.map((g) => (
                  <div key={g.title} className="tool-line">
                    <p className="retro muted">{g.title === 'Web Development' ? 'DEVELOPMENT' : g.title.toUpperCase()}</p>
                    <p>{g.tools.map((t) => (t.name === 'HTML' ? 'HTML/CSS/JavaScript' : t.name)).filter((n) => n !== 'CSS' && n !== 'JavaScript').join(', ')}</p>
                  </div>
                ))}
              </Window>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--green">
        <div className="container">
          <h2 className="section-title">▶ ACHIEVEMENTS / QUEST LOG</h2>
          <Reveal className="achievement">
            <img src="/assets/pixel/flag.svg" alt="" width="64" height="64" />
            <div>
              <h3 className="pixel">FoodIQ / COMPLETED PROJECT</h3>
              <p>Completed an educational interactive 3D website with Home, About, Recipes and Gallery pages, plus visual comparisons and healthy tips.</p>
              <p className="small muted">Awards &amp; certifications: [Add verified details, if applicable]</p>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
