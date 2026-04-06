import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Badge = ({ 
  children, 
  variant = 'default', 
  className,
  ...props 
}) => {
  const variants = {
    default: 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 ring-slate-200 dark:ring-white/10',
    primary: 'bg-primary/10 dark:bg-primary/20 text-primary ring-primary/30 dark:ring-primary/40',
    success: 'bg-success/10 dark:bg-success/20 text-success ring-success/30 dark:ring-success/40',
    warning: 'bg-warning/10 dark:bg-warning/20 text-warning ring-warning/30 dark:ring-warning/40',
    error: 'bg-error/10 dark:bg-error/20 text-error ring-error/30 dark:ring-error/40',
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={twMerge(
        'badge px-3 py-1 font-bold rounded-full',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
