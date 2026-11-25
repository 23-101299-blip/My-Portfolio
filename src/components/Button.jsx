import { Link } from 'react-router-dom';

// Chunky pixel button. Renders a router Link, an <a> or a <button>.
// color: red (primary CTA) | blue (secondary) | yellow (badge/filter)
// font: pixel (Press Start 2P) | retro (VT323)
export default function Button({ to, href, color = 'red', font = 'pixel', size, className = '', children, ...rest }) {
  const cls = `btn btn--${color} btn--${font} ${size ? `btn--${size}` : ''} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
