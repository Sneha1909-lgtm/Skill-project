import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, ChevronRight, Zap } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const Timetable = () => {
    const slots = [
        { time: '09:00 - 10:30', name: 'Advanced Algorithms', faculty: 'Dr. Ramana', room: 'C-201', type: 'lecture' },
        { time: '10:45 - 12:15', name: 'ML Ops', faculty: 'Prof. Lakshmi', room: 'Lab-4', type: 'lab' },
        { time: '13:30 - 15:00', name: 'Cyber Node Security', faculty: 'Dr. Ramesh', room: 'Aud-1', type: 'lecture' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Timetable Hub</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Today's Academic Session Flow</p>
                </div>
                <Badge variant="primary" className="py-1 px-3">Session Live</Badge>
            </div>
            
            <div className="space-y-4">
                {slots.map((slot, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-primary/5 transition-all group/item cursor-pointer"
                    >
                        <div className="w-24 text-xs font-bold text-slate-400 uppercase tracking-[.2em]">{slot.time}</div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover/item:text-primary transition-colors">{slot.name}</h4>
                            <div className="flex items-center gap-4 mt-1 opacity-50">
                                <span className="text-[10px] font-bold uppercase flex items-center gap-1"><Users size={12} /> {slot.faculty}</span>
                                <span className="text-[10px] font-bold uppercase flex items-center gap-1"><MapPin size={12} /> {slot.room}</span>
                            </div>
                        </div>
                        <ChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all text-primary" size={16} />
                    </motion.div>
                ))}
            </div>
            {/* Iridescent background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-float" />
        </Card>
    );
};

export default Timetable;
