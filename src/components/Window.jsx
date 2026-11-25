// Retro "OS window": coloured title bar, three control dots and a path label.
const DOTS_FOR_BAR = {
  red: ['green', 'sky', 'yellow'],
  green: ['red', 'sky', 'yellow'],
  sky: ['red', 'green', 'yellow'],
  yellow: ['red', 'sky', 'green'],
};

export function WindowDots({ bar = 'red', dots }) {
  const list = dots || DOTS_FOR_BAR[bar] || DOTS_FOR_BAR.red;
  return (
    <span className="win__dots" aria-hidden="true">
      {list.map((c, i) => (
        <img key={i} src={`/assets/pixel/dot-${c}.svg`} width="20" height="20" alt="" />
      ))}
    </span>
  );
}

export default function Window({
  bar = 'red',
  title,
  dots,
  bg = 'white',
  className = '',
  bodyClassName = '',
  as: Tag = 'section',
  children,
  ...rest
}) {
  return (
    <Tag className={`win win--${bg} ${className}`} {...rest}>
      <div className={`win__bar win__bar--${bar}`}>
        <WindowDots bar={bar} dots={dots} />
        {title && <span className="win__path">{title}</span>}
      </div>
      <div className={`win__body ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}
