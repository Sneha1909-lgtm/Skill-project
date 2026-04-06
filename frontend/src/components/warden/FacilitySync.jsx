import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Zap, Clock, ArrowRight, Database, Settings } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const FacilitySync = () => {
    const systems = [
        { name: 'Water Filtration Node 4', status: 'Online', health: '98%', icon: ShieldCheck },
        { name: 'SRR Block AC Synchronization', status: 'Optimizing', health: '82%', icon: Zap },
        { name: 'Nodal Power Inverter 2', status: 'Online', health: '100%', icon: Settings }
    ];

    return (
        <div className="space-y-8 animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {systems.map((sys, i) => (
                    <Card key={i} className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl group overflow-hidden relative transition-all duration-500 hover:translate-y-[-5px]">
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                                <sys.icon size={24} />
                            </div>
                            <Badge variant="primary" className={`bg-white/5 text-slate-400 border-none uppercase text-[8px] tracking-[.3em] font-bold ${sys.status === 'Online' ? 'text-success' : 'text-amber-500'}`}>{sys.status}</Badge>
                        </div>
                        <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-1 relative z-10">{sys.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10 italic">Nodal Integrity: {sys.health}</p>
                        
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 relative z-10">
                             <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: sys.health }} 
                                    transition={{ duration: 1.5, delay: i * 0.2 }}
                                    className="h-full bg-primary shadow-[0_0_8px_rgba(225,29,72,0.4)]"
                                 />
                             </div>
                        </div>

                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-1000" />
                    </Card>
                ))}
            </div>

            <Card className="p-12 bg-gradient-to-br from-secondary-dark to-slate-900 border-none shadow-glass rounded-[4rem] text-white relative group overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-12 transition-transform shadow-2xl">
                        <Database size={32} className="text-primary" />
                    </div>
                    <h3 className="text-4xl font-display font-bold tracking-tight mb-4 text-white">Institutional Infrastructure Node</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-10 italic">Execute a global synchronization of all residential facility nodes for SRR and C-Block Hubs. All repairs under #NODE-2401 are marked for prioritization.</p>
                    <div className="flex gap-4">
                        <Button className="py-4 px-10 text-[10px] uppercase tracking-[0.3em] shadow-2xl group/btn">
                            Initialize Global Sync <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" className="py-4 px-10 text-[10px] uppercase tracking-[0.3em] bg-white/5 border-white/10 text-white">Full Facility Audit</Button>
                    </div>
                </div>
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
            </Card>
        </div>
    );
};

export default FacilitySync;
