import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Wraps every page: sets the tab title and plays the enter/exit transition.
export default function Page({ title, children, className = '' }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = title ? `${title} — Aly Gameel` : 'Aly Gameel — UI/UX Designer';
  }, [title]);

  const variants = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.18 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
      };

  return (
    <motion.main id="main" className={`page ${className}`} initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.main>
  );
}
