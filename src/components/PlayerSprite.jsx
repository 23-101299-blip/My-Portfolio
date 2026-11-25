import sprite from '../data/sprite.json';

// "Pixel Aly" — the player character, hand-drawn in pixels from Aly's portrait
// (curly hair with a fade, sunglasses, beard, black suit, white shirt + pocket square).
// The grids live in src/data/sprite.json; preview them with `node tools/preview-sprite.js`.
const W = 16;
const H = sprite.head.length + sprite.body.idle.length;

function Frame({ name }) {
  const rows = [...sprite.head, ...sprite.body[name]];
  const rects = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = sprite.palette[ch];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.03" height="1.03" fill={fill} />);
    });
  });
  return (
    <svg className={`sprite__frame sprite__frame--${name}`} viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" aria-hidden="true">
      {rects}
    </svg>
  );
}

const FRAMES = Object.keys(sprite.body);

// `frame`: idle | walk1 | walk2 | jump | wave. `facing`: right | left.
export default function PlayerSprite({ frame = 'idle', facing = 'right', className = '', style }) {
  return (
    <div className={`sprite ${className}`} data-frame={frame} data-facing={facing} style={style}>
      {FRAMES.map((name) => <Frame key={name} name={name} />)}
    </div>
  );
}
