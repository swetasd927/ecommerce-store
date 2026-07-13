import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { pageTransition } from "../../lib/motion";

type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Wrap a route's page content with this so every page enters/exits the
 * same way. Uses the shared `pageTransition` variant from lib/motion.ts —
 * change the animation once there and every page picks it up.
 */
function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
}

export default PageTransition;