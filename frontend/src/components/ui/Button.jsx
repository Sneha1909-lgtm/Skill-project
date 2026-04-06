import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading = false,
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5',
    danger: 'bg-error text-white hover:opacity-90 shadow-lg shadow-error/20',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading || props.disabled}
      className={twMerge(
        'btn font-display font-semibold transition-all duration-300 relative overflow-hidden',
        variants[variant],
        sizes[size],
        isLoading && 'text-transparent cursor-wait',
        className
      )}
      {...props}
    >
      <span className={clsx('flex items-center gap-2', isLoading && 'invisible')}>
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.button>
  );
};

export default Button;
