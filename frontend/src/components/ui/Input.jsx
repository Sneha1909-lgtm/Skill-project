import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className, 
  containerClassName,
  ...props 
}) => {
  return (
    <div className={twMerge('space-y-1.5 w-full', containerClassName)}>
      {label && (
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <div className="relative group/input">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-primary">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <input
          className={twMerge(
            'input-field h-12 transition-all duration-300',
            Icon && 'pl-12',
            error && 'border-error ring-4 ring-error/10 focus:border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-error mt-1.5 pl-1 flex items-center gap-1"
          >
            <span className="text-sm">⚠️</span> {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Input;
