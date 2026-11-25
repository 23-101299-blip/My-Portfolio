import Page from '../components/Page';
import Window from '../components/Window';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <Page title="404 — Unknown Level">
      <section className="band band--split-red" style={{ '--split': '22%' }}>
        <div className="container">
          <p className="section-title" aria-hidden="true">▶ UNKNOWN LEVEL</p>
          <Window bar="red" title="My Computer / Portfolio / 404" bodyClassName="nf">
            <div className="nf__art">
              <div className="nf__pc" aria-hidden="true">
                <img src="/assets/pixel/broken-computer.svg" width="240" height="240" alt="" />
                <span className="nf__screen" />
                <img className="nf__crack" src="/assets/pixel/screen-crack.svg" width="40" height="120" alt="" />
                <img className="nf__eye nf__eye--l" src="/assets/pixel/error-eye.svg" width="32" height="32" alt="" />
                <img className="nf__eye nf__eye--r" src="/assets/pixel/error-eye.svg" width="32" height="32" alt="" />
                <span className="nf__light" />
                <span className="nf__base" />
              </div>
              <p className="retro">LEVEL NOT FOUND.EXE</p>
            </div>
            <div className="nf__text">
              <h1 className="pixel nf__code">404</h1>
              <p className="pixel nf__over">GAME OVER</p>
              <p className="nf__lead">This level doesn’t exist. The page may have moved, or the address may be incorrect. Your next adventure is back at Home.</p>
              <div className="btn-row">
                <Button to="/" color="red">RETURN HOME →</Button>
                <Button to="/projects" color="blue" font="retro">All Projects</Button>
              </div>
              <p className="retro muted nf__note">No progress lost. Just a wrong turn.</p>
            </div>
          </Window>
        </div>
      </section>
    </Page>
  );
}
