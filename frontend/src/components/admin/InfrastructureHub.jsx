import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Zap, Database, Globe, ArrowUpRight, Cpu } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const InfrastructureHub = () => {
    const nodes = [
        { name: 'Auth Node Alpha', status: 'Online', load: '12%', heath: 'Critical Control Hub', color: 'success' },
        { name: 'Database Cluster Hub', status: 'Load Optimized', load: '45%', heath: 'Global Institutional Sync', color: 'primary' },
        { name: 'Notification Relay Node', status: 'Optimizing', load: '5%', heath: 'Dissemination Engine', color: 'warning' }
    ];

    return (
        <div className="space-y-10 animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {nodes.map((node, i) => (
                    <Card key={i} className="p-10 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[2.5rem] relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-10">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                                <Server size={28} />
                            </div>
                            <div className="text-right">
                                <Badge variant="primary" className={`bg-${node.color}/10 text-${node.color} border-${node.color}/20 text-[9px] tracking-widest uppercase py-1.5 px-4 shadow-lg shadow-${node.color}/5 animate-pulse`}>{node.status}</Badge>
                            </div>
                        </div>
                        <h4 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">{node.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] italic mb-10">{node.heath}</p>
                        
                        <div className="space-y-4">
                             <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                 <span>Global Nodal Load</span>
                                 <span>{node.load}</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: node.load }} 
                                    transition={{ duration: 1.5, delay: i * 0.2 }}
                                    className={`h-full bg-primary shadow-[0_0_10px_rgba(225,29,72,0.4)]`}
                                 />
                             </div>
                        </div>
                        
                        {/* Iridescent background decoration */}
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-12 bg-slate-900 border-none shadow-glass rounded-[4rem] text-white relative group overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-6 transition-transform">
                            <Cpu size={32} className="text-primary" />
                        </div>
                        <h3 className="text-3xl font-display font-bold tracking-tight mb-4 text-white">Institutional Override Engine</h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-10 italic">Activate nodal diagnostics for our global academic grid. All security layers are currently synchronized with Node-Level 4 protocols.</p>
                        <Button className="py-4 px-10 text-[10px] uppercase tracking-[0.4em] shadow-2xl group/btn">
                           Engage Diagnostic Node <Globe size={18} className="ml-4 group-hover/btn:rotate-12 transition-transform" />
                        </Button>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 iridescent-orb opacity-10 -z-10 animate-float" />
                </Card>

                <Card className="p-12 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-[4rem] group overflow-hidden relative flex flex-col justify-between">
                    <div className="relative z-10">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-lg shadow-success/20" />
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Operational Continuity Node</h4>
                         </div>
                         <h4 className="text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight mb-4 tracking-tighter">Nodal Backups & <br /> Data Persistence v4.0</h4>
                         <p className="text-sm text-slate-500 font-medium italic opacity-60 leading-relaxed">System-wide backups are executed every 240 minutes at the institutional node cluster.</p>
                    </div>
                    <Button variant="secondary" className="w-fit scale-110 mt-12 px-10 rounded-[1.5rem] bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white border-none shadow-xl flex items-center gap-3 active:scale-95">Access Data Vault <ArrowUpRight size={18} /></Button>
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
                </Card>
            </div>
        </div>
    );
};

export default InfrastructureHub;
