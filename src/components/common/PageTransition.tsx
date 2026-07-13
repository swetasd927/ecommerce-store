import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { pageTransition } from "../../lib/motion";

type PageTransitionProps = {
  children: ReactNode;
};

function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
}

export default PageTransition;