import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type AnimateInProps = {
  children: ReactNode;
  variants: Variants;
  className?: string;
};

/**
 * Reusable enter-animation wrapper
 */
function AnimateIn({ children, variants, className }: AnimateInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimateIn;