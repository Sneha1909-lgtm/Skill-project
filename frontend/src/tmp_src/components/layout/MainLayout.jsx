import React from 'react';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background dark:bg-secondary-dark selection:bg-primary/20 selection:text-primary">
      {/* Animated Sidebar Hub */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Dynamic Global Navbar */}
        <Navbar />

        {/* Main Content Stage with Framer Motion Page Transitions */}
        <main className="flex-1 p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Detail */}
        <footer className="p-6 border-t border-slate-200 dark:border-white/5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          ERP Nexus © 2026 • Enterprise Educational Management
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
