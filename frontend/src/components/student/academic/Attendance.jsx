import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';

const Attendance = () => {
    const subjects = [
        { name: 'DSDA', attendance: 92, status: 'safe' },
        { name: 'DBMS', attendance: 85, status: 'safe' },
        { name: 'OS Architecture', attendance: 71, status: 'warning' },
        { name: 'ML Ops', attendance: 94, status: 'safe' }
    ];

    return (
        <Card className="p-8 bg-white/80 dark:bg-secondary/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-enterprise rounded-3xl group overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3"><TrendingUp className="text-primary" size={20} /> Attendance Monitor</h3>
                <Badge variant="primary" className="bg-success/10 text-success border-success/20 py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase">Institutional Threshold: 75%</Badge>
            </div>
            
            <div className="space-y-6 relative z-10">
                {subjects.map((sub, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest">
                            <span className="text-slate-500 uppercase flex items-center gap-2">
                                {sub.status === 'safe' ? <CheckCircle2 size={12} className="text-success" /> : <AlertCircle size={12} className="text-amber-500" />}
                                {sub.name}
                            </span>
                            <span className={`${sub.status === 'safe' ? 'text-success' : 'text-amber-500'}`}>{sub.attendance}% Nodes Sync</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${sub.attendance}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full rounded-full ${sub.status === 'safe' ? 'bg-success' : 'bg-amber-500'}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="secondary" className="w-full mt-10 py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl border-none bg-slate-100 dark:bg-white/5 overflow-hidden relative">Detailed Institutional Analytics</Button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
};

export default Attendance;
