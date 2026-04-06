import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bell, Clock, ChevronRight, Zap, Target } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const Notifications = () => {
    const broadcasts = [
        { title: 'Exam Phase III Live Node', date: 'Today', type: 'urgent', text: 'Hall tickets generated at the institutional nexus.' },
        { title: 'Campus Drive: Google Cloud', date: 'Yesterday', type: 'info', text: 'Register by 05:00 PM today via ERP.' },
        { title: 'Academic Refreshment Node', date: '3 Apr', type: 'info', text: 'Mid-term break dates finalized.' }
    ];

    return (
        <Card className="p-8 bg-slate-900 border-none shadow-enterprise rounded-3xl text-white relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-display font-bold flex items-center gap-3">
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <Bell className="text-primary" size={24} />
                    </motion.div>
                    Institutional Broadcasts
                </h3>
                <Badge variant="primary" className="bg-primary/20 text-white border-white/20 px-3 py-1 font-bold tracking-widest text-[10px] uppercase">Nexus Sync Active</Badge>
            </div>
            
            <div className="space-y-4 relative z-10">
                {broadcasts.map((notif, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group/item relative overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-2">
                                <p className="text-xs font-bold tracking-widest uppercase text-white/90">{notif.title}</p>
                                {notif.type === 'urgent' && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                             </div>
                             <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{notif.date}</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-medium mb-4">{notif.text}</p>
                        <div className="flex items-center justify-between pointer-events-none">
                            <div className="flex items-center gap-2">
                                <Clock size={12} className="text-white/20" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest italic">{notif.type === 'urgent' ? 'Requires Attention' : 'Informational Node'}</span>
                            </div>
                            <ChevronRight size={14} className="text-primary opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-all border-t border-white/5 pt-6 flex items-center justify-center gap-3 active:scale-95 group">
                Access Archive Node <Target size={14} className="group-hover:rotate-45 transition-transform" />
            </button>
            
            {/* Background Effects */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
};

export default Notifications;
