import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Window from './Window';

const SEGMENTS = 10;

// The "Loading Level..." window. Counts up to 100%, then calls onDone.
export function LoadingPanel({ onDone, duration = 1800, doneLabel = 'PRESS START →' }) {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(reduce ? 100 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduce]);

  const filled = Math.floor((pct / 100) * SEGMENTS);
  const ready = pct >= 100;

  return (
    <Window bar="green" title="My Computer / Portfolio / Loading" className="loader-win" bodyClassName="loader">
      <div className="loader__computer" aria-hidden="true">
        <img src="/assets/pixel/startup-computer.svg" width="120" height="112" alt="" />
        <span className="loader__screen" />
        <img className="loader__cursor" src="/assets/pixel/cursor.svg" width="40" height="32" alt="" />
        <span className="loader__power" />
      </div>
      <h1 className="pixel loader__title">{ready ? 'Level Loaded!' : 'Loading Level...'}</h1>
      <p className="loader__lead">Aly Gameel’s portfolio is getting ready. Your next creative world awaits.</p>

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Loading progress"
      >
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span key={i} className={`progress__seg ${i < filled ? 'progress__seg--on' : ''}`} />
        ))}
      </div>
      <div className="progress__meta retro">
        <span className="muted">{ready ? 'Portfolio ready.' : 'Preparing the portfolio...'}</span>
        <span>{pct}%</span>
      </div>

      <div className="loader__foot">
        {ready && onDone ? (
          <button type="button" className="btn btn--red btn--pixel loader__start" onClick={onDone} autoFocus>
            {doneLabel}
          </button>
        ) : (
          <p className="retro loader__next">NEXT DESTINATION: HOME / Meet the designer. Explore the work.</p>
        )}
      </div>
    </Window>
  );
}

// Full-screen preloader shown on the first visit of a session.
export default function Preloader({ onFinish }) {
  const [leaving, setLeaving] = useState(false);
  const finish = () => {
    setLeaving(true);
    window.setTimeout(onFinish, 450);
  };

  useEffect(() => {
    const t = window.setTimeout(finish, 3400); // auto-continue if nobody presses start
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`preloader ${leaving ? 'preloader--leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Loading portfolio">
      <div className="preloader__inner">
        <p className="section-title">▶ PLAYER ONE / STARTUP</p>
        <LoadingPanel onDone={finish} />
      </div>
    </div>
  );
}
