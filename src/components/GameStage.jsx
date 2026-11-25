import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import PlayerSprite from './PlayerSprite';
import { categories } from '../data/site';

// World geometry (px). The level is wider than small screens, so a camera follows the player.
const PW = 40;          // player width
const PH = 70;          // player height
const BS = 56;          // block size
const BLOCK_Y = 128;    // block bottom, measured from the ground
const GAP = 150;        // distance between blocks
const PAD = 150;        // empty space at both ends
const WORLD_W = PAD * 2 + GAP * (categories.length - 1) + BS;
const GRAVITY = 2400;
const JUMP_V = 960;
const SPEED = 270;

const blockX = (i) => PAD + i * GAP;

export default function GameStage() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const playerRef = useRef(null);
  const [hit, setHit] = useState(null);
  const [message, setMessage] = useState('');
  const active = useRef(false);
  const s = useRef({
    x: 40, y: 0, vy: 0, onGround: true, facing: 'right',
    left: false, right: false, jump: false, target: null, locked: false, walkT: 0,
  });

  const enterWorld = useCallback((i) => {
    const st = s.current;
    if (st.locked) return;
    st.locked = true;
    const cat = categories[i];
    setHit(i);
    setMessage(`Block hit! Entering the ${cat.title} world.`);
    window.setTimeout(() => navigate(`/projects?category=${cat.slug}`), reduceMotion ? 150 : 750);
  }, [navigate, reduceMotion]);

  // Game loop.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.035);
      last = now;
      const st = s.current;

      let dir = (st.right ? 1 : 0) - (st.left ? 1 : 0);
      if (st.target !== null) {
        const d = st.target - st.x;
        if (Math.abs(d) > 4) dir = Math.sign(d);
        else { dir = 0; st.x = st.target; st.target = null; st.jump = true; }
      }
      if (st.locked) dir = 0;

      st.x = Math.max(0, Math.min(WORLD_W - PW, st.x + dir * SPEED * dt));
      if (dir) st.facing = dir > 0 ? 'right' : 'left';

      if (st.jump && st.onGround && !st.locked) { st.vy = JUMP_V; st.onGround = false; }
      st.jump = false;

      const prevHead = st.y + PH;
      st.vy -= GRAVITY * dt;
      st.y += st.vy * dt;
      if (st.y <= 0) { st.y = 0; st.vy = 0; st.onGround = true; }

      // Head-butt a block from below.
      const head = st.y + PH;
      if (st.vy > 0 && prevHead <= BLOCK_Y && head >= BLOCK_Y) {
        const cx = st.x + PW / 2;
        const i = categories.findIndex((_, k) => cx > blockX(k) - 6 && cx < blockX(k) + BS + 6);
        if (i !== -1) { st.y = BLOCK_Y - PH; st.vy = -60; enterWorld(i); }
      }

      // Pose.
      st.walkT += dt;
      let frame = 'idle';
      if (!st.onGround) frame = 'jump';
      else if (dir) frame = Math.floor(st.walkT / 0.12) % 2 ? 'walk1' : 'walk2';

      // Camera + render (direct DOM writes keep this smooth).
      const cw = stageRef.current ? stageRef.current.clientWidth : WORLD_W;
      const camX = Math.max(0, Math.min(st.x + PW / 2 - cw / 2, WORLD_W - cw));
      if (worldRef.current) worldRef.current.style.transform = `translate3d(${-Math.max(0, camX)}px,0,0)`;
      if (playerRef.current) {
        playerRef.current.style.transform = `translate3d(${st.x}px,${-st.y}px,0)`;
        const sprite = playerRef.current.firstElementChild;
        sprite.setAttribute('data-frame', frame);
        sprite.setAttribute('data-facing', st.facing);
      }

      if (active.current) raf = requestAnimationFrame(step);
    };

    // Only run (and listen to keys) while the stage is on screen.
    const io = new IntersectionObserver(([entry]) => {
      const vis = entry.isIntersecting;
      if (vis && !active.current) { active.current = true; last = performance.now(); raf = requestAnimationFrame(step); }
      if (!vis) { active.current = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.35 });
    if (stageRef.current) io.observe(stageRef.current);

    const isTyping = (e) => /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    const onKey = (down) => (e) => {
      if (!active.current || isTyping(e)) return;
      const st = s.current;
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { st.left = down; st.target = null; e.preventDefault(); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { st.right = down; st.target = null; e.preventDefault(); }
      else if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W') { if (down) st.jump = true; e.preventDefault(); }
    };
    const kd = onKey(true);
    const ku = onKey(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    return () => {
      active.current = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    };
  }, [enterWorld]);

  // Tap / click / Enter on a block: walk there and jump.
  const goToBlock = (i) => {
    if (reduceMotion) { enterWorld(i); return; }
    s.current.target = blockX(i) + BS / 2 - PW / 2;
  };

  // Hold-to-move touch buttons.
  const hold = (key) => ({
    onPointerDown: (e) => { e.preventDefault(); s.current[key] = true; s.current.target = null; },
    onPointerUp: () => { s.current[key] = false; },
    onPointerLeave: () => { s.current[key] = false; },
    onPointerCancel: () => { s.current[key] = false; },
    onContextMenu: (e) => e.preventDefault(),
  });

  return (
    <div className="game">
      <div className="game__stage" ref={stageRef}>
        <div className="game__world" ref={worldRef} style={{ width: WORLD_W }}>
          <div className="cloud cloud--1" aria-hidden="true" />
          <div className="cloud cloud--2" aria-hidden="true" />
          <div className="cloud cloud--3" aria-hidden="true" />
          <div className="hill hill--1" aria-hidden="true" />
          <div className="hill hill--2" aria-hidden="true" />
          <div className="game__sign pixel" aria-hidden="true">START →</div>

          {categories.map((c, i) => (
            <div key={c.slug} className="block-slot" style={{ left: blockX(i), width: BS }}>
              <button
                type="button"
                className={`qblock ${hit === i ? 'qblock--hit' : ''}`}
                style={{ bottom: `calc(var(--ground) + ${BLOCK_Y}px)`, width: BS, height: BS }}
                onClick={() => goToBlock(i)}
                aria-label={`Open the ${c.title} world`}
              >
                <img src={c.icon} alt="" width={c.iconSize[0] * 0.5} height={c.iconSize[1] * 0.5} />
              </button>
              {hit === i && <span className="coin" aria-hidden="true" style={{ bottom: `calc(var(--ground) + ${BLOCK_Y + BS}px)` }} />}
              <span
                className={`block-label pixel ${hit === i ? 'block-label--hit' : ''}`}
                aria-hidden="true"
                style={{ bottom: `calc(var(--ground) + ${BLOCK_Y + BS + 14}px)` }}
              >
                {c.short}
              </span>
            </div>
          ))}

          <div className="game__player" ref={playerRef} style={{ width: PW, height: PH }}>
            <PlayerSprite className="sprite--game" />
          </div>
          <div className="game__ground" aria-hidden="true" />
        </div>
      </div>

      <div className="game__controls">
        <p className="retro game__hint">
          <span className="game__hint-keys">← → move · SPACE jump · </span>or tap a block to enter a world
        </p>
        <div className="game__pad" aria-hidden="true">
          <button type="button" className="pad-btn" tabIndex={-1} {...hold('left')}>◀</button>
          <button type="button" className="pad-btn" tabIndex={-1} {...hold('right')}>▶</button>
          <button type="button" className="pad-btn pad-btn--jump" tabIndex={-1} onPointerDown={(e) => { e.preventDefault(); s.current.jump = true; }}>JUMP</button>
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">{message}</p>
    </div>
  );
}
