import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const HostelNotifications = () => {
    const alerts = [
        { title: 'Maintenance Node Sync', text: 'Water maintenance in Block SRR at 10:00 AM.', date: 'Today', type: 'urgent' },
        { title: 'New Dining Protocols', text: 'Bio-metric sync mandatory for lunch entry.', date: 'Tomorrow', type: 'info' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-bold flex items-center gap-3">
                    <Bell className="text-primary animate-float" size={24} />
                    Facility Broadcasts
                </h3>
                <Badge variant="primary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold tracking-widest text-[10px] uppercase">Nexus Sync Active</Badge>
            </div>
            
            <div className="space-y-4 relative z-10">
                {alerts.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/20 transition-all cursor-pointer group/item"
                    >
                        <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.title}</span>
                                {item.type === 'urgent' && <AlertCircle size={10} className="text-primary animate-pulse" />}
                             </div>
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed mb-4">{item.text}</p>
                        <div className="flex items-center justify-between opacity-0 group-hover/item:opacity-100 transition-all">
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic group-hover/item:text-primary">Recorded by Facility Node</p>
                             <ChevronRight size={14} className="text-primary" />
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Iridescent effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
};

export default HostelNotifications;
