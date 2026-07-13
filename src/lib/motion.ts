import type { Transition, Variants } from "framer-motion";

/**
 * Central animation module.
 */

/** Default spring used for anything that should feel snappy but soft (cards, buttons, modals). */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

/** Slightly slower spring for larger elements (page sections, images). */
export const softSpringTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 22,
};

/** Simple fade + rise. Use for page content, section headers, empty states. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: softSpringTransition,
  },
};

/** Plain fade, no movement. Use for overlays, skeleton -> content swaps. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

/** Scale + fade in. Use for modals, image previews, badges appearing. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

/**
 * Stagger container: wrap a list/grid in a motion element with this variant,
 * give each child the `fadeUp` (or `scaleIn`) variant, and children animate
 * in one after another automatically.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

/** Whole-page enter/exit, used by <PageTransition>. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

/** Shared hover/tap micro-interaction for clickable cards. */
export const cardHover = {
  whileHover: { y: -4, transition: springTransition },
  whileTap: { scale: 0.98 },
};