import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className, 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white dark:bg-secondary border-slate-200 dark:border-white/10 shadow-soft',
    glass: 'glass dark:glass-dark',
    accent: 'bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 shadow-enterprise',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
      className={twMerge(
        'rounded-2xl border transition-all duration-500 relative overflow-hidden group/card',
        variants[variant],
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 pt-6 pb-2 space-y-1 relative z-10">
          {title && (
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover/card:text-primary transition-colors">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="p-6 relative z-10 h-full">
        {children}
      </div>
      {/* Subtle Glow Effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

export default Card;
