import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, ShieldCheck } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const Roommates = () => {
    const mates = [
        { name: 'K. Sairam', course: 'B.Tech Mechanical', year: 'Node 3', id: '220002XXXX' },
        { name: 'V. Naresh', course: 'B.Tech CSE HUB', year: 'Node 3', id: '220003XXXX' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl group relative overflow-hidden">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Users className="text-primary" size={24} />
                Roommate Matrix
            </h3>
            
            <div className="space-y-6 relative z-10">
                {mates.map((mate, i) => (
                    <div key={i} className="flex items-center gap-4 group/mate p-1 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary group-hover/mate:scale-110 transition-all border border-primary/20">
                            <User size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{mate.name}</h4>
                                <ShieldCheck size={12} className="text-success" />
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{mate.course}</p>
                                <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
                                <p className="text-[9px] font-bold text-primary uppercase tracking-widest italic">{mate.year}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Iridescent background decoration */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />
        </Card>
    );
};

export default Roommates;
