import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "../common/PageTransition";

function AppLayout() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="surface-page flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>{element}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;