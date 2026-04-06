import React from 'react';
import { Home, Zap, ShieldCheck } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Badge from '../../ui/Badge.jsx';

const HostelOverview = () => {
    const info = [
        { label: 'Hostel Block', value: 'S.R.R. Block Node', detail: 'Central Campus Hub' },
        { label: 'Room Type', value: 'AC / Premium Sharing', detail: 'Sharing: 3 Nodes' },
        { label: 'Allotment', value: 'Active Status', detail: 'Institutional Stay Locked' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {info.map((node, i) => (
                <Card key={i} className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl group overflow-hidden relative transition-all duration-500 hover:translate-y-[-5px]">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="w-12 h-12 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                            {i === 0 ? <Home size={24} /> : i === 1 ? <Zap size={24} /> : <ShieldCheck size={24} />}
                        </div>
                        <Badge variant="primary" className="bg-slate-100 dark:bg-white/5 text-slate-400 border-none uppercase text-[8px] tracking-[.3em] font-bold">Campus Hub Node</Badge>
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-1 relative z-10">{node.value}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">{node.detail}</p>
                    
                    {/* Iridescent background effects */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-float" />
                </Card>
            ))}
        </div>
    );
};

export default HostelOverview;
