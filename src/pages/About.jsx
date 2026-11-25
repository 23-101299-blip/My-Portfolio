import Page from '../components/Page';
import Window from '../components/Window';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import { profile } from '../data/site';

export default function About() {
  return (
    <Page title="About Me">
      <section className="band band--sky">
        <div className="container">
          <h1 className="section-title">▶ ABOUT ME</h1>
          <div className="profile-grid">
            <Reveal>
              <Window bar="red" title="My Computer / Portfolio / About" dots={['sky', 'green', 'yellow']} className="fill">
                <p className="pixel muted kicker">▶ PLAYER ONE / CHARACTER BIO</p>
                <p className="pixel big-name">{profile.name}</p>
                <p className="pixel sub-role">{profile.role}</p>
                <p className="lead">{profile.bio}</p>
                <div className="btn-row mt-32">
                  <Button to="/projects" color="red" font="retro">View My Work</Button>
                  <Button to="/contact" color="blue" font="retro">HIRE ME</Button>
                </div>
              </Window>
            </Reveal>
            <Reveal delay={0.1}>
              <Window bar="green" title="Aly Gameel.PNG" bg="yellow" className="portrait-win fill" bodyClassName="portrait-win__body">
                <img src={profile.portrait} alt="Portrait of Aly Gameel" width="328" height="396" />
                <p className="retro portrait-win__cap">{profile.location}</p>
              </Window>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--cream">
        <div className="container">
          <h2 className="section-title">▶ THE PERSON BEHIND THE PIXELS</h2>
          <div className="two-col">
            <Reveal>
              <Window bar="sky" title="Creative interests.txt" dots={['red', 'green', 'yellow']} className="fill" bodyClassName="story">
                <div className="story__head">
                  <img src="/assets/pixel/spark.svg" alt="" width="48" height="48" />
                  <h3 className="pixel">EXPLORING THE POSSIBILITIES</h3>
                </div>
                <p className="story__text">
                  I’m interested in how identity, motion, code and interaction can come together. My creative interests span visual storytelling, game interfaces, interactive 3D and XR experiences.
                </p>
                <p className="retro muted story__foot">Curiosity is part of the toolkit.</p>
              </Window>
            </Reveal>
            <Reveal delay={0.1}>
              <Window bar="red" title="Next objective.txt" className="fill" bodyClassName="story">
                <div className="story__head">
                  <img src="/assets/pixel/flag-about.svg" alt="" width="48" height="48" />
                  <h3 className="pixel">DESIGN WITH PURPOSE</h3>
                </div>
                <p className="story__text">
                  My aim is to create thoughtful, user-centered digital design: work that looks engaging, feels intuitive and makes complex ideas easier to understand.
                </p>
                <p className="retro muted story__foot">Aesthetics + function + people.</p>
              </Window>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
