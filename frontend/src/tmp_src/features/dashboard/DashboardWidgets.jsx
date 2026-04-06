import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { twMerge } from 'tailwind-merge';

export const StatWidget = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  return (
    <Card className="h-full border-none shadow-soft hover:shadow-enterprise group">
      <div className="flex items-start justify-between">
        <div className={twMerge(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg",
          color === 'primary' ? "bg-primary/10 text-primary shadow-primary/10" :
          color === 'success' ? "bg-success/10 text-success shadow-success/10" :
          color === 'warning' ? "bg-warning/10 text-warning shadow-warning/10" :
          "bg-error/10 text-error shadow-error/10"
        )}>
          <Icon size={24} />
        </div>
        {trend && (
          <Badge variant={trend > 0 ? 'success' : 'error'} className="font-bold">
            {trend > 0 ? '+' : ''}{trend}%
          </Badge>
        )}
      </div>
      <div className="mt-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <h4 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">{value}</h4>
      </div>
    </Card>
  );
};

export const ActivityWidget = ({ activities }) => {
  return (
    <Card title="Recent Activity" subtitle="Real-time updates" className="h-full">
      <div className="space-y-6 mt-4">
        {activities.map((activity, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4 items-start group"
          >
            <div className="relative pt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all" />
              {idx !== activities.length - 1 && <div className="absolute top-4 left-1 w-0.5 h-12 bg-slate-100 dark:bg-white/5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{activity.title}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export const QuickActionWidget = ({ actions }) => {
  return (
    <Card title="Quick Actions" subtitle="Productivity" className="h-full bg-secondary-dark text-white border-none shadow-2xl">
      <div className="grid grid-cols-2 gap-3 mt-4">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-primary/20 border border-white/10 transition-colors group"
          >
            <action.icon className="text-slate-400 group-hover:text-white transition-colors" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-slate-500 group-hover:text-white">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </Card>
  );
};
